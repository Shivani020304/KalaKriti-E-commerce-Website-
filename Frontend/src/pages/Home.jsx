import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplets, Shapes, Sparkles, Paintbrush, Instagram } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import CategoryCards from '../components/home/CategoryCards';
import TrustBadges from '../components/home/TrustBadges';
import FeaturedCollections from '../components/home/FeaturedCollections';
import CTABanner from '../components/home/CTABanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AboutSection from '../components/home/AboutSection';
import Testimonials from '../components/home/Testimonials';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const processSteps = [
  { icon: Droplets, title: 'Clay', desc: 'Premium air-dry clay is carefully selected and kneaded to perfection' },
  { icon: Shapes, title: 'Shape', desc: 'Each mandala pattern is hand-sculpted with precision and care' },
  { icon: Sparkles, title: 'Mirrors', desc: 'Real mirror shards are embedded to catch and reflect light beautifully' },
  { icon: Paintbrush, title: 'Paint & Dry', desc: 'Nature-inspired colors are applied and sealed for lasting beauty' },
];

const instaImages = [
  'https://i.pinimg.com/736x/ee/3c/55/ee3c5549813ebd25d5df79f2b5600ffc.jpg',
   'https://i.pinimg.com/736x/03/c4/f2/03c4f25d6e304e9e467e8613490be34a.jpg',
   'https://i.pinimg.com/736x/9a/c2/e1/9ac2e19e29ceb0366fd7b107f9b7abba.jpg',
   'https://i.pinimg.com/736x/2c/2b/99/2c2b99cbd3264ca33079fe126e107d2a.jpg',
   'https://i.pinimg.com/736x/40/8c/a8/408ca8c25abf125fa50dfc55c89b0422.jpg',
   'https://i.pinimg.com/736x/33/4c/50/334c5056659b7090c21dc5fed103c703.jpg',
];

export default function Home() {
  const [email, setEmail] = useState('');
  const handle = import.meta.env.VITE_INSTAGRAM_HANDLE || 'kalakriti';

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Welcome! Check your inbox for 10% off 🎉');
      setEmail('');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <HeroSection />
      <CategoryCards />
      <TrustBadges />
      <FeaturedCollections />
      <CTABanner />
      <FeaturedProducts />
      <AboutSection />

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-bg-main to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">The Process</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mt-2">From Earth to Art</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-primary/20" />
            {processSteps.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }} className="text-center relative">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Icon className="text-primary" size={28} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">{idx + 1}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-dark mb-2">{title}</h3>
                <p className="text-sm text-text-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Instagram Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-bold text-text-dark">Follow Us on Instagram</h2>
          </div>
          <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">@{handle}</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
          {instaImages.map((img, idx) => (
            <a key={idx} href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="relative aspect-square overflow-hidden group">
              <img src={img} alt={`Instagram post ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-3">Get 10% Off Your First Order</h2>
          <p className="text-white/80 mb-8">Subscribe to our newsletter for exclusive offers, new arrivals, and behind-the-scenes stories.</p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <Button variant="accent" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </motion.div>
  );
}
