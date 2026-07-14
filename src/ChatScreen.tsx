import React, { useState } from 'react';
import { ChevronLeft, Send, Phone, Video, Info } from 'lucide-react';

export default function ChatScreen({ user, onBack }: { user: any, onBack: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, text: user.lastMessage || 'Hey there!', sender: 'them', time: user.time || '10m' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage, sender: 'me', time: 'Just now' }
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col bg-white min-h-full h-full text-gray-900 pb-safe z-50 absolute inset-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 z-10 bg-white">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 focus:outline-none">
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={user.avatar || '/dp.png'} alt={user.user} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user.user}</span>
              <span className="text-[10px] text-gray-500">Active now</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-gray-900" />
          <Video className="w-6 h-6 text-gray-900" />
          <Info className="w-5 h-5 text-gray-900" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 mb-16">
        <div className="text-center text-xs text-gray-500 mb-4">{user.time || 'Today'}</div>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'them' && (
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2 shrink-0 self-end mb-1">
                <img src={user.avatar || '/dp.png'} alt={user.user} className="w-full h-full object-cover" />
              </div>
            )}
            <div 
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.sender === 'me' 
                  ? 'bg-blue-500 text-white rounded-br-sm' 
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm py-1"
          />
          {newMessage.trim() && (
            <button type="submit" className="text-blue-500 font-semibold focus:outline-none">
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
