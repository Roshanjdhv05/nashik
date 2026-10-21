import { NextRequest } from 'next/server';
import { getGroupForMember, subscribeToGroup } from '@/lib/connectedStore';

export const dynamic = 'force-dynamic';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  const { searchParams } = new URL(req.url);
  return searchParams.get('token');
}

// GET /api/connected/groups/[groupId]/stream - Server-Sent Events real-time feed
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await context.params;
  const token = extractToken(req);

  if (!token) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate member before opening stream
  const authCheck = await getGroupForMember(groupId, token);
  if (!authCheck) {
    return new Response(JSON.stringify({ error: 'Unauthorized or group ended' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  let unsubscribe: (() => void) | null = null;
  let heartbeatTimer: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial group snapshot immediately
      const initialPayload = `event: snapshot\ndata: ${JSON.stringify(authCheck.group)}\n\n`;
      controller.enqueue(encoder.encode(initialPayload));

      // Subscribe to real-time updates
      unsubscribe = subscribeToGroup(groupId, (updatedGroup) => {
        try {
          const updatePayload = `event: update\ndata: ${JSON.stringify(updatedGroup)}\n\n`;
          controller.enqueue(encoder.encode(updatePayload));
        } catch (err) {
          console.error('[SSE] Enqueue error:', err);
        }
      });

      // Keep-alive heartbeat every 15s
      heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat ${Date.now()}\n\n`));
        } catch {
          if (heartbeatTimer) clearInterval(heartbeatTimer);
        }
      }, 15000);
    },
    cancel() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
