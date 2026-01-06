'use client';

import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="flex h-full w-80 lg:w-96 flex-col bg-[#111b21] border-r border-[#313d45] flex-shrink-0">
      {/* Header */}
      <div className="flex h-16 items-center gap-3 bg-[#202c33] px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white text-xl font-semibold">
          W
        </div>
        <span className="text-white text-lg font-medium">Chat Assistant</span>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-2 py-2">
          {/* Single Chat Item */}
          <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#2a3942] px-3 py-3 hover:bg-[#202c33] transition-colors">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-[#111b21]">
                <Image 
                  src="/WhatsApp Image 2026-01-05 at 14.46.56.jpeg" 
                  alt="Waltinho Responde" 
                  width={48} 
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111b21]">
                <Image 
                  src="/verification-badge.png" 
                  alt="Verified" 
                  width={16} 
                  height={16}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Chat Info */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="truncate text-white font-medium text-base">
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
              <span className="truncate text-[#8696a0] text-sm mt-0.5">
                Assistente Técnico Ferroviário
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

