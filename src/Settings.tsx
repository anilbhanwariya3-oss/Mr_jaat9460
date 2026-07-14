import React from 'react';
import { Bell, Clock, Lock, Star, ShieldBan, Download, Accessibility, Globe, Plus, LogOut, ChevronRight, ChevronLeft, Search } from 'lucide-react';

const SETTINGS_SECTIONS = [
  {
    title: 'How you use Fixagram',
    items: [
      { id: '1', title: 'Notifications', icon: Bell, detail: 'Pause all, sounds' },
      { id: '2', title: 'Time spent', icon: Clock, detail: 'Daily limit, reminders' },
    ],
  },
  {
    title: 'Who can see your content',
    items: [
      { id: '3', title: 'Account privacy', icon: Lock, detail: 'Public / Private' },
      { id: '4', title: 'Close Friends', icon: Star, detail: 'Manage your list' },
      { id: '5', title: 'Blocked', icon: ShieldBan, detail: 'Manage blocked users' },
    ],
  },
  {
    title: 'Your app and media',
    items: [
      { id: '6', title: 'Archiving and downloading', icon: Download, detail: 'Save story to gallery' },
      { id: '7', title: 'Accessibility', icon: Accessibility, detail: 'Captions, dark mode' },
      { id: '8', title: 'Language', icon: Globe, detail: 'English (US)' },
    ],
  },
  {
    title: 'Login',
    items: [
      { id: '9', title: 'Add account', icon: Plus, detail: '', isLink: true },
      { id: '10', title: 'Log out', icon: LogOut, detail: '', isDanger: true },
    ],
  },
];

export default function SettingsScreen({ onBack }: { onBack: () => void }) {
  const handlePressItem = (title: string) => {
    alert(`${title} clicked!`);
  };

  return (
    <div className="flex flex-col bg-black min-h-full h-full text-white pb-safe">
      {/* 🔝 App Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626] bg-black sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-1 focus:outline-none">
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>
        <span className="text-white text-lg font-bold">Settings and activity</span>
        <div className="w-8"></div>
      </div>

      {/* 📜 Scrollable Settings List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        
        {/* Search Bar Placeholder */}
        <div className="bg-[#262626] mx-4 mt-4 mb-2 p-2.5 rounded-lg flex items-center">
          <Search className="w-4 h-4 text-[#8E8E93] mr-2" />
          <span className="text-[#8E8E93] text-sm">Search settings</span>
        </div>

        {/* Sections Mapping */}
        {SETTINGS_SECTIONS.map((section, index) => (
          <div key={index} className="mt-4">
            {/* Section Title */}
            <h3 className="text-[#8E8E93] text-[13px] font-semibold px-4 mb-2 uppercase tracking-wide">
              {section.title}
            </h3>
            
            {/* Section Items */}
            <div className="border-t border-b border-[#262626] bg-[#121212]">
              {section.items.map((item) => (
                <button 
                  key={item.id} 
                  className="w-full flex items-center justify-between py-3.5 px-4 border-b border-[#262626] last:border-b-0 hover:bg-[#1a1a1a] transition-colors focus:outline-none text-left"
                  onClick={() => handlePressItem(item.title)}
                >
                  {/* Left Side: Icon & Texts */}
                  <div className="flex items-center">
                    <item.icon className="w-[22px] h-[22px] mr-4 text-white" strokeWidth={1.5} />
                    <div className="flex flex-col justify-center">
                      <span className={`text-[15px] ${item.isDanger ? 'text-[#FF3B30]' : item.isLink ? 'text-[#0095F6]' : 'text-white'}`}>
                        {item.title}
                      </span>
                      {item.detail && <span className="text-[#8E8E93] text-xs mt-0.5">{item.detail}</span>}
                    </div>
                  </div>

                  {/* Right Side: Arrow Indicator */}
                  {!item.isDanger && !item.isLink && (
                    <ChevronRight className="w-5 h-5 text-[#8E8E93]" strokeWidth={1.5} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Info */}
        <div className="flex flex-col items-center my-10">
          <span className="text-white text-base font-bold tracking-widest">𝕏 Meta</span>
          <span className="text-[#8E8E93] text-xs mt-1.5">Version 315.0.0.2026</span>
        </div>

      </div>
    </div>
  );
}
