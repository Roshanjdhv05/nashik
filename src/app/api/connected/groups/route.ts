import { NextRequest, NextResponse } from 'next/server';
import { createGroup, lookupGroupByCode } from '@/lib/connectedStore';

// POST /api/connected/groups - Create a new group
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { groupName, creatorName, creatorPhone, meetingPoint } = body;

    if (!groupName || typeof groupName !== 'string' || !groupName.trim()) {
      return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
    }
    if (!creatorName || typeof creatorName !== 'string' || !creatorName.trim()) {
      return NextResponse.json({ error: 'Your name is required' }, { status: 400 });
    }

    const result = await createGroup({
      groupName: groupName.trim(),
      creatorName: creatorName.trim(),
      creatorPhone: creatorPhone?.trim(),
      meetingPoint: meetingPoint?.trim(),
    });

    return NextResponse.json({
      success: true,
      group: result.group,
      creatorToken: result.creatorToken,
      memberId: result.memberId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/connected/groups?code=KMB-XYZ - Public lookup preview
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
    }

    const group = await lookupGroupByCode(code);
    if (!group) {
      return NextResponse.json({ error: 'Group not found or has ended' }, { status: 404 });
    }

    return NextResponse.json({ success: true, group });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
