export const stories = [
  { id: 1, user: 'woodworker_dan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', verified: 'popular' },
  { id: 2, user: 'sarah_fixes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', verified: 'singer' },
  { id: 3, user: 'auto_mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', verified: 'celebrity' },
  { id: 4, user: 'diy_jenny', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', verified: 'politician' },
  { id: 5, user: 'maker_tom', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', verified: 'popular' },
  { id: 6, user: 'weld_it', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop', verified: 'singer' },
];

export const activities = [
  { id: 1, type: 'like', user: 'woodworker_dan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', text: 'liked your post.', time: '2h' },
  { id: 2, type: 'comment', user: 'sarah_fixes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', text: 'commented: "Great job on this!"', time: '5h' },
  { id: 3, type: 'follow', user: 'auto_mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', text: 'started following you.', time: '1d' },
];

export const mockMessages = [
  { id: 1, user: 'woodworker_dan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', lastMessage: 'Check out my new workbench.', time: '10m', unread: true },
  { id: 2, user: 'sarah_fixes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', lastMessage: 'Are we still on for the collab?', time: '2h', unread: false },
  { id: 3, user: 'diy_jenny', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', lastMessage: 'Thanks for the tips!', time: '1d', unread: false },
];

export const posts = [

  {
    id: 1,
    user: 'sarah_fixes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
    likes: 342,
    caption: 'Finally got this vintage engine purring again! Nothing a little elbow grease and WD-40 cant fix. 🔧🚙 #restoration #mechanic',
    time: '2 HOURS AGO',
    verified: 'singer'
  },
  {
    id: 2,
    user: 'woodworker_dan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    likes: 892,
    caption: 'My grandfather’s old hand plane, restored to its former glory. Ready for the next project! 🪚🪵 #woodworking #handtools',
    time: '5 HOURS AGO',
    verified: 'popular'
  },
  {
    id: 3,
    user: 'diy_jenny',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1597721334887-b5006b5398cb?auto=format&fit=crop&w=800&q=80',
    likes: 156,
    caption: 'Micro-soldering my way out of having to buy a new laptop. Take that, planned obsolescence! 💻⚡️ #electronics #righttorepair',
    time: '1 DAY AGO',
    verified: 'politician'
  },
  {
    id: 4,
    user: 'weld_it',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    likes: 420,
    caption: 'Laying some dimes on this custom exhaust fab. 🔥👨‍🏭 #welding #fabrication #custom',
    time: '2 DAYS AGO',
    verified: 'singer'
  }
];
