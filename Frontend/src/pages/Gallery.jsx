import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ZoomIn } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';

// Deterministic height assignment for consistent layout
function getHeightClass(productIdx, imageIdx) {
  const patterns = [
    'pin-tall',      // ~380px
    'pin-medium',    // ~300px
    'pin-short',     // ~240px
    'pin-tall',
    'pin-medium',
    'pin-extra-tall', // ~440px
    'pin-short',
    'pin-medium',
    'pin-tall',
    'pin-short',
    'pin-medium',
    'pin-extra-tall',
  ];
  const idx = (productIdx * 3 + imageIdx) % patterns.length;
  return patterns[idx];
}

const processImages = [
  { src: 'https://i.pinimg.com/736x/b9/d6/19/b9d6191ba39a8e57e20b4280bc3c5dfc.jpg', caption: 'Kneading the Clay' },
  { src: 'https://i.pinimg.com/736x/4a/b6/49/4ab6498307afd99115d35919d3454470.jpg', caption: 'Shaping the clay' },
  { src: 'https://i.pinimg.com/736x/db/46/bf/db46bf81058d13494f4519e0dfacca05.jpg', caption: 'Drying Process' },
  { src: 'https://i.pinimg.com/736x/fb/3b/1c/fb3b1c8311d6beb864d6d40b0ed32541.jpg', caption: 'Painting Details' },
  { src: 'https://i.pinimg.com/736x/be/19/d0/be19d009b31057d9d465eaac74ff196b.jpg', caption: 'Embedding Mirrors' },
  { src: 'https://i.pinimg.com/736x/e6/ab/95/e6ab95feb44913c0d9eef3c80094e9ef.jpg', caption: 'Final Touches' },
];

const filterTabs = ['All', ...categories];

export default function Gallery() {
  const { products } = useProducts();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const allImages = useMemo(() => {
    return products.flatMap((p, pIdx) =>
      (p.images || []).map((img, imgIdx) => ({
        src: img,
        category: p.category,
        name: p.name,
        price: p.price,
        heightClass: getHeightClass(pIdx, imgIdx),
      }))
    );
  }, [products]);

  const filtered = useMemo(() =>
    activeFilter === 'All' ? allImages : allImages.filter((img) => img.category === activeFilter),
    [activeFilter, allImages]
  );

  const openLightbox = useCallback((idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="bg-[#FBF7F2] pt-8 pb-10">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-2">Art Gallery</h1>
          <p className="text-text-muted mt-1 text-sm">A visual journey through our handcrafted creations</p>
          <nav className="flex items-center justify-center gap-2 text-sm text-text-muted mt-3">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <span className="text-text-dark font-medium">Gallery</span>
          </nav>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-muted border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="pin-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                key={`${img.src}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.5) }}
                className={`pin-item ${img.heightClass}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image Card */}
                <div
                  className="pin-card group cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover:translate-y-0">
                    <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-text-dark hover:bg-error hover:text-white transition-colors shadow-sm">
                      <Heart size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-text-dark hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <ZoomIn size={14} />
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <p className="text-white text-sm font-semibold leading-tight drop-shadow-md line-clamp-1">{img.name}</p>
                    <p className="text-white/70 text-[11px] mt-0.5 uppercase tracking-wider drop-shadow-sm">
                      {img.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Image count */}
        <div className="text-center mt-8 mb-16">
          <p className="text-sm text-text-muted">
            Showing <span className="font-semibold text-text-dark">{filtered.length}</span> images
          </p>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={filtered.map((img) => ({ src: img.src }))}
        />

        {/* Behind the Scenes */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">The Process</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-dark mt-2">Behind the Scenes</h2>
            <p className="text-text-muted text-sm mt-2">The making process of our art pieces</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {processImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold">{img.caption}</p>
                  <div className="w-6 h-0.5 bg-accent mt-1.5 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
