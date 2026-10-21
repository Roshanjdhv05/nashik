import { NextRequest, NextResponse } from 'next/server';
import { updateMemberLocation } from '@/lib/connectedStore';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

// POST /api/connected/groups/[groupId]/location - Broadcast member location or cease sharing
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await context.params;
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: missing member token' }, { status: 401 });
    }

    const body = await req.json();
    const { isSharing, location, battery } = body;

    const result = await updateMemberLocation({
      groupId,
      memberToken: token,
      isSharing: Boolean(isSharing),
      location: isSharing && location ? {
        lat: Number(location.lat),
        lng: Number(location.lng),
        accuracy: typeof location.accuracy === 'number' ? location.accuracy : undefined,
        heading: typeof location.heading === 'number' ? location.heading : null,
        speed: typeof location.speed === 'number' ? location.speed : null,
      } : null,
      battery: typeof battery === 'number' ? battery : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to update location or access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      member: result.member,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
