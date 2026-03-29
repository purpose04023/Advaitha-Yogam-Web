'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'ai' | 'user';
  content: string;
}

export default function AdminAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Namaste! I am your spiritual assistant. How can I help you share your wisdom today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (err: unknown) {
      setMessages(prev => [...prev, { role: 'ai', content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7] border-l border-gray-200">
      {/* Header */}
      <div className="p-6 bg-[#2D5016] text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-[#E8873A] rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-none">AI Assistant</h3>
          <p className="text-xs text-white/70 mt-1 uppercase tracking-widest font-bold">Always Here to Help</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
              msg.role === 'user'
                ? "bg-[#E8873A] text-white rounded-tr-none"
                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
            )}>
              {msg.content}
            </div>
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold px-2">
              {msg.role === 'ai' ? 'Assistant' : 'You'}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-[#E8873A] font-bold text-xs px-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything in plain English..."
            className="w-full pl-4 pr-12 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8873A] outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#E8873A] text-white rounded-lg hover:bg-[#D67629] transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 text-center uppercase tracking-widest font-bold">
          Type &quot;help&quot; to see what I can do
        </p>
      </div>
    </div>
  );
}
