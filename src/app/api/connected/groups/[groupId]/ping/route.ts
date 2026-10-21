import { NextRequest, NextResponse } from 'next/server';
import { sendGroupPing } from '@/lib/connectedStore';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

// POST /api/connected/groups/[groupId]/ping - Send quick status alert / ping
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
    const { message, type } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ping = await sendGroupPing({
      groupId,
      memberToken: token,
      message: message.trim(),
      type: type || 'info',
    });

    if (!ping) {
      return NextResponse.json({ error: 'Failed to send alert or group ended' }, { status: 403 });
    }

    return NextResponse.json({ success: true, ping });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
