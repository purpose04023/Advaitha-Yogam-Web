import React, { useState } from 'react';
import { Send, Bot, User, Trash2, Layout, Image, PlusCircle, CheckCircle2 } from 'lucide-react';

const AdminAIAssistant = ({ onSuggestion }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your spiritual content assistant. How can I help you organize your articles or images today?' }
  ]);
  const [input, setInput] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSuggesting(false);

    const geminiKey = import.meta.env.VITE_GOOGLE_GEMINI_KEY;
    const aiUrl = import.meta.env.VITE_AI_ASSISTANT_URL;

    if (!geminiKey && !aiUrl) {
      // Fallback for development if no keys
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: 'I suggest a Wikipedia-style layout for this content with the image positioned as a floating card on the right for better readability. (Mock response - No API Key)'
        }]);
        setIsSuggesting(true);
      }, 1000);
      return;
    }

    try {
      // Prefer the dedicated AI assistant URL if available, else direct Gemini
      const targetUrl = aiUrl || `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a spiritual content assistant for an Advaita Vedanta website. Suggest a layout (Wiki style, Hero focus, or Gallery) based on this request: ${input}` }] }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble processing that right now. Try suggesting a Wiki layout.";

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      if (aiText.toLowerCase().includes('wiki') || aiText.toLowerCase().includes('layout')) {
        setIsSuggesting(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to AI. Please check your API keys.' }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden">
      <div className="bg-primary p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-on-secondary-container" />
        </div>
        <div>
          <h3 className="font-headline font-bold">Spiritual AI Assistant</h3>
          <p className="text-[10px] text-primary-fixed uppercase tracking-widest">Powered by Gemini</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === 'user'
                ? 'bg-primary text-white rounded-br-none'
                : 'bg-surface-container text-on-surface rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isSuggesting && (
          <div className="bg-secondary-container/10 p-4 rounded-lg border border-secondary-container/30 space-y-3">
            <p className="text-xs font-bold text-secondary flex items-center gap-2">
              <Layout className="w-4 h-4" /> Recommended Layout
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onSuggestion('wiki')}
                className="flex-1 bg-white border border-secondary-container text-secondary py-2 rounded text-xs font-bold hover:bg-secondary-container hover:text-white transition-all"
              >
                Apply Wiki Style
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-outline-variant/30 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for layout suggestions..."
          className="flex-grow bg-surface-container px-4 py-2 rounded-md border-none focus:ring-1 focus:ring-primary text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-primary text-white p-2 rounded-md hover:opacity-90 transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AdminAIAssistant;
