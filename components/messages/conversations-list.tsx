'use client';

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientName: string;
  lastMessageAt: Date | null;
}

export function ConversationsList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          <div className="divide-y">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                  selectedId === conv.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 shrink-0">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {conv.doctorName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conv.doctorName}
                      </h3>
                      {conv.lastMessageAt && (
                        <span className="text-xs text-gray-500 shrink-0 ml-2">
                          {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    
                    <Badge variant="secondary" className="text-xs mb-1">
                      {conv.doctorSpecialization}
                    </Badge>
                    
                    <p className="text-sm text-gray-600 truncate">
                      Click to start conversation
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
