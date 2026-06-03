import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="aspect-[4/5] rounded-card overflow-hidden shadow-card">
              <img src="https://i.pinimg.com/736x/0b/0d/c5/0b0dc5e92f4d62644e9675e2f3fe7ef7.jpg" alt="The artist at work" className="w-full h-full object-cover" />
            </div>
            {/* <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-card flex items-center justify-center">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary font-heading">5+</span>
                <span className="text-xs text-text-muted">Years of Craft</span>
              </div>
            </div> */}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">The Artist</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">
              Where Clay Meets <span className="text-accent">Creativity</span>
            </h2>
            <p className="text-text-muted leading-relaxed">
              Born from a passion for traditional Indian art forms, Lippen Art is a unique craft that blends the earthy warmth of clay with the sparkle of mirrors. Every mandala pattern is carefully sculpted by hand, inspired by nature&apos;s own geometry.
            </p>
            <p className="text-text-muted leading-relaxed">
              As a self-taught Indian artist, I pour my heart into each piece — from selecting the finest air-dry clay to placing each mirror shard precisely. No two pieces are ever the same, making each one a truly unique addition to your home.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {['100% Handmade', 'Eco-Friendly Clay', 'Real Mirrors', 'Made in India'].map((item) => (
                <span key={item} className="px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-full">
                  🍃 {item}
                </span>
              ))}
            </div>
            <Link to="/about">
              <Button variant="secondary" className="mt-4">About Me</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
