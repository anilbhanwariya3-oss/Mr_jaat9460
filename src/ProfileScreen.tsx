import React, { useState } from 'react';
import { PlusSquare, Menu, Globe, Facebook, Instagram, Twitter, Youtube, Linkedin, Github } from 'lucide-react';
import { formatNumber, ActivityFollowButton } from './App';

export default function ProfileScreen({ 
  profileData, 
  activeUser, 
  onEdit, 
  onShare, 
  onNewPost, 
  onSettings,
  onMessage
}: { 
  profileData: any, 
  activeUser: any, 
  onEdit: () => void, 
  onShare: () => void, 
  onNewPost: () => void, 
  onSettings: () => void,
  onMessage: (user: any) => void
}) {
  const [profileTab, setProfileTab] = useState<'posts' | 'reels' | 'tagged' | 'saved'>('posts');
  
  const displayProfile = activeUser ? {
    username: activeUser.user,
    name: activeUser.user,
    bio: 'Fixagram user',
    avatar: activeUser.avatar,
    link: '',
    posts: Math.floor(Math.random() * 50) + 1,
    followers: activeUser.followers || (Math.floor(Math.random() * 5000) + 100),
    following: Math.floor(Math.random() * 1000) + 10
  } : {
    ...profileData,
    posts: 14,
    followers: profileData.followers || 154200,
    following: profileData.following || 2430
  };

  return (
    <div className="flex flex-col bg-white min-h-full pb-16">
      <div className="flex justify-between items-center p-4">
        <span className="font-bold text-lg flex items-center gap-1">{displayProfile.username}</span>
        <div className="flex gap-4">
          {!activeUser && <PlusSquare className="w-6 h-6 text-gray-900 cursor-pointer" onClick={onNewPost} />}
          <Menu className="w-6 h-6 text-gray-900 cursor-pointer" onClick={onSettings} />
        </div>
      </div>
      
      <div className="flex px-4 py-2 items-center justify-between">
        <div className="w-20 h-20 rounded-full border border-gray-300 p-0.5">
          <img src={displayProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="flex gap-6 text-center">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{formatNumber(displayProfile.posts)}</span>
            <span className="text-sm text-gray-600">posts</span>
          </div>
          <div className="flex flex-col cursor-pointer">
            <span className="font-semibold text-lg">{formatNumber(displayProfile.followers)}</span>
            <span className="text-sm text-gray-600">followers</span>
          </div>
          <div className="flex flex-col cursor-pointer">
            <span className="font-semibold text-lg">{formatNumber(displayProfile.following)}</span>
            <span className="text-sm text-gray-600">following</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <span className="font-semibold block text-sm">{displayProfile.name}</span>
        <span className="text-sm text-gray-600 block mb-1">{displayProfile.bio}</span>
        {displayProfile.link && (
          <a href={displayProfile.link.startsWith('http') ? displayProfile.link : `https://${displayProfile.link}`} target="_blank" rel="noreferrer" className="text-sm text-blue-900 font-semibold block mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            {displayProfile.link.replace(/^https?:\/\//, '')}
          </a>
        )}
        
        {/* Social Links */}
        {!activeUser && (
          <div className="flex flex-wrap gap-3 mb-3 mt-2">
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Facebook className="w-4 h-4 text-blue-600" /> Facebook
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Instagram className="w-4 h-4 text-pink-600" /> Instagram
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Twitter className="w-4 h-4 text-black" /> X (Twitter)
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Youtube className="w-4 h-4 text-red-600" /> YouTube
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Linkedin className="w-4 h-4 text-blue-700" /> LinkedIn
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
              <Github className="w-4 h-4 text-gray-800" /> GitHub
            </a>
          </div>
        )}
        
        <div className="flex gap-2 mt-2">
          {activeUser ? (
            <>
              <div className="flex-1">
                <ActivityFollowButton userId={activeUser.id || 0} fullWidth />
              </div>
              <button onClick={() => onMessage(activeUser)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">Message</button>
            </>
          ) : (
            <>
              <button onClick={onEdit} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">Edit Profile</button>
              <button onClick={onShare} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">Share Profile</button>
            </>
          )}
        </div>
      </div>
      
      {/* Grid */}
      <div className="flex border-t border-gray-200 mt-2">
        <div onClick={() => setProfileTab('posts')} className={`flex-1 flex justify-center py-3 cursor-pointer ${profileTab === 'posts' ? 'border-b-2 border-gray-900' : ''}`}>
          <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
            <div className="border border-gray-900"></div><div className="border border-gray-900"></div><div className="border border-gray-900"></div>
            <div className="border border-gray-900"></div><div className="border border-gray-900"></div><div className="border border-gray-900"></div>
            <div className="border border-gray-900"></div><div className="border border-gray-900"></div><div className="border border-gray-900"></div>
          </div>
        </div>
        <div onClick={() => setProfileTab('reels')} className={`flex-1 flex justify-center py-3 cursor-pointer ${profileTab === 'reels' ? 'border-b-2 border-gray-900' : ''}`}>
          <div className="w-4 h-4 border-2 border-gray-900 rounded-sm flex items-center justify-center">
            <div className="w-0 h-0 border-t-2 border-t-transparent border-l-3 border-l-gray-900 border-b-2 border-b-transparent ml-0.5"></div>
          </div>
        </div>
        <div onClick={() => setProfileTab('tagged')} className={`flex-1 flex justify-center py-3 cursor-pointer ${profileTab === 'tagged' ? 'border-b-2 border-gray-900' : ''}`}>
          <div className="w-4 h-4 border-2 border-gray-900 rounded-sm"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
          <div key={i} className="aspect-square bg-gray-200">
            <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop`} alt="post" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
