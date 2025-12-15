import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/data/messages';
import { db } from '@/lib/db/src';
import { messages, conversations } from '@/lib/db/src/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const conversationMessages = await getMessages(params.conversationId);
    return NextResponse.json(conversationMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const body = await request.json();
    const { text } = body;

    // In production: Get user ID from session
    const senderId = 'mock-user-id';

    // Insert message
    const [newMessage] = await db
      .insert(messages)
      .values({
        conversationId: params.conversationId,
        senderId,
        messageText: text,
      })
      .returning();

    // Update conversation last message time
    await db
      .update(conversations)
      .set({ lastMessageAt: new Date() })
      .where(eq(conversations.id, params.conversationId));

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
