import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare, Video, User, MoreHorizontal, Wrench, Plus, BadgeCheck, Earth, UserPlus, Music } from 'lucide-react';
import { GiBat } from 'react-icons/gi';
import { FaEarthAmericas } from 'react-icons/fa6';
import { stories, posts as initialPosts } from './data';
import ImageEditor from './ImageEditor';

function VerifiedBadge({ type, className = '' }: { type?: boolean | string, className?: string }) {
  if (!type) return null;
  if (type === 'popular') {
    return <BadgeCheck className={`${className} text-yellow-400 fill-yellow-400`} stroke="white" />;
  }
  if (type === 'singer') {
    return <BadgeCheck className={`${className} text-orange-500 fill-orange-500`} stroke="white" />;
  }
  if (type === 'celebrity') {
    return <BadgeCheck className={`${className} text-green-500 fill-green-500`} stroke="white" />;
  }
  if (type === 'politician') {
    return <BadgeCheck className={`${className} text-yellow-500 fill-yellow-500`} stroke="white" />;
  }
  return <BadgeCheck className={`${className} text-gray-400 fill-gray-400`} stroke="white" />;
}

export const formatNumber = (num: number) => {
  if (num >= 100000) {
    const val = num / 100000;
    return (Number.isInteger(val) ? val : val.toFixed(1)) + ' L';
  }
  if (num >= 1000) {
    const val = num / 1000;
    return (Number.isInteger(val) ? val : val.toFixed(1)) + ' h';
  }
  return num.toString();
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'feed' | 'new-post' | 'profile' | 'messages' | 'people' | 'music' | 'search' | 'reels' | 'activity'>('feed');
  const [feedPosts, setFeedPosts] = useState(initialPosts);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveImage = (dataUrl: string) => {
    const newPost = {
      id: Date.now(),
      user: 'mr_jaat9460',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      image: dataUrl,
      likes: 0,
      caption: ' Just finished editing this! 🛠️',
      time: 'JUST NOW'
    };
    
    setFeedPosts([newPost, ...feedPosts]);
    setCurrentView('feed');
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen flex flex-col items-center justify-center relative">
          <svg width="0" height="0" className="absolute">
            <linearGradient id="splashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop stopColor="#ef4444" offset="50%" />
              <stop stopColor="#ec4899" offset="50%" />
            </linearGradient>
          </svg>
          <div className="mb-4 relative rounded-full bg-blue-500 flex items-center justify-center w-24 h-24 shadow-lg overflow-hidden animate-spin" style={{ animationDuration: '4s' }}>
            <FaEarthAmericas className="w-28 h-28 text-green-400 absolute" style={{ top: '-10%', left: '-10%' }} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text" style={{ fontFamily: "'Playfair Display', ui-serif, serif", backgroundImage: "linear-gradient(to right, #ef4444 50%, #ec4899 50%)" }}>Fixagram</h1>
          <p className="text-gray-600 font-medium mt-2">Welcome to Fixagram</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen border-x border-gray-200 flex flex-col relative pb-16">
        
        {currentView === 'new-post' && (
          <ImageEditor onCancel={() => setCurrentView('feed')} onSave={handleSaveImage} />
        )}

        {currentView !== 'new-post' && (
          <>
            {/* Top Nav */}
            <nav className="flex justify-around items-center p-3 border-b border-gray-100 bg-white sticky top-0 z-10">
              <Home className={`w-7 h-7 cursor-pointer ${currentView === 'feed' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('feed')} />
              <Search className={`w-7 h-7 cursor-pointer ${currentView === 'search' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('search')} />
              <button onClick={() => setCurrentView('messages')} className="focus:outline-none">
                <MessageCircle className={`w-7 h-7 cursor-pointer ${currentView === 'messages' ? 'text-gray-900' : 'text-gray-400'}`} />
              </button>
              <button onClick={() => setCurrentView('people')} className="focus:outline-none">
                <UserPlus className={`w-7 h-7 cursor-pointer ${currentView === 'people' ? 'text-gray-900' : 'text-gray-400'}`} />
              </button>
              <Video className={`w-7 h-7 cursor-pointer ${currentView === 'reels' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('reels')} />
              <div 
                className={`w-7 h-7 rounded-full overflow-hidden border ${currentView === 'profile' ? 'border-gray-900' : 'border-gray-300'} cursor-pointer`}
                onClick={() => setCurrentView('profile')}
              >
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </nav>

            <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
              {currentView === 'feed' && (
                <>
                  {/* Stories */}
                  <div className="flex gap-4 p-4 overflow-x-auto border-b border-gray-100 no-scrollbar">
                    {/* Add Story */}
                    <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer" onClick={() => setCurrentView('new-post')}>
                      <div className="w-16 h-16 rounded-full border border-gray-300 p-0.5 relative">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="mr_jaat9460" className="w-full h-full rounded-full object-cover" />
                        <div className="absolute bottom-0 right-0 bg-pink-500 rounded-full border-2 border-white w-5 h-5 flex items-center justify-center">
                          <Plus className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center mt-1 w-16">
                        <span className="text-xs text-gray-800 truncate text-center w-full">mr_jaat9460</span>
                        <span className="text-[10px] text-gray-500">2 days</span>
                      </div>
                    </div>
                    {/* Other Stories */}
                    {stories.map(story => (
                      <div key={story.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[2px]">
                          <div className="bg-white p-0.5 rounded-full w-full h-full">
                            <img src={story.avatar} alt={story.user} className="w-full h-full rounded-full object-cover" />
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-1 w-16">
                          <span className="text-xs text-gray-800 flex items-center justify-center gap-0.5 w-full">
                            <span className="truncate">{story.user}</span>
                            <VerifiedBadge type={story.verified} className="w-3 h-3 shrink-0" />
                          </span>
                          <span className="text-[10px] text-gray-500">2 days</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feed */}
                  <div className="flex flex-col">
                    {feedPosts.map(post => (
                      <Post key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}

              {currentView === 'profile' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4">
                    <span className="font-bold text-lg flex items-center gap-1">mr_jaat9460</span>
                    <div className="flex gap-4">
                      <PlusSquare className="w-6 h-6 text-gray-900 cursor-pointer" onClick={() => setCurrentView('new-post')} />
                      <MoreHorizontal className="w-6 h-6 text-gray-900 cursor-pointer" />
                    </div>
                  </div>
                  
                  <div className="flex px-4 py-2 items-center justify-between">
                    <div className="w-20 h-20 rounded-full border border-gray-300 p-0.5">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex gap-6 text-center">
                      <div className="flex flex-col">
                        <span className="font-semibold text-lg">14</span>
                        <span className="text-sm text-gray-600">posts</span>
                      </div>
                      <div className="flex flex-col cursor-pointer">
                        <span className="font-semibold text-lg">{formatNumber(154200)}</span>
                        <span className="text-sm text-gray-600">followers</span>
                      </div>
                      <div className="flex flex-col cursor-pointer">
                        <span className="font-semibold text-lg">{formatNumber(2430)}</span>
                        <span className="text-sm text-gray-600">following</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2">
                    <span className="font-semibold block text-sm">mr_jaat9460</span>
                    <span className="text-sm text-gray-600 block mb-3">Living my best life 🚀</span>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">Edit Profile</button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">Share Profile</button>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="flex border-t border-gray-200 mt-2">
                    <div className="flex-1 flex justify-center py-3 border-b-2 border-gray-900">
                      <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                        {[...Array(9)].map((_, i) => <div key={i} className="bg-gray-900" />)}
                      </div>
                    </div>
                    <div className="flex-1 flex justify-center py-3">
                      <Video className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 flex justify-center py-3">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-0.5">
                    {feedPosts.slice(0, 6).map(post => (
                      <div key={post.id} className="aspect-square bg-gray-200">
                        <img src={post.image} alt="post" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentView === 'messages' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Messages</span>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center text-gray-500 h-[60vh]">
                    <div className="flex flex-col items-center gap-2">
                      <MessageCircle className="w-12 h-12 text-gray-300" />
                      <span>No messages yet</span>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'people' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Discover People</span>
                  </div>
                  <div className="flex flex-col p-4 gap-4">
                    {stories.map(person => (
                      <div key={person.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={person.avatar} alt={person.user} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm flex items-center gap-1">
                              {person.user}
                              <VerifiedBadge type={person.verified} className="w-3 h-3" />
                            </span>
                            <span className="text-xs text-gray-500">Suggested for you</span>
                          </div>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">
                          Follow
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentView === 'music' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Music</span>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center text-gray-500 h-[60vh]">
                    <div className="flex flex-col items-center gap-2">
                      <Music className="w-12 h-12 text-gray-300" />
                      <span>Discover new songs here</span>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'search' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Search</span>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center text-gray-500 h-[60vh]">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 text-gray-300" />
                      <span>Search for friends, videos, and more</span>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'reels' && (
                <div className="flex flex-col bg-white min-h-full bg-black text-white">
                  <div className="flex-1 p-4 flex items-center justify-center text-gray-400 h-[60vh]">
                    <div className="flex flex-col items-center gap-2">
                      <Video className="w-12 h-12 text-gray-500" />
                      <span>Watch Reels</span>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'activity' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Activity</span>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center text-gray-500 h-[60vh]">
                    <div className="flex flex-col items-center gap-2">
                      <Heart className="w-12 h-12 text-gray-300" />
                      <span>No new activity</span>
                    </div>
                  </div>
                </div>
              )}
            </main>

            {/* Bottom Header */}
            <header className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-between items-center p-4 z-10 pb-safe">
              <div className="flex items-center gap-2 relative">
                <svg width="0" height="0" className="absolute">
                  <linearGradient id="halfRedPink" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop stopColor="#ef4444" offset="50%" />
                    <stop stopColor="#ec4899" offset="50%" />
                  </linearGradient>
                </svg>
                <GiBat className="w-6 h-6" style={{ fill: 'url(#halfRedPink)' }} />
                <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text" style={{ fontFamily: "'Playfair Display', ui-serif, serif", backgroundImage: "linear-gradient(to right, #ef4444 50%, #ec4899 50%)" }}>Fixagram</h1>
              </div>
              <div className="flex gap-4">
                <Music className="w-6 h-6 text-gray-800 cursor-pointer" onClick={() => setCurrentView('music')} />
                <Heart className="w-6 h-6 text-gray-800 cursor-pointer" onClick={() => setCurrentView('activity')} />
                <PlusSquare className="w-6 h-6 text-gray-800 cursor-pointer" onClick={() => setCurrentView('new-post')} />
              </div>
            </header>
          </>
        )}
      </div>
    </div>
  );
}

function Post({ post }: { post: any; key?: React.Key | number | string }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [doubleClickAnimate, setDoubleClickAnimate] = useState(false);

  const handleDoubleClick = () => {
    setLiked(true);
    setDoubleClickAnimate(true);
    setTimeout(() => setDoubleClickAnimate(false), 1000);
  };

  return (
    <div className="border-b border-gray-100 pb-4">
      {/* Post Header */}
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px]">
            <img src={post.avatar} alt={post.user} className="w-full h-full rounded-full border border-white object-cover" />
          </div>
          <span className="font-semibold text-sm text-gray-900 flex items-center gap-1">
            {post.user}
            <VerifiedBadge type={post.verified} className="w-4 h-4 shrink-0" />
          </span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-700 cursor-pointer" />
      </div>

      {/* Post Image */}
      <div 
        className="w-full aspect-square bg-gray-100 relative flex items-center justify-center cursor-pointer"
        onDoubleClick={handleDoubleClick}
      >
        <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
        
        {/* Heart Animation on Double Click */}
        {doubleClickAnimate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-bounce">
            <Heart className="w-24 h-24 fill-white text-white drop-shadow-xl" />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3 pb-2">
        <div className="flex gap-4">
          <button onClick={() => setLiked(!liked)} className="transition-transform active:scale-125 focus:outline-none">
            <Heart className={`w-7 h-7 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
          </button>
          <MessageCircle className="w-7 h-7 text-gray-900 hover:text-gray-600 cursor-pointer" />
          <Send className="w-7 h-7 text-gray-900 hover:text-gray-600 cursor-pointer" />
        </div>
        <button onClick={() => setSaved(!saved)} className="focus:outline-none">
          <Bookmark className={`w-7 h-7 ${saved ? 'fill-gray-900 text-gray-900' : 'text-gray-900'}`} />
        </button>
      </div>

      {/* Likes & Caption */}
      <div className="px-3">
        <p className="font-semibold text-sm text-gray-900 mb-1 cursor-pointer">{formatNumber(post.likes + (liked ? 1 : 0))} likes</p>
        <p className="text-sm text-gray-900">
          <span className="font-semibold mr-1 inline-flex items-center gap-1 cursor-pointer align-bottom">
            {post.user}
            <VerifiedBadge type={post.verified} className="w-3.5 h-3.5 shrink-0" />
          </span>
          {' '}{post.caption}
        </p>
        <p className="text-xs text-gray-500 mt-2 cursor-pointer">{post.time}</p>
      </div>
    </div>
  );
}
