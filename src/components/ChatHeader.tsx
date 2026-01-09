'use client';

import Image from 'next/image';
import { Phone, Video, Search, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  onProfileClick?: () => void;
}

export default function ChatHeader({ onProfileClick }: ChatHeaderProps) {
  return (
    <div className="flex min-h-[64px] md:h-16 items-center justify-between bg-[#202c33] px-3 sm:px-4 border-b border-[#313d45] flex-shrink-0 z-50 py-1 md:py-0">
      {/* Left side - Contact Info */}
      <button
        onClick={onProfileClick}
        className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 hover:bg-[#313d45] rounded-lg px-2 py-1 -mx-2 transition-colors"
      >
        {/* Avatar */}
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-[#111b21] flex-shrink-0">
          <Image 
            src="/WhatsApp Image 2026-01-05 at 14.46.56.jpeg" 
            alt="Waltinho Responde" 
            width={40} 
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Name and Status */}
        <div className="flex flex-col min-w-0 flex-1 justify-center chat-header-text">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <span className="text-white font-medium text-sm sm:text-base truncate whitespace-nowrap">
              Waltinho Responde
            </span>
            <Image 
              src="/verification-badge.png" 
              alt="Verified" 
              width={14} 
              height={14}
              className="flex-shrink-0 object-contain sm:w-4 sm:h-4"
            />
          </div>
          <span className="text-[#8696a0] text-[10px] sm:text-xs leading-tight line-clamp-2 md:truncate md:whitespace-nowrap">
            Assistente Técnico em Engenharia Ferroviária
          </span>
        </div>
      </button>

      {/* Right side - Actions */}
      <div className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0 ml-1">
        <button className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <Video className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button className="p-1.5 sm:p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}

