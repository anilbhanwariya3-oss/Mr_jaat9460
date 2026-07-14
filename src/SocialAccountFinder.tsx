import React, { useState } from 'react';
import { Search, Facebook, Instagram, Twitter, Youtube, CheckCircle, Globe } from 'lucide-react';
import { stories } from './data';

const PLATFORMS = [
  { id: 'all', name: 'All Socials', icon: Globe },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'twitter', name: 'X (Twitter)', icon: Twitter },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
];

export default function SocialAccountFinder({ onMessage, onViewProfile }: { onMessage?: (user: any) => void, onViewProfile?: (user: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState('all');
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const toggleFollow = (userKey: string) => {
    setFollowing(prev => ({
      ...prev,
      [userKey]: !prev[userKey]
    }));
  };

  // Generate a bunch of mock users for the global search
  const generateMockGlobalUsers = () => {
    const users = [];
    
    try {
      const storedUsers = localStorage.getItem('fixagram_users');
      if (storedUsers) {
        const parsed = JSON.parse(storedUsers);
        parsed.forEach((u: any) => {
          users.push({
            id: `fixagram-${u.username}`,
            originalId: u.username,
            user: u.username,
            avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`,
            platform: 'instagram', // Show under instagram filter or 'all'
            verified: true,
            followers: u.followers || '0',
            isRegistered: true
          });
        });
      }
    } catch (e) {
      console.error(e);
    }

    const baseNames = ['woodworker_dan', 'sarah_fixes', 'auto_mike', 'diy_jenny', 'maker_tom', 'weld_it', 'alex_creates', 'jessica_diy', 'tech_guru', 'mr_beast', 'fixer_upper', 'crafty_mom', 'build_it_better', 'home_improvement'];
    const platforms = ['instagram', 'twitter', 'facebook', 'youtube'];
    
    for (let name of baseNames) {
      for (let p of platforms) {
        users.push({
          id: `${p}-${name}`,
          originalId: name,
          user: p === 'youtube' ? name.replace('_', ' ').toUpperCase() : name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}${p}`,
          platform: p,
          verified: Math.random() > 0.5,
          followers: Math.floor(Math.random() * 900) + 10 + 'K'
        });
      }
    }
    return users;
  };

  const [globalUsers] = useState(() => generateMockGlobalUsers());

  const filteredUsers = globalUsers.filter(user => 
    user.user.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (activePlatform === 'all' || user.platform === activePlatform)
  );

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 w-full">
      <div className="p-3 border-b border-gray-100 space-y-3">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search across all social media..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
        
        {/* Platform filters */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
          {PLATFORMS.map(platform => {
            const Icon = platform.icon;
            const isActive = activePlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="flex flex-col gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isFollowing = following[user.id];
              return (
                <div key={user.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0" onClick={() => onViewProfile?.(user)}>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                      <img src={user.avatar} alt={user.user} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm hover:underline truncate flex items-center gap-1">
                        {user.user}
                        {user.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" stroke="white" />}
                      </span>
                      <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                        {user.platform === 'instagram' && <Instagram className="w-3 h-3" />}
                        {user.platform === 'twitter' && <Twitter className="w-3 h-3" />}
                        {user.platform === 'facebook' && <Facebook className="w-3 h-3" />}
                        {user.platform === 'youtube' && <Youtube className="w-3 h-3" />}
                        <span className="capitalize">{user.platform}</span> • {user.followers} followers
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => toggleFollow(user.id)}
                      className={`btn-follow ${isFollowing ? 'following' : ''}`}
                      onMouseEnter={(e) => {
                        if (isFollowing) e.currentTarget.textContent = 'Unfollow';
                      }}
                      onMouseLeave={(e) => {
                        if (isFollowing) e.currentTarget.textContent = 'Following';
                      }}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button 
                      onClick={() => onMessage?.(user)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-900 rounded-[20px] text-sm font-semibold border border-gray-200 hover:bg-gray-200 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
              <Globe className="w-12 h-12 text-gray-300 mb-3" />
              <p className="font-semibold text-gray-900">No results found</p>
              <p className="text-sm">Try searching for a different name or checking another platform.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
