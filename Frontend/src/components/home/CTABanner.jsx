import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-12 sm:py-16" style={{ background: '#FBF7F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F5EDE3 0%, #FBF7F2 50%, #F0E6D8 100%)' }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
            {/* Left: Decorative Image */}
            <div className="hidden lg:block w-[200px] flex-shrink-0 pl-6">
              <img
                src="/images/cta-banner.png"
                alt="Lippan Art decoration"
                className="w-full h-[180px] object-cover rounded-2xl"
              />
            </div>

            {/* Center: Text Content */}
            <div className="flex-1 text-center py-10 sm:py-14 px-6 sm:px-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C8956C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#C8956C]/40" />
                <div className="h-px w-8 bg-[#C8956C]/40" />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark mb-2">
                Transform Your Space{' '}
                <span className="italic" style={{ color: '#C8956C', fontWeight: 400 }}>Today</span>
              </h2>
              <p className="text-text-muted text-sm sm:text-base max-w-md mx-auto mb-6">
                Discover Handcrafted Art That Inspires Beauty & Tradition
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-text-dark bg-white border-2 border-text-dark/80 hover:bg-text-dark hover:text-white transition-all duration-300"
              >
                Explore Now
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: Decorative line */}
            <div className="hidden lg:flex items-center pr-10">
              <div className="h-px w-16 bg-[#C8956C]/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
