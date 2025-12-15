import { MessageSquare } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="h-10 w-10 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Select a Conversation
      </h3>
      <p className="text-gray-600 max-w-sm">
        Choose a conversation from the sidebar to start messaging with your healthcare provider
      </p>
    </div>
  );
}
