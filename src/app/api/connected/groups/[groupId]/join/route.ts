import { NextRequest, NextResponse } from 'next/server';
import { joinGroup } from '@/lib/connectedStore';

// POST /api/connected/groups/[groupId]/join - Join an existing group
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await context.params;
    const body = await req.json();
    const { memberName, phone } = body;

    if (!memberName || typeof memberName !== 'string' || !memberName.trim()) {
      return NextResponse.json({ error: 'Your name is required to join' }, { status: 400 });
    }

    const result = await joinGroup({
      groupIdOrCode: groupId,
      memberName: memberName.trim(),
      phone: phone?.trim(),
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Group not found, expired, or has been ended' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      group: result.group,
      memberToken: result.memberToken,
      memberId: result.memberId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
