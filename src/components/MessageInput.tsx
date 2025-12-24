'use client';

import { useState, KeyboardEvent } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-16 items-center gap-1 sm:gap-2 bg-[#202c33] px-2 sm:px-4 border-t border-[#313d45] fixed bottom-0 left-0 md:left-80 lg:left-96 right-0 z-50">
      {/* Left Icons */}
      <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
        <button
          className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors"
          type="button"
        >
          <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors"
          type="button"
        >
          <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        disabled={disabled}
        className="flex-1 rounded-lg bg-[#2a3942] px-3 sm:px-4 py-2 sm:py-2.5 text-[#e9edef] text-sm placeholder:text-[#8696a0] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent flex-shrink-0"
        type="button"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

