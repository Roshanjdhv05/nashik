'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Users,
  QrCode,
  Share2,
  Navigation,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Compass,
  LogOut,
  Trash2,
  Plus,
  RefreshCw,
  Bell,
  Check,
  AlertTriangle,
  Phone,
  Radio,
  Crown,
  EyeOff,
  Eye,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import type { SanitizedGroup, SanitizedMember } from '@/lib/connectedStore';
import { ShareQrModal } from './ShareQrModal';
import { QrScannerModal } from './QrScannerModal';

const ConnectedMap = dynamic(
  () => import('./ConnectedMap').then((mod) => mod.ConnectedMap),
  { ssr: false }
);

interface SavedSession {
  groupId: string;
  memberToken: string;
  memberId: string;
  groupName: string;
  isCreator: boolean;
}

const SESSION_STORAGE_KEY = 'kumbh_connected_session_v1';

export function GetConnectedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlInviteCode = searchParams.get('code');

  // Session & Group state
  const [session, setSession] = useState<SavedSession | null>(null);
  const [group, setGroup] = useState<SanitizedGroup | null>(null);
  const [currentMember, setCurrentMember] = useState<SanitizedMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forms
  const [viewMode, setViewMode] = useState<'create' | 'join'>('create');
  const [preGroupMobileTab, setPreGroupMobileTab] = useState<'map' | 'form'>('map');
  const [createGroupName, setCreateGroupName] = useState('');
  const [createCreatorName, setCreateCreatorName] = useState('');
  const [createMeetingPoint, setCreateMeetingPoint] = useState('Ram Kund Holy Bathing Ghat');
  const [createPhone, setCreatePhone] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [joinMemberName, setJoinMemberName] = useState('');
  const [joinPhone, setJoinPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL Invite Code Preview
  const [previewGroup, setPreviewGroup] = useState<{
    id: string;
    name: string;
    meetingPoint?: string;
    inviteCode: string;
    memberCount: number;
  } | null>(null);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [isEndConfirmOpen, setIsEndConfirmOpen] = useState(false);

  // Active view tab in mobile: 'map' | 'members' | 'alerts'
  const [mobileTab, setMobileTab] = useState<'map' | 'members' | 'alerts'>('map');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Geolocation & Consent state
  const [isSharingActive, setIsSharingActive] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [currentGpsAccuracy, setCurrentGpsAccuracy] = useState<number | null>(null);
  const [lastLocationUpdateTime, setLastLocationUpdateTime] = useState<number | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Alert / Ping input
  const [pingMessage, setPingMessage] = useState('');
  const [isSendingPing, setIsSendingPing] = useState(false);

  // 1. Load active session from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed: SavedSession = JSON.parse(stored);
        if (parsed.groupId && parsed.memberToken) {
          setSession(parsed);
          fetchGroupData(parsed.groupId, parsed.memberToken);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse session:', e);
    }
    setIsLoading(false);
  }, []);

  // 2. Handle URL invite code lookup
  useEffect(() => {
    if (urlInviteCode) {
      const cleanCode = urlInviteCode.trim().toUpperCase();
      setJoinCode(cleanCode);
      setViewMode('join');

      fetch(`/api/connected/groups?code=${encodeURIComponent(cleanCode)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.group) {
            setPreviewGroup(data.group);
          }
        })
        .catch((err) => console.warn('Preview error:', err));
    }
  }, [urlInviteCode]);

  // Fetch full group details for authenticated member
  const fetchGroupData = async (groupId: string, token: string) => {
    try {
      const res = await fetch(`/api/connected/groups/${groupId}?token=${encodeURIComponent(token)}`);
      const data = await res.json();

      if (res.ok && data.success && data.group) {
        setGroup(data.group);
        setCurrentMember(data.currentMember);
        setIsSharingActive(Boolean(data.currentMember?.isSharing));
      } else {
        // Group ended or member removed
        clearSession();
        setErrorMsg(data.error || 'Your group session has ended.');
      }
    } catch {
      setErrorMsg('Network error connecting to Kumbh servers.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = () => {
    stopLiveLocationSharing();
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setSession(null);
    setGroup(null);
    setCurrentMember(null);
    setIsSharingActive(false);
  };

  // 3. Real-time Synchronization (SSE + Polling Fallback)
  useEffect(() => {
    if (!session || !group) return;

    let eventSource: EventSource | null = null;
    let fallbackPollTimer: NodeJS.Timeout | null = null;

    try {
      const streamUrl = `/api/connected/groups/${session.groupId}/stream?token=${encodeURIComponent(
        session.memberToken
      )}`;
      eventSource = new EventSource(streamUrl);

      eventSource.addEventListener('update', (e) => {
        try {
          const updated: SanitizedGroup = JSON.parse(e.data);
          if (updated.isEnded) {
            clearSession();
            setErrorMsg('This group was ended by the creator.');
          } else {
            setGroup(updated);
            const mySelf = updated.members.find((m) => m.id === session.memberId);
            if (!mySelf) {
              clearSession();
              setErrorMsg('Your access to this group has been revoked.');
            } else {
              setCurrentMember(mySelf);
              setIsSharingActive(mySelf.isSharing);
            }
          }
        } catch (err) {
          console.error('[SSE] update parse error:', err);
        }
      });

      eventSource.onerror = () => {
        // Fallback polling if SSE disconnects on mobile network
        if (!fallbackPollTimer) {
          fallbackPollTimer = setInterval(() => {
            fetchGroupData(session.groupId, session.memberToken);
          }, 4000);
        }
      };
    } catch {
      fallbackPollTimer = setInterval(() => {
        fetchGroupData(session.groupId, session.memberToken);
      }, 4000);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (fallbackPollTimer) {
        clearInterval(fallbackPollTimer);
      }
    };
  }, [session?.groupId, session?.memberToken, session?.memberId]);

  // 4. Geolocation Tracking & Privacy Controls
  const startLiveLocationSharing = useCallback(() => {
    if (!session) return;
    setGeoError(null);

    if (!('geolocation' in navigator)) {
      setGeoError('GPS Geolocation is not supported by your browser.');
      return;
    }

    // Stop existing watch if any
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    const onPositionSuccess = async (pos: GeolocationPosition) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = Math.round(pos.coords.accuracy);
      const heading = pos.coords.heading;
      const speed = pos.coords.speed;

      setCurrentGpsAccuracy(accuracy);
      setLastLocationUpdateTime(Date.now());
      setIsSharingActive(true);
      setGeoError(null);

      // Check battery level if available
      let batteryPct: number | undefined;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const batteryManager = await (navigator as any).getBattery?.();
        if (batteryManager && typeof batteryManager.level === 'number') {
          batteryPct = Math.round(batteryManager.level * 100);
        }
      } catch {
        // battery api optional
      }

      // Send to server
      try {
        await fetch(`/api/connected/groups/${session.groupId}/location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.memberToken}`,
          },
          body: JSON.stringify({
            isSharing: true,
            location: { lat, lng, accuracy, heading, speed },
            battery: batteryPct,
          }),
        });
      } catch (err) {
        console.warn('Failed to sync location to server:', err);
      }
    };

    const onPositionError = (err: GeolocationPositionError) => {
      console.warn('[Geolocation] Error:', err);
      if (err.code === err.PERMISSION_DENIED) {
        setGeoError(
          'Location permission was denied. Please allow location access in your browser to share your position with your group.'
        );
        stopLiveLocationSharing();
      } else if (err.code === err.POSITION_UNAVAILABLE) {
        setGeoError('GPS signal is weak or unavailable. Try stepping into open ground.');
      } else if (err.code === err.TIMEOUT) {
        setGeoError('GPS location request timed out. Retrying...');
      }
    };

    // Watch position continuously
    const id = navigator.geolocation.watchPosition(onPositionSuccess, onPositionError, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 4000,
    });

    watchIdRef.current = id;
    setIsSharingActive(true);
  }, [session]);

  const stopLiveLocationSharing = useCallback(async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsSharingActive(false);
    setCurrentGpsAccuracy(null);

    if (session) {
      try {
        await fetch(`/api/connected/groups/${session.groupId}/location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.memberToken}`,
          },
          body: JSON.stringify({
            isSharing: false,
            location: null,
          }),
        });
      } catch (err) {
        console.warn('Failed to stop sharing on server:', err);
      }
    }
  }, [session]);

  // Clean up geolocation on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  // 5. Create Group Action
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createGroupName.trim() || !createCreatorName.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/connected/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName: createGroupName.trim(),
          creatorName: createCreatorName.trim(),
          meetingPoint: createMeetingPoint.trim(),
          creatorPhone: createPhone.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const newSession: SavedSession = {
          groupId: data.group.id,
          memberToken: data.creatorToken,
          memberId: data.memberId,
          groupName: data.group.name,
          isCreator: true,
        };
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
        setSession(newSession);
        setGroup(data.group);
        const selfMember = data.group.members.find((m: SanitizedMember) => m.id === data.memberId);
        setCurrentMember(selfMember || null);
        setSuccessMsg(`Group "${data.group.name}" created successfully! Invite your family members below.`);
        setIsShareModalOpen(true);
      } else {
        setErrorMsg(data.error || 'Failed to create group');
      }
    } catch {
      setErrorMsg('Failed to connect to Kumbh server');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Join Group Action
  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = joinCode.trim().toUpperCase();
    if (!code || !joinMemberName.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/connected/groups/${code}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberName: joinMemberName.trim(),
          phone: joinPhone.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const newSession: SavedSession = {
          groupId: data.group.id,
          memberToken: data.memberToken,
          memberId: data.memberId,
          groupName: data.group.name,
          isCreator: false,
        };
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
        setSession(newSession);
        setGroup(data.group);
        const selfMember = data.group.members.find((m: SanitizedMember) => m.id === data.memberId);
        setCurrentMember(selfMember || null);
        setSuccessMsg(`You have joined "${data.group.name}"!`);
      } else {
        setErrorMsg(data.error || 'Failed to join group. Verify the invite code.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7. Leave Group Action
  const handleLeaveGroup = async () => {
    if (!session) return;
    try {
      await fetch(`/api/connected/groups/${session.groupId}/leave`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.memberToken}` },
      });
    } catch (e) {
      console.warn(e);
    }
    clearSession();
    setIsLeaveConfirmOpen(false);
    setSuccessMsg('You have left the group.');
  };

  // 8. End / Disband Group (Creator)
  const handleEndGroup = async () => {
    if (!session || !session.isCreator) return;
    try {
      await fetch(`/api/connected/groups/${session.groupId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.memberToken}` },
      });
    } catch (e) {
      console.warn(e);
    }
    clearSession();
    setIsEndConfirmOpen(false);
    setSuccessMsg('Group has been closed and disbanded.');
  };

  // 9. Revoke Member (Creator)
  const handleRevokeMember = async (memberId: string) => {
    if (!session || !session.isCreator) return;
    try {
      const res = await fetch(`/api/connected/groups/${session.groupId}/members/${memberId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.memberToken}` },
      });
      if (res.ok) {
        setGroup((prev) =>
          prev ? { ...prev, members: prev.members.filter((m) => m.id !== memberId) } : null
        );
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // 10. Send Ping / Alert
  const handleSendPing = async (msg: string, type: 'info' | 'help' | 'meeting' | 'safe') => {
    if (!session || !msg.trim()) return;
    setIsSendingPing(true);
    try {
      const res = await fetch(`/api/connected/groups/${session.groupId}/ping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.memberToken}`,
        },
        body: JSON.stringify({ message: msg.trim(), type }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.ping) {
        setGroup((prev) =>
          prev ? { ...prev, pings: [data.ping, ...(prev.pings || [])] } : null
        );
        setPingMessage('');
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsSendingPing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[500px]">
        <div className="w-12 h-12 rounded-full border-4 border-[#984300]/20 border-t-[#984300] animate-spin mb-4" />
        <p className="text-sm font-semibold text-[#564339]">Connecting to Kumbh Live Network...</p>
      </div>
    );
  }

  // ── GROUP NOT ACTIVE: SHOW SPLIT VIEW WITH LIVE MAP & CREATE/JOIN HUB ──
  if (!session || !group) {
    return (
      <div className="w-full flex-1 flex flex-col md:flex-row overflow-hidden relative bg-[#fcf9f4]" style={{ minHeight: 0, height: '100%' }}>
        {/* Mobile Tab Switcher */}
        <div className="md:hidden flex border-b border-[#e8e4df] bg-white sticky top-0 z-20">
          <button
            onClick={() => setPreGroupMobileTab('map')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition ${
              preGroupMobileTab === 'map'
                ? 'border-[#984300] text-[#984300]'
                : 'border-transparent text-[#786d66]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Sacred Map</span>
          </button>
          <button
            onClick={() => setPreGroupMobileTab('form')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition ${
              preGroupMobileTab === 'form'
                ? 'border-[#984300] text-[#984300]'
                : 'border-transparent text-[#786d66]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{viewMode === 'create' ? 'Create Group' : 'Join Group'}</span>
          </button>
        </div>

        {/* Left Pane (Desktop) / Form Tab (Mobile): Create & Join Hub */}
        <div
          className={`w-full md:w-[440px] lg:w-[480px] bg-white border-r border-[#e8e4df] p-4 md:p-6 overflow-y-auto flex flex-col shrink-0 z-10 shadow-md ${
            preGroupMobileTab === 'map' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Hero Header */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#984300]/10 text-[#984300] text-xs font-bold uppercase tracking-wider mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#984300]" />
              <span>Kumbh Get Connected</span>
            </div>

            <h1
              className="text-2xl md:text-3xl font-extrabold text-[#1c1c19] tracking-tight leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Stay Together in Holy Nashik
            </h1>
            <p className="text-xs md:text-sm text-[#564339] mt-1.5 leading-relaxed">
              Create a private devotee group or join with QR to track family members live on the sacred Kumbh map.
            </p>

            {/* Privacy Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[10.5px] font-semibold text-[#786d66]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fcf9f4] rounded-full border border-[#e5e2dd]">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>100% Consent</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fcf9f4] rounded-full border border-[#e5e2dd]">
                <ShieldCheck className="w-3 h-3 text-sky-600" />
                <span>Zero Public Storage</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fcf9f4] rounded-full border border-[#e5e2dd]">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                <span>Stop Anytime</span>
              </span>
            </div>
          </div>

          {/* Global Notifications */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 shadow-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <p className="flex-1 font-medium">{errorMsg}</p>
              <button onClick={() => setErrorMsg(null)} className="text-rose-500 hover:text-rose-700">✕</button>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-sm">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="flex-1 font-medium">{successMsg}</p>
              <button onClick={() => setSuccessMsg(null)} className="text-emerald-500 hover:text-emerald-700">✕</button>
            </div>
          )}

          {/* Action Toggle (Create vs Join) */}
          <div className="bg-[#fcf9f4] rounded-2xl p-1 border border-[#e8e4df] flex mb-4">
            <button
              onClick={() => setViewMode('create')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                viewMode === 'create'
                  ? 'bg-[#984300] text-white shadow-sm'
                  : 'text-[#786d66] hover:text-[#1c1c19]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Group</span>
            </button>
            <button
              onClick={() => setViewMode('join')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                viewMode === 'join'
                  ? 'bg-[#984300] text-white shadow-sm'
                  : 'text-[#786d66] hover:text-[#1c1c19]'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Join Group</span>
            </button>
          </div>

          {/* ── CREATE GROUP FORM ── */}
          {viewMode === 'create' && (
            <div className="bg-[#fcf9f4] rounded-2xl p-4 md:p-5 border border-[#e8e4df]">
              <h2
                className="text-base font-bold text-[#1c1c19] mb-0.5"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Create Devotee Group
              </h2>
              <p className="text-[11px] text-[#786d66] mb-3">
                Generates a unique QR code and private link for your companions.
              </p>

              <form onSubmit={handleCreateGroup} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Group Name <span className="text-[#984300]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma Family Nashik"
                    value={createGroupName}
                    onChange={(e) => setCreateGroupName(e.target.value)}
                    className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-medium text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Your Profile Name <span className="text-[#984300]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={createCreatorName}
                    onChange={(e) => setCreateCreatorName(e.target.value)}
                    className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-medium text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Meeting Point (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ram Kund Ghat Pillar 3"
                    value={createMeetingPoint}
                    onChange={(e) => setCreateMeetingPoint(e.target.value)}
                    className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-medium text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Your Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={createPhone}
                    onChange={(e) => setCreatePhone(e.target.value)}
                    className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-medium text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !createGroupName.trim() || !createCreatorName.trim()}
                  className="w-full py-3 px-4 rounded-xl bg-[#984300] hover:bg-[#803800] text-white text-xs font-bold shadow-md shadow-[#984300]/25 transition active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Group...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Group &amp; Generate QR</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ── JOIN GROUP FORM ── */}
          {viewMode === 'join' && (
            <div className="bg-[#fcf9f4] rounded-2xl p-4 md:p-5 border border-[#e8e4df]">
              {previewGroup ? (
                <div className="mb-4 p-3 rounded-xl bg-white border border-[#b87635]/30 text-center">
                  <span className="text-[9.5px] uppercase font-bold text-[#984300] tracking-wider">
                    You are invited to join
                  </span>
                  <h3
                    className="text-base font-bold text-[#1c1c19] mt-0.5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {previewGroup.name}
                  </h3>
                  <p className="text-[11px] text-[#786d66] mt-0.5">
                    {previewGroup.memberCount} member(s) already connected
                  </p>
                  {previewGroup.meetingPoint && (
                    <p className="text-xs text-[#564339] mt-1 font-medium">
                      📍 Assembly: {previewGroup.meetingPoint}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <h2
                    className="text-base font-bold text-[#1c1c19] mb-0.5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Join Devotee Group
                  </h2>
                  <p className="text-[11px] text-[#786d66] mb-3">
                    Scan with camera or enter the invite code below.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-[#3c2e28] text-xs font-bold border border-[#d8d3cb] flex items-center justify-center gap-2 mb-3 transition active:scale-[0.98]"
                  >
                    <Camera className="w-4 h-4 text-[#984300]" />
                    <span>Scan QR Code with Camera</span>
                  </button>
                </>
              )}

              <form onSubmit={handleJoinGroup} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Invite Code <span className="text-[#984300]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. KMB-7X9P"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-mono font-bold tracking-wider text-[#1c1c19] uppercase focus:outline-none focus:ring-2 focus:ring-[#984300]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsScannerOpen(true)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#984300] hover:bg-[#984300]/10 rounded-lg transition"
                      title="Scan QR"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Your Profile Name <span className="text-[#984300]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Patil"
                    value={joinMemberName}
                    onChange={(e) => setJoinMemberName(e.target.value)}
                    className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-medium text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3c2e28] uppercase tracking-wider mb-1">
                    Your Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={joinPhone}
                    onChange={(e) => setJoinPhone(e.target.value)}
                    className="w-full bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-xs font-medium text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !joinCode.trim() || !joinMemberName.trim()}
                  className="w-full py-3 px-4 rounded-xl bg-[#984300] hover:bg-[#803800] text-white text-xs font-bold shadow-md shadow-[#984300]/25 transition active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Joining Group...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Devotee Group</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Pane (Desktop) / Map Tab (Mobile): Interactive Leaflet Map */}
        <div
          className={`flex-1 relative ${
            preGroupMobileTab !== 'map' ? 'hidden md:block' : 'block'
          } h-full min-h-[420px]`}
          style={{ width: '100%', height: '100%', minHeight: '420px' }}
        >
          <ConnectedMap
            members={[]}
            currentMemberId=""
          />

          {/* Floating Kumbh Live Info Card on Top of Map */}
          <div className="absolute top-3 left-3 z-[100] max-w-[280px] bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-[#e5e2dd] shadow-lg flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#984300] animate-pulse shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#1c1c19] uppercase tracking-wider">Kumbh Sacred Map</p>
              <p className="text-[10px] text-[#786d66]">Tap landmarks or join a group to see live family locations</p>
            </div>
          </div>

          {/* On Mobile: Floating 'Create / Join Group' CTA at Bottom of Map */}
          <div className="md:hidden absolute bottom-5 left-4 right-4 z-[100]">
            <button
              onClick={() => setPreGroupMobileTab('form')}
              className="w-full py-3 px-4 rounded-2xl bg-[#984300] hover:bg-[#803800] text-white text-xs font-bold shadow-2xl flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Users className="w-4 h-4" />
              <span>Create or Join Devotee Group</span>
            </button>
          </div>
        </div>

        {/* QR Scanner Modal */}
        <QrScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onCodeDetected={(code) => {
            setJoinCode(code);
            setViewMode('join');
            setPreGroupMobileTab('form');
          }}
        />
      </div>
    );
  }

  // ── ACTIVE GROUP SCREEN ──
  const isCreator = currentMember?.isCreator || session.isCreator;
  const sharingCount = group.members.filter((m) => m.isSharing).length;

  return (
    <div className="w-full flex flex-col flex-1 bg-[#fcf9f4]" style={{ height: '100%', overflow: 'hidden' }}>
      {/* ── TOP GROUP HEADER BAR ── */}
      <div className="bg-white border-b border-[#e8e4df] shadow-sm px-4 py-3 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Group Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#984300]/10 text-[#984300] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  className="text-base md:text-lg font-bold text-[#1c1c19] truncate leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {group.name}
                </h2>
                {isCreator && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold shrink-0">
                    <Crown className="w-3 h-3 text-amber-700" />
                    <span>Host</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#786d66] mt-0.5">
                <span>{group.members.length} members</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{sharingCount} live on map</span>
                {group.meetingPoint && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline truncate max-w-[200px]">📍 {group.meetingPoint}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Share QR button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="py-1.5 px-3 rounded-xl bg-[#984300] hover:bg-[#803800] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share QR</span>
            </button>

            {/* Leave / End Group */}
            <button
              onClick={() => (isCreator ? setIsEndConfirmOpen(true) : setIsLeaveConfirmOpen(true))}
              className="p-2 rounded-xl text-[#786d66] hover:text-rose-600 hover:bg-rose-50 transition"
              title={isCreator ? 'End / Disband Group' : 'Leave Group'}
            >
              {isCreator ? <Trash2 className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── PRIVACY & LIVE LOCATION CONSENT BANNER ── */}
      <div className="px-4 py-2 bg-gradient-to-r from-[#fbf8f2] to-[#f5eee3] border-b border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status info */}
          <div className="flex items-center gap-3">
            {isSharingActive ? (
              <div className="relative flex items-center justify-center shrink-0">
                <span className="absolute w-5 h-5 rounded-full bg-emerald-500 animate-ping opacity-50" />
                <span className="relative w-3.5 h-3.5 rounded-full bg-emerald-600" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <EyeOff className="w-4 h-4" />
              </div>
            )}

            <div className="text-xs">
              {isSharingActive ? (
                <div>
                  <span className="font-extrabold text-emerald-800 tracking-wide uppercase text-[11px]">
                    🟢 Live GPS Sharing Active
                  </span>
                  <span className="text-slate-600 text-[11px] ml-1.5">
                    {currentGpsAccuracy ? `(Accuracy: ±${currentGpsAccuracy}m)` : ''} • Visible only to your group
                  </span>
                </div>
              ) : (
                <div>
                  <span className="font-bold text-[#564339]">
                    🔒 Live Location Sharing is Paused
                  </span>
                  <span className="text-[#786d66] text-[11px] block sm:inline sm:ml-1">
                    Your location is completely private until you explicitly enable it.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Consent / Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            {isSharingActive ? (
              <button
                onClick={stopLiveLocationSharing}
                className="py-1.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              >
                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                <span>Stop Sharing</span>
              </button>
            ) : (
              <button
                onClick={startLiveLocationSharing}
                className="py-1.5 px-3.5 rounded-xl bg-[#984300] hover:bg-[#803800] text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 animate-pulse" />
                <span>Share My Live Location</span>
              </button>
            )}
          </div>
        </div>

        {/* GPS Permission Warning if any */}
        {geoError && (
          <div className="max-w-7xl mx-auto mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <p>{geoError}</p>
            </div>
            <button
              onClick={startLiveLocationSharing}
              className="underline font-bold text-rose-900 text-xs shrink-0 ml-2"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* ── MOBILE VIEW TAB SWITCHER ── */}
      <div className="md:hidden flex border-b border-[#e8e4df] bg-white">
        <button
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'map'
              ? 'border-[#984300] text-[#984300]'
              : 'border-transparent text-[#786d66]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Live Map ({sharingCount})</span>
        </button>
        <button
          onClick={() => setMobileTab('members')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'members'
              ? 'border-[#984300] text-[#984300]'
              : 'border-transparent text-[#786d66]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Members ({group.members.length})</span>
        </button>
        <button
          onClick={() => setMobileTab('alerts')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'alerts'
              ? 'border-[#984300] text-[#984300]'
              : 'border-transparent text-[#786d66]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Pings &amp; Alerts</span>
        </button>
      </div>

      {/* ── MAIN CONTENT AREA (SPLIT DESKTOP / TABBED MOBILE) ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative" style={{ minHeight: 0 }}>
        {/* ── SIDEBAR / MEMBER LIST & PINGS ── */}
        <div
          className={`w-full md:w-80 lg:w-96 bg-white border-r border-[#e8e4df] flex flex-col shrink-0 overflow-y-auto ${
            mobileTab === 'map' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Quick Meeting Announcement / Alert */}
          <div className="p-4 border-b border-[#e8e4df] bg-[#fcf9f4]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#786d66] uppercase tracking-wider flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-[#984300]" />
                <span>Group Pings &amp; Meeting Alerts</span>
              </span>
            </div>

            {/* Quick ping preset chips */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <button
                onClick={() =>
                  handleSendPing(
                    group.meetingPoint ? `Regroup at ${group.meetingPoint} now!` : 'Regroup at Ram Kund now!',
                    'meeting'
                  )
                }
                disabled={isSendingPing}
                className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10.5px] font-bold transition active:scale-95"
              >
                📍 Meet Point
              </button>
              <button
                onClick={() => handleSendPing('I am lost in the crowd, please locate me on map!', 'help')}
                disabled={isSendingPing}
                className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 text-[10.5px] font-bold transition active:scale-95"
              >
                🆘 Lost Alert
              </button>
              <button
                onClick={() => handleSendPing('Completed Darshan / Snan, all safe!', 'safe')}
                disabled={isSendingPing}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10.5px] font-bold transition active:scale-95"
              >
                ✅ All Safe
              </button>
            </div>

            {/* Custom ping input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Send quick note to group..."
                value={pingMessage}
                onChange={(e) => setPingMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && pingMessage.trim()) {
                    handleSendPing(pingMessage, 'info');
                  }
                }}
                className="flex-1 bg-white border border-[#d8d3cb] rounded-xl px-3 py-1.5 text-xs text-[#1c1c19] focus:outline-none focus:ring-1 focus:ring-[#984300]"
              />
              <button
                onClick={() => handleSendPing(pingMessage, 'info')}
                disabled={isSendingPing || !pingMessage.trim()}
                className="py-1.5 px-3 rounded-xl bg-[#984300] hover:bg-[#803800] text-white text-xs font-bold disabled:opacity-50 transition"
              >
                Send
              </button>
            </div>

            {/* Recent pings */}
            {group.pings && group.pings.length > 0 && (
              <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {group.pings.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className={`p-2 rounded-xl text-xs border ${
                      p.type === 'help'
                        ? 'bg-rose-50 border-rose-200 text-rose-900 font-semibold'
                        : p.type === 'meeting'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-white border-[#e5e2dd] text-[#3c2e28]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                      <span className="font-bold text-[#1c1c19]">{p.memberName}</span>
                      <span>{new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="leading-snug">{p.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Members List Header */}
          <div className="p-3 bg-white border-b border-[#e8e4df] flex items-center justify-between">
            <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">
              Group Members ({group.members.length})
            </span>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-xs font-bold text-[#984300] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite</span>
            </button>
          </div>

          {/* Members List Cards */}
          <div className="p-3 space-y-2 flex-1">
            {group.members.map((member) => {
              const isMe = member.id === session.memberId;
              const isSelected = member.id === selectedMemberId;
              const hasLocation = member.isSharing && member.location;

              return (
                <div
                  key={member.id}
                  onClick={() => {
                    setSelectedMemberId(member.id);
                    if (mobileTab !== 'map') setMobileTab('map');
                  }}
                  className={`p-3 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-[#fcf9f4] hover:bg-white border-[#e8e4df]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Avatar */}
                      <div
                        className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm relative"
                        style={{ backgroundColor: member.avatarColor || '#984300' }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                        {hasLocation && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                      </div>

                      {/* Name & status */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-[#1c1c19] truncate leading-tight">
                            {member.name} {isMe && '(You)'}
                          </h4>
                          {member.isCreator && (
                            <span title="Creator"><Crown className="w-3 h-3 text-amber-600 shrink-0" /></span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-[10.5px] mt-0.5">
                          {hasLocation ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              <span>Live on Map</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                              <span>Sharing Paused</span>
                            </span>
                          )}

                          {typeof member.battery === 'number' && (
                            <span className="text-slate-500">🔋 {member.battery}%</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center transition"
                          title={`Call ${member.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* Revoke button if creator */}
                      {isCreator && !isMe && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Remove ${member.name} from group?`)) {
                              handleRevokeMember(member.id);
                            }
                          }}
                          className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition"
                          title="Remove member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MAP CONTAINER (DESKTOP MAIN / MOBILE TAB) ── */}
        <div
          className={`flex-1 relative ${
            mobileTab !== 'map' ? 'hidden md:block' : 'block'
          } h-full min-h-[450px]`}
          style={{ width: '100%', height: '100%', minHeight: '450px' }}
        >
          <ConnectedMap
            members={group.members}
            currentMemberId={session.memberId}
            selectedMemberId={selectedMemberId}
            onSelectMember={(m) => setSelectedMemberId(m.id)}
          />
        </div>
      </div>

      {/* ── SHARE QR MODAL ── */}
      <ShareQrModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        groupName={group.name}
        inviteCode={group.inviteCode}
        meetingPoint={group.meetingPoint}
      />

      {/* ── LEAVE GROUP CONFIRM MODAL ── */}
      {isLeaveConfirmOpen && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#e5e2dd] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1c19]">Leave Group?</h3>
              <p className="text-xs text-[#786d66] mt-1 leading-relaxed">
                Your live location will immediately stop updating and you will be removed from &ldquo;{group.name}&rdquo;.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setIsLeaveConfirmOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-[#d8d3cb] text-[#3c2e28] text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveGroup}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
              >
                Leave Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── END GROUP CONFIRM MODAL (CREATOR) ── */}
      {isEndConfirmOpen && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#e5e2dd] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1c19]">Disband &amp; End Group?</h3>
              <p className="text-xs text-[#786d66] mt-1 leading-relaxed">
                As the group creator, ending the group will immediately clear all member locations and close the session for everyone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setIsEndConfirmOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-[#d8d3cb] text-[#3c2e28] text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEndGroup}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
              >
                End Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
