'use client';

import Image from 'next/image';
import { X, Search, Star, Folder, Train, Shield, Clock, MapPin } from 'lucide-react';

interface ContactProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactProfile({ isOpen, onClose }: ContactProfileProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0b141a] animate-slide-in">
      {/* Header */}
      <div className="flex h-16 items-center justify-between bg-[#202c33] px-4 border-b border-[#313d45]">
        <button
          onClick={onClose}
          className="p-2 text-[#8696a0] hover:text-white hover:bg-[#313d45] rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-white font-medium text-base">Contact info</h2>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {/* Profile Section */}
        <div className="flex flex-col items-center py-6 px-4 bg-[#111b21]">
          <div className="h-32 w-32 rounded-full overflow-hidden bg-[#111b21] mb-4 border-4 border-[#202c33]">
            <Image 
              src="/WhatsApp Image 2026-01-05 at 14.46.56.jpeg" 
              alt="Waltinho Responde" 
              width={128} 
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-white font-semibold text-2xl">Waltinho Responde</h1>
            <Image 
              src="/verification-badge.png" 
              alt="Verified" 
              width={20} 
              height={20}
              className="object-contain"
            />
          </div>
          
          <p className="text-[#8696a0] text-sm mb-4 text-center">
            Assistente Técnico em Engenharia Ferroviária
          </p>

          {/* Search Button */}
          <button className="flex items-center gap-2 bg-[#202c33] hover:bg-[#2a3942] px-4 py-2.5 rounded-lg transition-colors">
            <Search className="h-5 w-5 text-[#8696a0]" />
            <span className="text-white text-sm">Search</span>
          </button>
        </div>

        {/* About Section */}
        <div className="bg-[#111b21] border-t border-[#202c33]">
          <div className="px-4 py-3 border-b border-[#202c33]">
            <p className="text-[#8696a0] text-sm">About</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-white text-sm">
              Assistente técnico especializado em engenharia ferroviária da Rumo. 
              Disponível 24/7 para suporte técnico, consultas sobre operações ferroviárias 
              e orientações sobre procedimentos de segurança e manutenção.
            </p>
          </div>
        </div>

        {/* Rumo Information Section */}
        <div className="bg-[#111b21] border-t border-[#202c33] mt-2">
          <div className="px-4 py-3 border-b border-[#202c33]">
            <p className="text-[#8696a0] text-sm">Rumo - Informações</p>
          </div>
          
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#202c33] rounded-full">
                <Train className="h-5 w-5 text-[#1ad07a]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Operadora Ferroviária</p>
                <p className="text-[#8696a0] text-xs">Maior operadora de ferrovias do Brasil</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#202c33] rounded-full">
                <MapPin className="h-5 w-5 text-[#1ad07a]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Rede Nacional</p>
                <p className="text-[#8696a0] text-xs">Mais de 14.000 km de ferrovias</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#202c33] rounded-full">
                <Shield className="h-5 w-5 text-[#1ad07a]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Segurança e Conformidade</p>
                <p className="text-[#8696a0] text-xs">Padrões internacionais de segurança</p>
              </div>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-[#111b21] border-t border-[#202c33] mt-2">
          <div className="px-4 py-3 border-b border-[#202c33] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-[#8696a0]" />
              <p className="text-white text-sm font-medium">Media, links and docs</p>
            </div>
            <span className="text-[#8696a0] text-sm">0</span>
          </div>
          
          <div className="px-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {/* Placeholder thumbnails - can be replaced with actual media */}
              <div className="aspect-square bg-[#202c33] rounded-lg flex items-center justify-center">
                <Train className="h-6 w-6 text-[#8696a0]" />
              </div>
              <div className="aspect-square bg-[#202c33] rounded-lg flex items-center justify-center">
                <Train className="h-6 w-6 text-[#8696a0]" />
              </div>
              <div className="aspect-square bg-[#202c33] rounded-lg flex items-center justify-center">
                <Train className="h-6 w-6 text-[#8696a0]" />
              </div>
              <div className="aspect-square bg-[#202c33] rounded-lg flex items-center justify-center">
                <Train className="h-6 w-6 text-[#8696a0]" />
              </div>
            </div>
          </div>
        </div>

        {/* Starred Messages */}
        <div className="bg-[#111b21] border-t border-[#202c33] mt-2">
          <div className="px-4 py-3 border-b border-[#202c33] flex items-center gap-2">
            <Star className="h-5 w-5 text-[#8696a0]" />
            <p className="text-white text-sm font-medium">Starred messages</p>
          </div>
          <div className="px-4 py-8">
            <p className="text-[#8696a0] text-sm text-center">No starred messages</p>
          </div>
        </div>

        {/* Rumo Branding */}
        <div className="bg-[#111b21] border-t border-[#202c33] mt-2 mb-4">
          <div className="px-4 py-4 text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Train className="h-6 w-6 text-[#1ad07a]" />
              <span className="text-white text-lg font-semibold">Rumo</span>
            </div>
            <p className="text-[#8696a0] text-xs">
              Conectando o Brasil através das ferrovias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

