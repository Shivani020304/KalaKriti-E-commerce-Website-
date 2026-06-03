import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: 'Festive Specials',
    image: '/images/col-festive.png',
    link: '/shop',
  },
  {
    title: 'Nature Inspired',
    image: '/images/col-nature.png',
    link: '/shop',
  },
  {
    title: 'Royal Heritage',
    image: '/images/col-royal.png',
    link: '/shop',
  },
  {
    title: 'Minimalist Art',
    image: '/images/col-minimal.png',
    link: '/shop',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 sm:py-20" style={{ background: '#FBF7F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">
              Featured Collections
            </h2>
            <div className="hidden sm:block h-px w-16 bg-[#C8956C]/40 mt-2" />
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
            style={{ backgroundColor: '#C8956C' }}
          >
            View All
          </Link>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {collections.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={col.link}
                className="group block relative rounded-2xl overflow-hidden h-[220px] sm:h-[260px] lg:h-[280px]"
              >
                {/* Background Image */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 group-hover:from-black/70" />

                {/* Label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center transition-all duration-300 group-hover:bg-white">
                    <h3 className="font-heading text-sm sm:text-base font-semibold text-text-dark">
                      {col.title}
                    </h3>
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
