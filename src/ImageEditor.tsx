import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ArrowLeft, Check, Crop as CropIcon, Maximize, Upload } from 'lucide-react';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function ImageEditor({ onCancel, onSave }: { onCancel: () => void, onSave: (dataUrl: string) => void }) {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [tab, setTab] = useState<'crop' | 'resize'>('crop');
  
  const [resizeWidth, setResizeWidth] = useState<number>(0);
  const [resizeHeight, setResizeHeight] = useState<number>(0);
  const [maintainAspect, setMaintainAspect] = useState(true);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCrop(undefined); // Makes crop preview update between images.
      
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 24 24" fill="#f87171" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h4"/><path d="M3 16.5h4"/><path d="M11 9h6"/><path d="M11 15h6"/></svg>`;
        setImgSrc(`data:image/svg+xml;base64,${btoa(svg)}`);
        return;
      }
      
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(file)
    }
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      setCrop({
        unit: '%',
        width: 90,
        height: 90,
        x: 5,
        y: 5
      });
    }
    setResizeWidth(width);
    setResizeHeight(height);
  }

  const handleResizeWidthChange = (val: number) => {
    setResizeWidth(val);
    if (maintainAspect && imgRef.current) {
      const ratio = imgRef.current.height / imgRef.current.width;
      setResizeHeight(Math.round(val * ratio));
    }
  }

  const handleResizeHeightChange = (val: number) => {
    setResizeHeight(val);
    if (maintainAspect && imgRef.current) {
      const ratio = imgRef.current.width / imgRef.current.height;
      setResizeWidth(Math.round(val * ratio));
    }
  }

  const handleSave = () => {
    if (!imgRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Default to the original image dimensions if no crop is set
    const image = imgRef.current;
    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = image.naturalWidth;
    let sourceHeight = image.naturalHeight;
    
    if (completedCrop && completedCrop.width > 0 && completedCrop.height > 0) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      sourceX = completedCrop.x * scaleX;
      sourceY = completedCrop.y * scaleY;
      sourceWidth = completedCrop.width * scaleX;
      sourceHeight = completedCrop.height * scaleY;
    }
    
    if (tab === 'resize') {
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
    } else {
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
    }
    
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    onSave(canvas.toDataURL('image/jpeg', 0.9));
  }

  if (!imgSrc) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6">
        <label className="w-full max-w-sm flex flex-col items-center justify-center px-4 py-12 bg-white text-red-500 rounded-lg shadow-sm tracking-wide uppercase border border-pink-200 cursor-pointer hover:bg-red-50 hover:text-pink-500 transition-colors">
          <Upload className="w-10 h-10 mb-3" />
          <span className="text-base leading-normal font-semibold">Select a photo or file</span>
          <input type='file' className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={onSelectFile} />
        </label>
        <button onClick={onCancel} className="mt-6 text-gray-500 font-medium">Cancel</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white z-20 absolute inset-0">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
        <ArrowLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={onCancel} />
        <h1 className="text-lg font-semibold text-gray-900">Edit Photo</h1>
        <Check className="w-6 h-6 text-pink-500 cursor-pointer" onClick={handleSave} />
      </header>

      {/* Editor Area */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center overflow-hidden">
        {tab === 'crop' ? (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="max-h-full max-w-full"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              className="max-h-[60vh] object-contain"
              onLoad={onImageLoad}
            />
          </ReactCrop>
        ) : (
          <img
            ref={imgRef}
            alt="Original"
            src={imgSrc}
            className="max-h-[60vh] object-contain"
          />
        )}
      </div>

      {/* Controls */}
      <div className="bg-white border-t border-gray-200">
        <div className="flex justify-around p-3 border-b border-gray-100">
          <button 
            onClick={() => setTab('crop')}
            className={`flex flex-col items-center p-2 rounded-lg ${tab === 'crop' ? 'text-pink-500' : 'text-gray-500'}`}
          >
            <CropIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Crop</span>
          </button>
          <button 
            onClick={() => setTab('resize')}
            className={`flex flex-col items-center p-2 rounded-lg ${tab === 'resize' ? 'text-pink-500' : 'text-gray-500'}`}
          >
            <Maximize className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Resize</span>
          </button>
        </div>

        <div className="p-4 h-32 overflow-y-auto">
          {tab === 'crop' && (
            <div className="flex gap-3 justify-center">
              <button onClick={() => setAspect(1)} className={`px-4 py-2 rounded border ${aspect === 1 ? 'bg-red-50 border-red-200 text-pink-600' : 'border-gray-300'}`}>1:1</button>
              <button onClick={() => setAspect(4/5)} className={`px-4 py-2 rounded border ${aspect === 4/5 ? 'bg-red-50 border-red-200 text-pink-600' : 'border-gray-300'}`}>4:5</button>
              <button onClick={() => setAspect(16/9)} className={`px-4 py-2 rounded border ${aspect === 16/9 ? 'bg-red-50 border-red-200 text-pink-600' : 'border-gray-300'}`}>16:9</button>
              <button onClick={() => setAspect(undefined)} className={`px-4 py-2 rounded border ${!aspect ? 'bg-red-50 border-red-200 text-pink-600' : 'border-gray-300'}`}>Free</button>
            </div>
          )}

          {tab === 'resize' && (
            <div className="space-y-4 max-w-xs mx-auto">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Width (px)</label>
                  <input 
                    type="number" 
                    value={resizeWidth || ''} 
                    onChange={e => handleResizeWidthChange(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Height (px)</label>
                  <input 
                    type="number" 
                    value={resizeHeight || ''} 
                    onChange={e => handleResizeHeightChange(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={maintainAspect} 
                  onChange={e => setMaintainAspect(e.target.checked)}
                  className="rounded text-pink-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Maintain aspect ratio</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
