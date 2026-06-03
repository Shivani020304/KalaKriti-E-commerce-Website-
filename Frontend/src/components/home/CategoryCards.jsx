import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categoryData = [
  {
    title: 'Art Plates',
    subtitle: 'Mandala & Decorative Plates',
    image: '/images/cat-plates.png',
    link: '/shop?category=Lippen Art Plates',
    tall: true,
  },
  {
    title: 'Wall Hangings',
    subtitle: 'Stunning Wall Art Pieces',
    image: '/images/cat-wall-hangings.png',
    link: '/shop?category=Wall Hanging Lippen Art',
    tall: false,
  },
  {
    title: 'Door Décor',
    subtitle: 'Torans & Hangings',
    image: '/images/cat-door-decor.png',
    link: '/shop?category=Door Torans',
    tall: false,
  },
  {
    title: 'Accessories',
    subtitle: 'Keychains & Gifts',
    image: '/images/cat-accessories.png',
    link: '/shop?category=Keychains',
    tall: true,
  },
];

export default function CategoryCards() {
  return (
    <section className="py-16 sm:py-20" style={{ background: '#FBF7F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-[#C8956C]/40" />
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">
              Shop by Category
            </h2>
            <div className="h-px w-12 bg-[#C8956C]/40" />
          </div>
        </motion.div>

        {/* Category Grid - 4 columns with alternating heights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoryData.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={cat.link}
                className={`group relative block rounded-2xl overflow-hidden ${
                  cat.tall ? 'h-[320px] sm:h-[380px] lg:h-[420px]' : 'h-[280px] sm:h-[320px] lg:h-[360px]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    {cat.subtitle}
                  </p>

                  {/* Arrow Button */}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#C8956C] group-hover:border-[#C8956C]">
                    <ArrowRight size={18} className="text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
