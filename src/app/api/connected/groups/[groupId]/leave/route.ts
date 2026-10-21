import { NextRequest, NextResponse } from 'next/server';
import { leaveGroup } from '@/lib/connectedStore';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

// POST /api/connected/groups/[groupId]/leave - Member leaves group voluntarily
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

    const ok = await leaveGroup(groupId, token);
    if (!ok) {
      return NextResponse.json({ error: 'Group or member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'You left the group' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
