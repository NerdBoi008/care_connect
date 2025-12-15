import { Suspense } from "react";
import { MessagesClient } from "@/components/messages/messages-client";
import { getConversations } from "@/lib/data/messages";

export const metadata = {
  title: "Messages | HealthCarePlus",
  description: "Secure messaging with your healthcare providers",
};

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>;
}) {
  const { doctor } = await searchParams;
  // In production: Get current user ID from session
  const currentUserId = "mock-user-id";
  const conversations = await getConversations(currentUserId);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <MessagesClient
          conversations={conversations}
          initialDoctorId={doctor}
          currentUserId={currentUserId}
        />
      </Suspense>
    </div>
  );
}
