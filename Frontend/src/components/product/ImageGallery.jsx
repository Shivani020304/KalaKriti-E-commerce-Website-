import { useState } from 'react';

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-card overflow-hidden bg-gray-100 group cursor-zoom-in">
        <img
          src={images[selectedIndex]}
          alt="Product image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150"
        />
      </div>
      <div className="flex gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              idx === selectedIndex ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
