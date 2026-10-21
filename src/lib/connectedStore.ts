import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface MemberLocation {
  lat: number;
  lng: number;
  accuracy?: number; // accuracy in meters
  heading?: number | null;
  speed?: number | null;
}

export interface GroupMember {
  id: string;
  token: string; // Secret authentication token for this member
  name: string;
  phone?: string;
  avatarColor: string;
  isCreator: boolean;
  hasConsented: boolean; // Explicit user consent given
  isSharing: boolean;    // Actively sharing live position
  battery?: number;      // Battery percentage (if available)
  lastUpdated: number;   // Timestamp (ms)
  location?: MemberLocation | null;
}

export interface GroupPing {
  id: string;
  memberId: string;
  memberName: string;
  message: string;
  type: 'info' | 'help' | 'meeting' | 'safe';
  timestamp: number;
}

export interface ConnectedGroup {
  id: string;
  name: string;
  meetingPoint?: string;
  inviteCode: string; // Unguessable unique code e.g. "KMB-8A2F"
  createdAt: number;
  updatedAt: number;
  creatorToken: string;
  isEnded: boolean;
  members: GroupMember[];
  pings: GroupPing[];
}

// Sanitized member view for authenticated members (omitting secret tokens)
export interface SanitizedMember {
  id: string;
  name: string;
  phone?: string;
  avatarColor: string;
  isCreator: boolean;
  hasConsented: boolean;
  isSharing: boolean;
  battery?: number;
  lastUpdated: number;
  location?: MemberLocation | null;
}

export interface SanitizedGroup {
  id: string;
  name: string;
  meetingPoint?: string;
  inviteCode: string;
  createdAt: number;
  updatedAt: number;
  isEnded: boolean;
  memberCount: number;
  members: SanitizedMember[];
  pings: GroupPing[];
}

const AVATAR_COLORS = [
  '#984300', // Saffron ochre
  '#0284c7', // Sky blue
  '#059669', // Emerald
  '#7c3aed', // Purple
  '#dc2626', // Crimson
  '#d97706', // Amber
  '#db2777', // Pink
  '#0d9488', // Teal
];

// Global in-memory storage to survive hot reloads in Next.js development
declare global {
  // eslint-disable-next-line no-var
  var __kumbh_groups__: Map<string, ConnectedGroup> | undefined;
  // eslint-disable-next-line no-var
  var __kumbh_listeners__: Map<string, Set<(group: SanitizedGroup) => void>> | undefined;
}

const groupsMap: Map<string, ConnectedGroup> =
  globalThis.__kumbh_groups__ ?? new Map<string, ConnectedGroup>();
globalThis.__kumbh_groups__ = groupsMap;

const listenersMap: Map<string, Set<(group: SanitizedGroup) => void>> =
  globalThis.__kumbh_listeners__ ?? new Map();
globalThis.__kumbh_listeners__ = listenersMap;

// Persistent file path
const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'connected-groups.json');

// Initialize store from disk once
let isLoaded = false;
async function ensureLoaded(): Promise<void> {
  if (isLoaded) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const g of parsed) {
          // Never persist live locations permanently to satisfy privacy rules
          const sanitizedMembers = (g.members || []).map((m: GroupMember) => ({
            ...m,
            location: null,
            isSharing: false,
          }));
          groupsMap.set(g.id, {
            ...g,
            members: sanitizedMembers,
          });
        }
      }
    }
  } catch (err) {
    console.error('[connectedStore] Failed to load from disk:', err);
  } finally {
    isLoaded = true;
  }
}

// Persist metadata to disk (privacy safe: locations are stripped)
let persistTimer: NodeJS.Timeout | null = null;
function schedulePersist(): void {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const dataToSave = Array.from(groupsMap.values()).map(g => ({
        ...g,
        members: g.members.map(m => ({
          ...m,
          location: null, // Zero location history stored on disk
          isSharing: false,
        })),
      }));
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('[connectedStore] Persist error:', err);
    }
  }, 1000);
}

