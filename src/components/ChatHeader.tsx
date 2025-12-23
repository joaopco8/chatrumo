'use client';

import Image from 'next/image';
import { Phone, Video, Search, MoreVertical } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="flex h-16 items-center justify-between bg-[#202c33] px-4 border-b border-[#313d45]">
      {/* Left side - Contact Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full overflow-hidden bg-[#111b21] flex-shrink-0">
          <Image 
            src="/waltinho-profile.jpg" 
            alt="Waltinho Responde" 
            width={40} 
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Name and Status */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-medium text-base">
              Waltinho Responde
            </span>
            <Image 
              src="/verification-badge.png" 
              alt="Verified" 
              width={16} 
              height={16}
              className="flex-shrink-0 object-contain"
            />
          </div>
          <span className="text-[#8696a0] text-xs">
            Assistente Técnico em Engenharia Ferroviária
          </span>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <Video className="h-5 w-5" />
        </button>
        <button className="p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <Phone className="h-5 w-5" />
        </button>
        <button className="p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

