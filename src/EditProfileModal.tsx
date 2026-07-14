import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

export default function EditProfileModal({ profileData, onClose, onSave }: { profileData: any, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({ ...profileData });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, avatar: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <button onClick={onClose} className="text-gray-900 font-semibold text-sm">Cancel</button>
          <span className="font-bold">Edit Profile</span>
          <button onClick={() => onSave(formData)} className="text-blue-500 font-bold text-sm">Done</button>
        </div>
        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="relative cursor-pointer" onClick={handleAvatarClick}>
              <div className="w-20 h-20 rounded-full border border-gray-300 p-0.5 overflow-hidden">
                <img src={formData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-white w-6 h-6 flex items-center justify-center">
                <Camera className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-blue-500 text-sm font-semibold cursor-pointer" onClick={handleAvatarClick}>Edit picture</span>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Username</label>
            <input 
              type="text" 
              name="username"
              value={formData.username} 
              onChange={handleChange}
              className="border-b border-gray-300 py-1 focus:outline-none focus:border-gray-900" 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleChange}
              className="border-b border-gray-300 py-1 focus:outline-none focus:border-gray-900" 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Bio</label>
            <textarea 
              name="bio"
              value={formData.bio} 
              onChange={handleChange}
              rows={2}
              className="border-b border-gray-300 py-1 focus:outline-none focus:border-gray-900 resize-none" 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Links</label>
            <input 
              type="text" 
              name="link"
              placeholder="Add a link (e.g. google.com)"
              value={formData.link} 
              onChange={handleChange}
              className="border-b border-gray-300 py-1 focus:outline-none focus:border-gray-900" 
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Followers</label>
            <input 
              type="number" 
              name="followers"
              value={formData.followers || 0} 
              onChange={handleChange}
              className="border-b border-gray-300 py-1 focus:outline-none focus:border-gray-900" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-semibold">Following</label>
            <input 
              type="number" 
              name="following"
              value={formData.following || 0} 
              onChange={handleChange}
              className="border-b border-gray-300 py-1 focus:outline-none focus:border-gray-900" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