// Generate an unguessable 8-character invite code (e.g., "KMB-7X9P")
export function generateInviteCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomPart = '';
  const randomBytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    randomPart += chars[randomBytes[i] % chars.length];
  }
  return `KMB-${randomPart.slice(0, 3)}${randomPart.slice(3)}`;
}

// Generate secure unguessable authentication tokens
export function generateToken(): string {
  return crypto.randomBytes(24).toString('hex');
}

// Sanitizes a group for authenticated members
export function sanitizeGroupForMember(group: ConnectedGroup): SanitizedGroup {
  return {
    id: group.id,
    name: group.name,
    meetingPoint: group.meetingPoint,
    inviteCode: group.inviteCode,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    isEnded: group.isEnded,
    memberCount: group.members.length,
    members: group.members.map(m => ({
      id: m.id,
      name: m.name,
      phone: m.phone,
      avatarColor: m.avatarColor,
      isCreator: m.isCreator,
      hasConsented: m.hasConsented,
      isSharing: m.isSharing,
      battery: m.battery,
      lastUpdated: m.lastUpdated,
      // Only include coordinates if the member has explicitly granted consent and is sharing
      location: m.hasConsented && m.isSharing ? m.location : null,
    })),
    pings: group.pings || [],
  };
}

// Broadcasts real-time updates to all SSE subscribers of this group
function broadcastGroupUpdate(group: ConnectedGroup): void {
  const sanitized = sanitizeGroupForMember(group);
  const listeners = listenersMap.get(group.id);
  if (listeners) {
    for (const listener of listeners) {
      try {
        listener(sanitized);
      } catch (err) {
        console.error('[connectedStore] Listener broadcast error:', err);
      }
    }
  }
}

// Subscribe to real-time group events
export function subscribeToGroup(
  groupId: string,
  callback: (group: SanitizedGroup) => void
): () => void {
  if (!listenersMap.has(groupId)) {
    listenersMap.set(groupId, new Set());
  }
  const set = listenersMap.get(groupId)!;
  set.add(callback);

  return () => {
    set.delete(callback);
    if (set.size === 0) {
      listenersMap.delete(groupId);
    }
  };
}

