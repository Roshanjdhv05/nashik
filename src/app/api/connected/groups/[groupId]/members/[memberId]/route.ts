import { NextRequest, NextResponse } from 'next/server';
import { revokeMember } from '@/lib/connectedStore';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

// DELETE /api/connected/groups/[groupId]/members/[memberId] - Creator revokes member access
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ groupId: string; memberId: string }> }
) {
  try {
    const { groupId, memberId } = await context.params;
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json({ error: 'Creator authentication required' }, { status: 401 });
    }

    const ok = await revokeMember(groupId, token, memberId);
    if (!ok) {
      return NextResponse.json(
        { error: 'Unauthorized or member not found' },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, message: 'Member access revoked' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
