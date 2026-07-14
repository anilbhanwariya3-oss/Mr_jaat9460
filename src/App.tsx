import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare, Video, User, MoreHorizontal, Wrench, Plus, BadgeCheck, Earth, UserPlus, Music, Play, Pause, SkipBack, SkipForward, Twitter, Volume2, VolumeX, Menu, Facebook, Instagram, Youtube, Linkedin, Github, Globe } from 'lucide-react';
import { stories, posts as initialPosts, activities, mockMessages } from './data';
import ImageEditor from './ImageEditor';
import SettingsScreen from './Settings';
import SocialAccountFinder from './SocialAccountFinder';
import EditProfileModal from './EditProfileModal';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';

import AuthScreen from './AuthScreen';

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

// Sample Data: Reels list
const INITIAL_REELS = [
  {
    id: 1,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    username: 'alex_codes',
    caption: 'Building Instagram Reels Clone in 2026! 🔥 #reactnative #coding',
    likes: 1240,
    comments: ['Superb implementation!', 'Code is very clean bro.'],
    songName: 'Original Audio - alex_codes',
    trending: true,
    isLiked: false
  },
  {
    id: 2,
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    username: 'dev_universe',
    caption: 'When the code works on the first try 😂💀 #programmerlife',
    likes: 8500,
    comments: ['Is this real life?', 'Impossible! 😂'],
    songName: 'Lo-Fi Chill Beats 🎧',
    trending: false,
    isLiked: false
  }
];

// Playlist Data
const PLAYLIST = [
  {
    id: 0,
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 1,
    title: 'Starboy',
    artist: 'The Weeknd',
    artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  }
];