// CREATE GROUP
export async function createGroup(params: {
  groupName: string;
  creatorName: string;
  creatorPhone?: string;
  meetingPoint?: string;
}): Promise<{
  group: SanitizedGroup;
  creatorToken: string;
  memberId: string;
}> {
  await ensureLoaded();

  const groupId = `grp_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const creatorToken = generateToken();
  const memberId = `mbr_${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`;
  const inviteCode = generateInviteCode();
  const now = Date.now();

  const creatorMember: GroupMember = {
    id: memberId,
    token: creatorToken,
    name: params.creatorName.trim(),
    phone: params.creatorPhone?.trim(),
    avatarColor: AVATAR_COLORS[0],
    isCreator: true,
    hasConsented: false,
    isSharing: false,
    lastUpdated: now,
    location: null,
  };

  const newGroup: ConnectedGroup = {
    id: groupId,
    name: params.groupName.trim(),
    meetingPoint: params.meetingPoint?.trim() || undefined,
    inviteCode,
    createdAt: now,
    updatedAt: now,
    creatorToken,
    isEnded: false,
    members: [creatorMember],
    pings: [
      {
        id: `ping_${Date.now()}`,
        memberId,
        memberName: params.creatorName.trim(),
        message: `Group created. Welcome to Kumbh Get Connected!`,
        type: 'info',
        timestamp: now,
      },
    ],
  };

  groupsMap.set(groupId, newGroup);
  schedulePersist();
  broadcastGroupUpdate(newGroup);

  return {
    group: sanitizeGroupForMember(newGroup),
    creatorToken,
    memberId,
  };
}

// LOOKUP GROUP BY INVITE CODE (Public preview: returns basic info, no coordinates)
export async function lookupGroupByCode(code: string): Promise<{
  id: string;
  name: string;
  meetingPoint?: string;
  inviteCode: string;
  memberCount: number;
  isEnded: boolean;
} | null> {
  await ensureLoaded();
  const normalized = code.trim().toUpperCase();

  for (const group of groupsMap.values()) {
    if (group.inviteCode === normalized && !group.isEnded) {
      return {
        id: group.id,
        name: group.name,
        meetingPoint: group.meetingPoint,
        inviteCode: group.inviteCode,
        memberCount: group.members.length,
        isEnded: group.isEnded,
      };
    }
  }
  return null;
}

// GET GROUP FOR AUTHENTICATED MEMBER
export async function getGroupForMember(
  groupId: string,
  memberToken: string
): Promise<{ group: SanitizedGroup; currentMember: SanitizedMember } | null> {
  await ensureLoaded();
  const group = groupsMap.get(groupId);
  if (!group || group.isEnded) return null;

  const member = group.members.find(m => m.token === memberToken);
  if (!member) return null;

  const sanitized = sanitizeGroupForMember(group);
  const currentSanitized = sanitized.members.find(m => m.id === member.id)!;

  return {
    group: sanitized,
    currentMember: currentSanitized,
  };
}

// JOIN GROUP
export async function joinGroup(params: {
  groupIdOrCode: string;
  memberName: string;
  phone?: string;
}): Promise<{
  group: SanitizedGroup;
  memberToken: string;
  memberId: string;
} | null> {
  await ensureLoaded();

  let targetGroup: ConnectedGroup | undefined;
  const input = params.groupIdOrCode.trim();

  if (groupsMap.has(input)) {
    targetGroup = groupsMap.get(input);
  } else {
    const normalizedCode = input.toUpperCase();
    for (const g of groupsMap.values()) {
      if (g.inviteCode === normalizedCode) {
        targetGroup = g;
        break;
      }
    }
  }

  if (!targetGroup || targetGroup.isEnded) {
    return null;
  }

  const memberId = `mbr_${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`;
  const memberToken = generateToken();
  const now = Date.now();

  const colorIndex = targetGroup.members.length % AVATAR_COLORS.length;

  const newMember: GroupMember = {
    id: memberId,
    token: memberToken,
    name: params.memberName.trim(),
    phone: params.phone?.trim(),
    avatarColor: AVATAR_COLORS[colorIndex],
    isCreator: false,
    hasConsented: false,
    isSharing: false,
    lastUpdated: now,
    location: null,
  };

  targetGroup.members.push(newMember);
  targetGroup.updatedAt = now;
  targetGroup.pings.unshift({
    id: `ping_${Date.now()}`,
    memberId,
    memberName: newMember.name,
    message: `${newMember.name} joined the group.`,
    type: 'info',
    timestamp: now,
  });

  // Limit pings to last 15
  if (targetGroup.pings.length > 15) {
    targetGroup.pings = targetGroup.pings.slice(0, 15);
  }

  schedulePersist();
  broadcastGroupUpdate(targetGroup);

  return {
    group: sanitizeGroupForMember(targetGroup),
    memberToken,
    memberId,
  };
}

// UPDATE MEMBER LOCATION & SHARING STATUS
export async function updateMemberLocation(params: {
  groupId: string;
  memberToken: string;
  isSharing: boolean;
  location?: MemberLocation | null;
  battery?: number;
}): Promise<{ success: boolean; member?: SanitizedMember }> {
  await ensureLoaded();
  const group = groupsMap.get(params.groupId);
  if (!group || group.isEnded) return { success: false };

  const member = group.members.find(m => m.token === params.memberToken);
  if (!member) return { success: false };

  const now = Date.now();
  member.lastUpdated = now;
  if (typeof params.battery === 'number') {
    member.battery = Math.max(0, Math.min(100, Math.round(params.battery)));
  }

  if (params.isSharing) {
    member.hasConsented = true;
    member.isSharing = true;
    if (params.location && typeof params.location.lat === 'number' && typeof params.location.lng === 'number') {
      member.location = {
        lat: params.location.lat,
        lng: params.location.lng,
        accuracy: params.location.accuracy,
        heading: params.location.heading,
        speed: params.location.speed,
      };
    }
  } else {
    // Instantly wipe coordinates from memory when stopping sharing
    member.isSharing = false;
    member.location = null;
  }

  group.updatedAt = now;
  broadcastGroupUpdate(group);

  const sanitized = sanitizeGroupForMember(group);
  const updatedMember = sanitized.members.find(m => m.id === member.id);

  return { success: true, member: updatedMember };
}

// LEAVE GROUP
export async function leaveGroup(groupId: string, memberToken: string): Promise<boolean> {
  await ensureLoaded();
  const group = groupsMap.get(groupId);
  if (!group) return false;

  const memberIndex = group.members.findIndex(m => m.token === memberToken);
  if (memberIndex === -1) return false;

  const leavingMember = group.members[memberIndex];
  group.members.splice(memberIndex, 1);
  const now = Date.now();
  group.updatedAt = now;

  // Add ping
  group.pings.unshift({
    id: `ping_${Date.now()}`,
    memberId: leavingMember.id,
    memberName: leavingMember.name,
    message: `${leavingMember.name} left the group.`,
    type: 'info',
    timestamp: now,
  });

  // If group is empty, mark ended
  if (group.members.length === 0) {
    group.isEnded = true;
  } else if (leavingMember.isCreator) {
    // Transfer creator role to next member
    group.members[0].isCreator = true;
    group.creatorToken = group.members[0].token;
  }

  schedulePersist();
  broadcastGroupUpdate(group);
  return true;
}

// END / DISBAND GROUP (Creator Only)
export async function endGroup(groupId: string, creatorToken: string): Promise<boolean> {
  await ensureLoaded();
  const group = groupsMap.get(groupId);
  if (!group) return false;

  const isAuthorized = group.creatorToken === creatorToken ||
    group.members.some(m => m.isCreator && m.token === creatorToken);

  if (!isAuthorized) return false;

  group.isEnded = true;
  group.updatedAt = Date.now();
  // Clear all member locations immediately for privacy
  for (const m of group.members) {
    m.isSharing = false;
    m.location = null;
  }

  schedulePersist();
  broadcastGroupUpdate(group);
  return true;
}

// REVOKE MEMBER ACCESS (Creator Only)
export async function revokeMember(
  groupId: string,
  creatorToken: string,
  memberIdToRevoke: string
): Promise<boolean> {
  await ensureLoaded();
  const group = groupsMap.get(groupId);
  if (!group || group.isEnded) return false;

  const isAuthorized = group.creatorToken === creatorToken ||
    group.members.some(m => m.isCreator && m.token === creatorToken);

  if (!isAuthorized) return false;

  const idx = group.members.findIndex(m => m.id === memberIdToRevoke);
  if (idx === -1) return false;

  const revokedMember = group.members[idx];
  group.members.splice(idx, 1);
  const now = Date.now();
  group.updatedAt = now;

  group.pings.unshift({
    id: `ping_${Date.now()}`,
    memberId: revokedMember.id,
    memberName: revokedMember.name,
    message: `${revokedMember.name}'s access was revoked by the creator.`,
    type: 'info',
    timestamp: now,
  });

  schedulePersist();
  broadcastGroupUpdate(group);
  return true;
}

// SEND GROUP PING / LOST ALERT
export async function sendGroupPing(params: {
  groupId: string;
  memberToken: string;
  message: string;
  type?: 'info' | 'help' | 'meeting' | 'safe';
}): Promise<GroupPing | null> {
  await ensureLoaded();
  const group = groupsMap.get(params.groupId);
  if (!group || group.isEnded) return null;

  const member = group.members.find(m => m.token === params.memberToken);
  if (!member) return null;

  const ping: GroupPing = {
    id: `ping_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    memberId: member.id,
    memberName: member.name,
    message: params.message.trim(),
    type: params.type || 'info',
    timestamp: Date.now(),
  };

  group.pings.unshift(ping);
  if (group.pings.length > 20) {
    group.pings = group.pings.slice(0, 20);
  }
  group.updatedAt = Date.now();

  schedulePersist();
  broadcastGroupUpdate(group);
  return ping;
}
