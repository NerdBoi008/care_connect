import { db } from '@/lib/db/src';
import { conversations, messages, doctors, patients, users } from '@/lib/db/src/schema';
import { eq, and, or, desc } from 'drizzle-orm';

export async function getConversations(userId: string) {
  // Get user's conversations with last message
  const userConversations = await db
    .select({
      id: conversations.id,
      patientId: conversations.patientId,
      doctorId: conversations.doctorId,
      lastMessageAt: conversations.lastMessageAt,
      doctor: {
        id: doctors.id,
        firstName: doctors.firstName,
        lastName: doctors.lastName,
        specialization: doctors.specialization,
      },
      patient: {
        id: patients.id,
        firstName: patients.firstName,
        lastName: patients.lastName,
      },
    })
    .from(conversations)
    .leftJoin(doctors, eq(conversations.doctorId, doctors.id))
    .leftJoin(patients, eq(conversations.patientId, patients.id))
    .orderBy(desc(conversations.lastMessageAt));

  return userConversations.map((conv) => ({
    id: conv.id,
    doctorId: conv.doctorId,
    doctorName: conv.doctor ? `Dr. ${conv.doctor.firstName} ${conv.doctor.lastName}` : 'Unknown',
    doctorSpecialization: conv.doctor?.specialization || '',
    patientName: conv.patient ? `${conv.patient.firstName} ${conv.patient.lastName}` : 'Unknown',
    lastMessageAt: conv.lastMessageAt,
  }));
}

export async function getMessages(conversationId: string) {
  const conversationMessages = await db
    .select({
      id: messages.id,
      conversationId: messages.conversationId,
      senderId: messages.senderId,
      messageText: messages.messageText,
      isRead: messages.isRead,
      createdAt: messages.createdAt,
      sender: {
        role: users.role,
      },
    })
    .from(messages)
    .leftJoin(users, eq(messages.senderId, users.id))
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt);

  return conversationMessages.map((msg) => ({
    id: msg.id,
    text: msg.messageText,
    senderId: msg.senderId,
    senderRole: msg.sender?.role || 'unknown',
    isRead: msg.isRead || false,
    timestamp: msg.createdAt,
  }));
}

export async function createOrGetConversation(patientId: string, doctorId: string) {
  // Check if conversation exists
  const [existing] = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.patientId, patientId),
        eq(conversations.doctorId, doctorId)
      )
    )
    .limit(1);

  if (existing) {
    return existing;
  }

  // Create new conversation
  const [newConversation] = await db
    .insert(conversations)
    .values({
      patientId,
      doctorId,
    })
    .returning();

  return newConversation;
}
