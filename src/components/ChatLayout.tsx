'use client';

import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/message';
import { ChatResponse, ChatError } from '@/types/api';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import ContactProfile from './ContactProfile';

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial message from Waltinho
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      text: 'Olá, sou o Waltinho, assistente técnico em engenharia ferroviária. Para iniciar, por favor informe sua matrícula (CS).',
      sender: 'waltinho',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          isAuthenticated: isAuthenticated 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse | ChatError = await response.json();

      // Check if response contains an error
      if ('error' in data) {
        throw new Error(data.error);
      }

      // Verifica se foi uma autenticação bem-sucedida
      if (data.authenticated === true && !isAuthenticated) {
        setIsAuthenticated(true);
      }

      // Add Waltinho's response
      const waltinhoResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'waltinho',
        timestamp: new Date(data.timestamp || Date.now()),
      };

      setMessages((prev) => [...prev, waltinhoResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        sender: 'waltinho',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0b141a] max-w-full overflow-hidden fixed inset-0">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col w-full min-w-0 relative md:ml-0">
        {/* Chat Header - Fixed at top */}
        <ChatHeader onProfileClick={() => setIsProfileOpen(true)} />

        {/* Contact Profile Modal */}
        <ContactProfile 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />

        {/* Messages Area - Fixed position between header and input */}
        <div 
          className="overflow-y-auto relative bg-mobile-left md:bg-center"
          style={{
            position: 'fixed',
            top: '64px',
            bottom: '64px',
            left: 0,
            right: 0,
            width: '100%',
            backgroundImage: 'url(/chat-background.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          id="messages-area"
        >
          {/* Dark overlay with 50% opacity for readability */}
          <div className="absolute inset-0 bg-[#0b141a] opacity-50"></div>
          
          {/* Messages container with relative positioning */}
          <div className="relative flex flex-col py-4 px-2 sm:px-4 min-h-full">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start px-2 sm:px-4 mb-1">
                <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2.5 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <div className="h-2 w-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input - Fixed at bottom */}
        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

