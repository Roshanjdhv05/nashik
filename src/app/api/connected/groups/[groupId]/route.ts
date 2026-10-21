import { NextRequest, NextResponse } from 'next/server';
import { getGroupForMember, endGroup } from '@/lib/connectedStore';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  const { searchParams } = new URL(req.url);
  return searchParams.get('token');
}

// GET /api/connected/groups/[groupId] - Fetch active group state for authenticated member
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await context.params;
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json({ error: 'Authentication token required' }, { status: 401 });
    }

    const data = await getGroupForMember(groupId, token);
    if (!data) {
      return NextResponse.json(
        { error: 'Group not found, access denied, or group has ended' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      group: data.group,
      currentMember: data.currentMember,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/connected/groups/[groupId] - Disband / End group (Creator only)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await context.params;
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json({ error: 'Creator authentication required' }, { status: 401 });
    }

    const ok = await endGroup(groupId, token);
    if (!ok) {
      return NextResponse.json(
        { error: 'Unauthorized or group not found' },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, message: 'Group has been ended' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
