'use client';

import { useState, useEffect } from 'react';
import { ConversationsList } from './conversations-list';
import { ChatWindow } from './chat-window';
import { EmptyState } from './empty-state';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Conversation {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientName: string;
  lastMessageAt: Date | null;
}

export function MessagesClient({
  conversations,
  initialDoctorId,
  currentUserId,
}: {
  conversations: Conversation[];
  initialDoctorId?: string;
  currentUserId: string;
}) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-select conversation if doctor ID provided
  useEffect(() => {
    if (initialDoctorId && conversations.length > 0) {
      const conv = conversations.find((c) => c.doctorId === initialDoctorId);
      if (conv) {
        setSelectedConversation(conv.id);
      }
    }
  }, [initialDoctorId, conversations]);

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-lg"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Conversations List - Sidebar */}
      <div
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          inset-y-0 left-0
          z-40
          w-80
          bg-white
          border-r
          transition-transform
          duration-300
        `}
      >
        <ConversationsList
          conversations={conversations}
          selectedId={selectedConversation}
          onSelect={(id) => {
            setSelectedConversation(id);
            setMobileMenuOpen(false);
          }}
        />
      </div>

      {/* Chat Window - Main Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConv ? (
          <ChatWindow
            conversation={selectedConv}
            currentUserId={currentUserId}
          />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