function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPosition(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= PLAYLIST.length) {
      nextIndex = 0;
    }
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = PLAYLIST.length - 1;
    }
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div className="flex flex-col bg-[#121212] min-h-full items-center justify-center p-8 text-white relative">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      {/* Album Artwork */}
      <div className="w-full aspect-square max-w-[300px] mb-10 rounded-lg overflow-hidden shadow-2xl">
        <img src={currentTrack.artwork} alt={currentTrack.title} className="w-full h-full object-cover" />
      </div>

      {/* Song Info */}
      <div className="w-full max-w-[300px] mb-8">
        <h2 className="text-2xl font-bold mb-1 truncate">{currentTrack.title}</h2>
        <p className="text-[#b3b3b3] text-base truncate">{currentTrack.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[300px] mb-8">
        <div className="h-1 bg-[#4f4f4f] rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-[#1DB954] rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#b3b3b3]">
          <span>{formatTime(position)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-[250px]">
        <button onClick={handlePrev} className="text-white hover:text-[#b3b3b3] transition-colors focus:outline-none">
          <SkipBack className="w-8 h-8 fill-current" />
        </button>

        <button 
          onClick={handlePlayPause} 
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform focus:outline-none"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </button>

        <button onClick={handleNext} className="text-white hover:text-[#b3b3b3] transition-colors focus:outline-none">
          <SkipForward className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}

// Initial Tweets Data (Sample Data)
const INITIAL_TWEETS = [
  {
    id: '1',
    name: 'Elon Musk',
    username: 'elonmusk',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop',
    content: 'Next stop, Mars! 🚀 Who is coming with me?',
    timestamp: '2h',
    likes: 4520,
    retweets: 890,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '2',
    name: 'React Native Dev',
    username: 'reactnative',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop',
    content: 'Writing code that runs beautifully on both iOS and Android. Modern mobile apps are pure magic. ✨ #coding',
    timestamp: '5h',
    likes: 342,
    retweets: 45,
    isLiked: false,
    isRetweeted: false
  }
];

function TwitterFeed() {
  const [tweets, setTweets] = useState(INITIAL_TWEETS);
  const [tweetText, setTweetText] = useState('');

  const handlePostTweet = () => {
    if (!tweetText.trim()) return;

    const newTweet = {
      id: Date.now().toString(),
      name: 'My Profile',
      username: 'my_handle',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop',
      content: tweetText,
      timestamp: 'Now',
      likes: 0,
      retweets: 0,
      isLiked: false,
      isRetweeted: false
    };

    setTweets([newTweet, ...tweets]);
    setTweetText('');
  };

  const handleLike = (id: string) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        return {
          ...tweet,
          likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
          isLiked: !tweet.isLiked
        };
      }
      return tweet;
    }));
  };

  const handleRetweet = (id: string) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        return {
          ...tweet,
          retweets: tweet.isRetweeted ? tweet.retweets - 1 : tweet.retweets + 1,
          isRetweeted: !tweet.isRetweeted
        };
      }
      return tweet;
    }));
  };

  return (
    <div className="flex flex-col bg-black min-h-full h-full text-white pb-16">
      {/* App Header */}
      <div className="pt-4 pb-3 border-b border-gray-800 flex items-center justify-center bg-black sticky top-0 z-10">
        <span className="text-white text-xl font-bold font-sans">𝕏 Clone</span>
      </div>

      {/* Tweets Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {tweets.map(tweet => (
          <div key={tweet.id} className="flex p-4 border-b border-gray-800">
            <img src={tweet.avatar} alt="avatar" className="w-12 h-12 rounded-full mr-3 object-cover" />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="text-white font-bold text-sm mr-1">{tweet.name}</span>
                <span className="text-gray-500 text-sm">@{tweet.username} · {tweet.timestamp}</span>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
              
              <div className="flex justify-between mt-3 max-w-[85%] text-gray-500">
                <button className="flex items-center hover:text-blue-400 focus:outline-none transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span className="text-xs">0</span>
                </button>
                <button 
                  onClick={() => handleRetweet(tweet.id)} 
                  className={`flex items-center focus:outline-none transition-colors ${tweet.isRetweeted ? 'text-green-500 hover:text-green-600' : 'hover:text-green-500'}`}
                >
                  <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                  <span className="text-xs">{tweet.retweets}</span>
                </button>
                <button 
                  onClick={() => handleLike(tweet.id)} 
                  className={`flex items-center focus:outline-none transition-colors ${tweet.isLiked ? 'text-pink-600 hover:text-pink-700' : 'hover:text-pink-600'}`}
                >
                  <Heart className={`w-4 h-4 mr-1.5 ${tweet.isLiked ? 'fill-pink-600 text-pink-600' : ''}`} />
                  <span className="text-xs">{tweet.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Compose Input Box */}
      <div className="flex items-center p-3 border-t border-gray-800 bg-black">
        <textarea
          className="flex-1 bg-transparent text-white text-sm outline-none resize-none px-2 max-h-24 no-scrollbar"
          placeholder="What's happening?"
          rows={1}
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        <button 
          onClick={handlePostTweet}
          disabled={!tweetText.trim()}
          className={`bg-blue-500 text-white font-bold text-sm py-1.5 px-4 rounded-full ml-2 transition-opacity ${!tweetText.trim() ? 'opacity-50' : 'hover:bg-blue-600'}`}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'feed' | 'new-post' | 'profile' | 'messages' | 'people' | 'music' | 'search' | 'reels' | 'activity' | 'x-feed' | 'settings'>('feed');
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [discoverPeople, setDiscoverPeople] = useState<any[]>(stories);
  const [toast, setToast] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<any>(null);
  const [activeProfileUser, setActiveProfileUser] = useState<any>(null);
  const [profileData, setProfileData] = useState({ username: 'mr_jaat9460', name: 'mr_jaat9460', bio: 'Living my best life 🚀', link: '', avatar: '/dp.png', followers: 154200, following: 2430 });
  const [profileTab, setProfileTab] = useState<'posts' | 'reels' | 'tagged' | 'saved'>('posts');

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('fixagram_users');
      if (storedUsers) {
        const parsed = JSON.parse(storedUsers);
        const mapped = parsed.map((u: any) => ({
          id: `local-${u.username}`,
          user: u.username,
          avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`,
          verified: true
        }));
        setDiscoverPeople([...mapped, ...stories]);
      }
    } catch (e) {}
  }, [isAuthenticated, showSplash]);

  const [reels, setReels] = useState(INITIAL_REELS);
  const [activeCommentsReelId, setActiveCommentsReelId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const handleLikeReel = (id: number) => {
    setReels(reels.map(reel => {
      if (reel.id === id) {
        return {
          ...reel,
          likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
          isLiked: !reel.isLiked
        };
      }
      return reel;
    }));
  };

  const handleAddCommentToReel = (reelId: number) => {
    if (!newComment.trim()) return;
    
    setReels(reels.map(reel => {
      if (reel.id === reelId) {
        return { ...reel, comments: [...reel.comments, newComment] };
      }
      return reel;
    }));
    setNewComment('');
  };

  const showToastMessage = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

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
      avatar: '/dp.png',
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
        <div className="w-full max-w-md bg-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <style>{`
            @keyframes run-tiger {
              0% { transform: translateX(-150px) translateY(0) rotate(0deg); }
              25% { transform: translateX(-75px) translateY(-10px) rotate(5deg); }
              50% { transform: translateX(0px) translateY(0) rotate(0deg); }
              75% { transform: translateX(75px) translateY(-10px) rotate(-5deg); }
              100% { transform: translateX(150px) translateY(0) rotate(0deg); }
            }
          `}</style>
          <div className="mb-4 relative flex items-center justify-center w-32 h-32 overflow-hidden">
            <div className="text-7xl" style={{ animation: 'run-tiger 1s infinite linear alternate' }}>
              🐅
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text" style={{ fontFamily: "'Playfair Display', ui-serif, serif", backgroundImage: "linear-gradient(to right, #ef4444 50%, #ec4899 50%)" }}>Fixagram</h1>
          <p className="text-gray-600 font-medium mt-2">Welcome to Fixagram</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen 
        onLogin={(data) => {
          setProfileData({ ...profileData, ...data });
          setIsAuthenticated(true);
          
          // Save to all registered users list so everyone can see
          try {
            const existingUsersStr = localStorage.getItem('fixagram_users');
            let users = [];
            if (existingUsersStr) {
              users = JSON.parse(existingUsersStr);
            }
            if (!users.find((u: any) => u.username === data.username)) {
              users.push({
                username: data.username,
                name: data.name,
                avatar: data.avatar || `/dp.png`,
                followers: 0
              });
              localStorage.setItem('fixagram_users', JSON.stringify(users));
            }
          } catch (e) {
            console.error(e);
          }
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className={`w-full max-w-md bg-white min-h-screen border-x border-gray-200 flex flex-col relative ${currentView !== 'settings' ? 'pb-16' : ''}`}>
        
        {currentView === 'new-post' && (
          <ImageEditor onCancel={() => setCurrentView('feed')} onSave={handleSaveImage} />
        )}

        {currentView !== 'new-post' && (
          <>
            {/* Top Header */}
            {currentView !== 'settings' && (
              <header className="flex justify-between items-center p-3 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2 relative">
                  <svg width="0" height="0" className="absolute">
                    <linearGradient id="halfRedPink" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop stopColor="#ef4444" offset="50%" />
                      <stop stopColor="#ec4899" offset="50%" />
                    </linearGradient>
                  </svg>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Playfair Display', ui-serif, serif" }}>Fixagram</h1>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative cursor-pointer" onClick={() => setCurrentView('activity')}>
                    <Heart className="w-6 h-6 text-gray-900" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="relative cursor-pointer" onClick={() => setCurrentView('messages')}>
                    <MessageCircle className="w-6 h-6 text-gray-900" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">1</div>
                  </div>
                </div>
              </header>
            )}

            <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
              {currentView === 'feed' && (
                <>
                  {/* Stories */}
                  <div className="flex gap-4 p-4 overflow-x-auto border-b border-gray-100 no-scrollbar">
                    {/* Add Story */}
                    <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer" onClick={() => setCurrentView('new-post')}>
                      <div className="w-16 h-16 rounded-full border border-gray-300 p-0.5 relative">
                        <img src="/dp.png" alt="mr_jaat9460" className="w-full h-full rounded-full object-cover" />
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
                    {discoverPeople.map(story => (
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
                  <div className="flex flex-col pb-16">
                    {feedPosts.map(post => (
                      <Post 
                        key={post.id} 
                        post={post} 
                        onAction={showToastMessage} 
                        onViewProfile={(user) => { setActiveProfileUser(user); setCurrentView('profile'); }}
                      />
                    ))}
                  </div>
                </>
              )}
              {currentView === 'profile' && (
                <ProfileScreen
                  profileData={profileData}
                  activeUser={activeProfileUser}
                  onEdit={() => setShowEditProfile(true)}
                  onShare={() => showToastMessage("Profile link copied!")}
                  onNewPost={() => setCurrentView('new-post')}
                  onSettings={() => setCurrentView('settings')}
                  onMessage={(user) => { setActiveChatUser(user); setCurrentView('messages'); showToastMessage(`Started chat with ${user.user}`); }}
                />
              )}
              {currentView === 'messages' && (
                activeChatUser ? (
                  <ChatScreen user={activeChatUser} onBack={() => setActiveChatUser(null)} />
                ) : (
                  <div className="flex flex-col bg-white min-h-full">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                      <span className="font-bold text-lg">Messages</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {mockMessages.map((msg) => (
                        <div key={msg.id} className="flex items-center gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setActiveChatUser(msg)}>
                          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative">
                            <img src={msg.avatar} alt={msg.user} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="font-semibold truncate">{msg.user}</span>
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{msg.time}</span>
                            </div>
                            <p className={`text-sm truncate ${msg.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                              {msg.lastMessage}
                            </p>
                          </div>
                          {msg.unread && (
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              {currentView === 'people' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Discover People</span>
                  </div>
                  <div className="flex flex-col p-4 gap-4">
                    {discoverPeople.map(person => (
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
                <div className="flex flex-col bg-black min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-800 text-white">
                    <span className="font-bold text-lg">Music</span>
                  </div>
                  <div className="flex-1">
                    <MusicPlayer />
                  </div>
                </div>
              )}

              {currentView === 'search' && (
                <div className="flex flex-col bg-white min-h-full">
                  <SocialAccountFinder 
                    onMessage={(user) => { setActiveChatUser(user); setCurrentView('messages'); showToastMessage(`Started chat with ${user.user}`); }} 
                    onViewProfile={(user) => { setActiveProfileUser(user); setCurrentView('profile'); }}
                  />
                </div>
              )}

              {currentView === 'reels' && (
                <div className="flex flex-col bg-black text-white h-full relative overflow-hidden">
                  <div className="flex-1 overflow-y-scroll snap-y snap-mandatory no-scrollbar h-full w-full">
                    {reels.map((reel) => (
                      <div key={reel.id} className="w-full h-full snap-start relative flex flex-col justify-end p-4 text-white">
                        
                        <ReelVideo reel={reel} isMuted={isMuted} />
                        
                        {/* Video Tap Overlay for Mute/Unmute */}
                        <div 
                          className="absolute inset-0 z-0" 
                          onClick={() => setIsMuted(!isMuted)}
                          onDoubleClick={(e) => {
                            e.preventDefault();
                            if (!reel.isLiked) {
                              handleLikeReel(reel.id);
                            }
                          }}
                        />

                        {/* Overlay Gradient for Text Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />
                        
                        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                          <span className="font-bold text-xl drop-shadow-md">Reels</span>
                        </div>

                        {/* Reel Details & Sidebar */}
                        <div className="z-20 flex justify-between items-end w-full pb-16 pointer-events-none">
                          {/* User Info & Caption */}
                          <div className="flex-1 pr-12 pointer-events-auto">
                            <div className="flex items-center gap-2 mb-2 cursor-pointer">
                              <div className="w-10 h-10 rounded-full border border-white overflow-hidden">
                                <img src="/dp.png" alt="user" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-semibold drop-shadow-md">{reel.username}</span>
                              <div className="scale-75 origin-left ml-2">
                                <ActivityFollowButton userId={reel.id} />
                              </div>
                            </div>
                            <p className="text-sm line-clamp-2 drop-shadow-md mb-3">{reel.caption}</p>
                            
                            {/* Music Section */}
                            <div className="flex items-center gap-2 bg-black/40 w-fit px-3 py-1.5 rounded-full">
                              <Music className="w-3.5 h-3.5 text-white" />
                              <div className="overflow-hidden w-32 relative">
                                <span className="text-xs font-semibold whitespace-nowrap inline-block animate-[marquee_5s_linear_infinite]">
                                  {reel.songName} {reel.trending ? '🔥' : ''}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Sidebar (Like & Comment buttons) */}
                          <div className="flex flex-col items-center gap-6 absolute right-4 bottom-20 pointer-events-auto">
                            {/* Like Button */}
                            <button onClick={() => handleLikeReel(reel.id)} className="flex flex-col items-center gap-1 focus:outline-none">
                              <Heart className={`w-8 h-8 drop-shadow-md ${reel.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                              <span className="text-xs font-semibold">{reel.likes}</span>
                            </button>

                            {/* Comment Toggle Button */}
                            <button onClick={() => setActiveCommentsReelId(reel.id)} className="flex flex-col items-center gap-1 focus:outline-none">
                              <MessageCircle className="w-8 h-8 text-white drop-shadow-md" />
                              <span className="text-xs font-semibold">{reel.comments.length}</span>
                            </button>
                            
                            {/* Share Toggle Button */}
                            <button onClick={() => showToastMessage("Shared to your story")} className="flex flex-col items-center gap-1 focus:outline-none">
                              <Send className="w-8 h-8 text-white drop-shadow-md" />
                              <span className="text-xs font-semibold">Share</span>
                            </button>
                            
                            {/* Volume Toggle */}
                            <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center gap-1 focus:outline-none">
                              {isMuted ? (
                                <VolumeX className="w-8 h-8 text-white drop-shadow-md" />
                              ) : (
                                <Volume2 className="w-8 h-8 text-white drop-shadow-md" />
                              )}
                            </button>

                            <button className="flex flex-col items-center gap-1 focus:outline-none">
                              <MoreHorizontal className="w-8 h-8 text-white drop-shadow-md" />
                            </button>

                            {/* Spinning Disc */}
                            <div 
                              className="mt-2 w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden relative flex items-center justify-center bg-gray-900 animate-[spin_4s_linear_infinite]"
                              style={{ animationPlayState: isMuted ? 'paused' : 'running' }}
                            >
                              <img src={reel.avatar || "/dp.png"} alt="disc" className="w-6 h-6 rounded-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                            </div>
                          </div>
                        </div>

                        {/* --- Comments Drawer Popup --- */}
                        {activeCommentsReelId === reel.id && (
                          <div className="absolute inset-x-0 bottom-0 bg-white text-gray-900 rounded-t-xl z-30 h-[50vh] flex flex-col transition-all pb-safe">
                            <div className="flex justify-between items-center p-3 border-b border-gray-100">
                              <h4 className="font-bold text-center flex-1">Comments</h4>
                              <button onClick={() => setActiveCommentsReelId(null)} className="text-gray-500 font-bold px-2">X</button>
                            </div>

                            {/* Comments List */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                              {reel.comments.map((comment, index) => (
                                <div key={index} className="flex gap-3 text-sm">
                                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                    <img src="/dp.png" alt="user" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-600">user_{Math.floor(Math.random() * 1000)}</span>
                                    <span>{comment}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Add Comment Input */}
                            <div className="p-3 border-t border-gray-100 flex gap-2 items-center bg-gray-50 mb-12">
                              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                <img src="/dp.png" alt="user" className="w-full h-full object-cover" />
                              </div>
                              <input 
                                type="text" 
                                placeholder="Add a comment..." 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-sm px-2"
                              />
                              <button 
                                onClick={() => handleAddCommentToReel(reel.id)} 
                                className="text-blue-500 font-semibold text-sm px-2"
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentView === 'activity' && (
                <div className="flex flex-col bg-white min-h-full">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">Activity</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-4 border-b border-gray-50">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-semibold mr-1">{activity.user}</span>
                            {activity.text}
                          </p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        {activity.type === 'follow' && (
                          <ActivityFollowButton userId={activity.id} />
                        )}
                        {activity.type !== 'follow' && (
                           <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=150&q=80" alt="post thumbnail" className="w-full h-full object-cover" />
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentView === 'x-feed' && (
                <TwitterFeed />
              )}
              {currentView === 'settings' && (
                <SettingsScreen onBack={() => setCurrentView('profile')} />
              )}
            </main>

            {/* Bottom Nav */}
            {currentView !== 'settings' && (
              <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center p-3 z-10 pb-safe">
                <Home className={`w-7 h-7 cursor-pointer ${currentView === 'feed' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('feed')} />
                <Search className={`w-7 h-7 cursor-pointer ${currentView === 'search' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('search')} />
                <PlusSquare className={`w-7 h-7 cursor-pointer text-gray-400`} onClick={() => setCurrentView('new-post')} />
                <Video className={`w-7 h-7 cursor-pointer ${currentView === 'reels' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('reels')} />
                <Music className={`w-7 h-7 cursor-pointer ${currentView === 'music' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('music')} />
                <Twitter className={`w-7 h-7 cursor-pointer ${currentView === 'x-feed' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => setCurrentView('x-feed')} />
                <div 
                  className={`w-7 h-7 rounded-full overflow-hidden border ${currentView === 'profile' ? 'border-gray-900' : 'border-gray-300'} cursor-pointer`}
                  onClick={() => setCurrentView('profile')}
                >
                  <img src="/dp.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </nav>
            )}
          </>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-bounce">
            {toast}
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <EditProfileModal 
            profileData={profileData} 
            onClose={() => setShowEditProfile(false)} 
            onSave={(data) => {
              setProfileData(data);
              setShowEditProfile(false);
              showToastMessage("Profile updated!");
            }} 
          />
        )}
      </div>
    </div>
  );
}

function ReelVideo({ reel, isMuted }: { reel: any, isMuted: boolean }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={reel.videoUrl}
      className="absolute inset-0 w-full h-full object-cover z-0"
      muted={isMuted}
      loop
      playsInline
    />
  );
}

export function ActivityFollowButton({ userId, fullWidth }: { userId: number, fullWidth?: boolean }) {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <button 
      onClick={() => setIsFollowing(!isFollowing)}
      className={`btn-follow ${isFollowing ? 'following' : ''} ${fullWidth ? 'w-full' : ''}`}
      onMouseEnter={(e) => {
        if (isFollowing) e.currentTarget.textContent = 'Unfollow';
      }}
      onMouseLeave={(e) => {
        if (isFollowing) e.currentTarget.textContent = 'Following';
      }}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}

function Post({ post, onAction, onViewProfile }: { post: any; key?: React.Key | number | string, onAction?: (msg: string) => void, onViewProfile?: (user: any) => void }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [doubleClickAnimate, setDoubleClickAnimate] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleDoubleClick = () => {
    setLiked(true);
    setDoubleClickAnimate(true);
    setTimeout(() => setDoubleClickAnimate(false), 1000);
  };

  return (
    <div className="border-b border-gray-100 pb-4">
      {/* Post Header */}
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewProfile && onViewProfile(post)}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px]">
            <img src={post.avatar} alt={post.user} className="w-full h-full rounded-full border border-white object-cover" />
          </div>
          <span className="font-semibold text-sm text-gray-900 flex items-center gap-1">
            {post.user}
            <VerifiedBadge type={post.verified} className="w-4 h-4 shrink-0" />
          </span>
        </div>
        <MoreHorizontal onClick={() => onAction && onAction("Edit options opened")} className="w-5 h-5 text-gray-700 cursor-pointer" />
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
          <MessageCircle onClick={() => setShowComments(!showComments)} className="w-7 h-7 text-gray-900 hover:text-gray-600 cursor-pointer" />
          <Send onClick={() => onAction && onAction("Post shared!")} className="w-7 h-7 text-gray-900 hover:text-gray-600 cursor-pointer" />
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
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 border-t border-gray-100 pt-2">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <span className="font-semibold">john_doe</span>
              <span className="text-gray-700">Great post! 🔥</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">jane_smith</span>
              <span className="text-gray-700">Love this so much.</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <img src="/dp.png" alt="Profile" className="w-6 h-6 rounded-full object-cover" />
              <input type="text" placeholder="Add a comment..." className="text-sm flex-1 bg-transparent border-none outline-none" />
              <span onClick={() => { setShowComments(false); onAction && onAction("Comment posted!"); }} className="text-blue-500 font-semibold text-sm cursor-pointer">Post</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
