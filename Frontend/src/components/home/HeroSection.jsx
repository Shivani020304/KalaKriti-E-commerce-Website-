import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[105vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #FBF7F2 0%, #F5EDE3 40%, #FAF6F0 100%)' }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[5%] w-64 h-64 rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #C8956C, transparent 70%)' }} />
        <div className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #2D6A4F, transparent 70%)' }} />
        {/* Subtle pattern dots */}
        <div className="absolute top-32 right-[35%] w-2 h-2 rounded-full bg-[#C8956C]/20" />
        <div className="absolute top-48 right-[40%] w-1.5 h-1.5 rounded-full bg-[#C8956C]/15" />
        <div className="absolute bottom-40 left-[30%] w-2 h-2 rounded-full bg-[#2D6A4F]/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-2"
              style={{ color: '#1C2B1E' }}
            >
              Adorn Your Home
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl italic mb-4"
              style={{ color: '#C8956C', fontWeight: 400 }}
            >
              with Timeless Lippan Art
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#C8956C' }} />
              <p className="text-base sm:text-lg" style={{ color: '#6B7C6E' }}>
                Handcrafted Clay & Mirror Art for Modern Living
              </p>
            </motion.div>

            {/* Explore Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: '#C8956C' }}
              >
                Explore
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero-lippan.png"
                alt="Beautiful Lippan Art displayed in an elegant living room"
                className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover object-bottom"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-white rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#2D6A4F' }}>
                  ✨
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-dark">Handmade in India</p>
                  <p className="text-[10px] text-text-muted">500+ Happy Customers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
