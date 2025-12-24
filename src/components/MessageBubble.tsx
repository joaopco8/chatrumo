'use client';

import { Message } from '@/types/message';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const timeString = message.timestamp.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-1 px-2 sm:px-4`}
    >
      <div
        className={`group relative max-w-[85%] sm:max-w-[65%] rounded-lg px-3 sm:px-2 py-1.5 sm:py-1.5 shadow-sm ${
          isUser
            ? 'bg-[#005c4b] text-white rounded-tr-none'
            : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
        }`}
      >
        {/* Message Text */}
        <p className="text-sm sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>

        {/* Timestamp and Status */}
        <div
          className={`flex items-center justify-end gap-1 mt-0.5 ${
            isUser ? 'text-[#99beb7]' : 'text-[#8696a0]'
          }`}
        >
          <span className="text-[0.6875rem] leading-none">{timeString}</span>
          {isUser && (
            <div className="flex items-center">
              <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

