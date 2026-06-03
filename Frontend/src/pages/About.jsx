import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Recycle, Fingerprint, Palette, Gem, Paintbrush } from 'lucide-react';
import Button from '../components/ui/Button';

const values = [
  { icon: Fingerprint, title: 'Every Piece is Unique', desc: 'No two art pieces are identical — each one carries its own character and story.' },
  { icon: Heart, title: '100% Handmade', desc: 'Every piece is handcrafted with love, patience, and attention to detail.' },
  { icon: Recycle, title: 'Eco-Conscious', desc: 'We use air-dry clay and sustainable materials that are gentle on the planet.' },
  { icon: Gem, title: 'Real Mirrors', desc: 'Genuine mirror shards are embedded to create mesmerizing light reflections.' },
];

const skills = [
  { icon: '🏺', label: 'Clay Sculpting' },
  { icon: '🪞', label: 'Mirror Work' },
  { icon: '🎨', label: 'Acrylic Painting' },
  { icon: '✨', label: 'Gold Leafing' },
  { icon: '🧵', label: 'Bead Work' },
  { icon: '🌿', label: 'Nature Motifs' },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Story</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mt-2 mb-6">The Art of Clay, Mirrors & Soul</h1>
            <p className="text-text-muted leading-relaxed mb-4">
              KalaKriti was born from a deep love for traditional Indian art and the beauty of nature. What started as a creative hobby during quiet evenings has blossomed into a passion-driven art studio crafting unique pieces for homes across India.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              As a self-taught Indian artist, I discovered the mesmerizing art of Lippen — a traditional Rajasthani craft of embedding mirrors into clay. I reimagined this ancient technique with contemporary mandala designs, nature-inspired patterns, and a fresh color palette that speaks to modern aesthetics.
            </p>
            <p className="text-text-muted leading-relaxed">
              Every piece that leaves my studio carries a piece of my heart. From carefully kneading the clay to placing each mirror shard with precision — it&apos;s a meditative process that brings me immense joy, and I hope that joy reflects in every art piece you bring home.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-card overflow-hidden shadow-card aspect-[3/4]">
                <img src="https://i.pinimg.com/736x/b4/53/49/b45349afe540b300de8c279820dd7e6d.jpg" alt="Artist at work" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-card overflow-hidden shadow-card aspect-square">
                <img src="https://i.pinimg.com/736x/dd/65/0e/dd650efd2e83f767b6410f9994fc8cf2.jpg" alt="Clay art" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-card overflow-hidden shadow-card aspect-square">
                <img src="https://i.pinimg.com/736x/1d/f2/55/1df2552bd0458d4e9b6faf7f989d961f.jpg" alt="Mirror work" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-card overflow-hidden shadow-card aspect-[3/4]">
                <img src="https://i.pinimg.com/1200x/e9/a4/40/e9a4401e3f7c897342f874e875a503d9.jpg" alt="Finished piece" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Lippen Art */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-heading text-3xl font-bold text-text-dark mt-2">Why Lippen Art?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-card p-6 shadow-card text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-dark mb-2">{title}</h3>
                <p className="text-sm text-text-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Craftsmanship</span>
            <h2 className="font-heading text-3xl font-bold text-text-dark mt-2">Skills & Materials</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <div key={skill.label} className="bg-white rounded-card p-5 shadow-card text-center hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
                <span className="text-3xl block mb-2">{skill.icon}</span>
                <span className="text-sm font-medium text-text-dark">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-card p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-3">Ready to Own a Piece of Art?</h2>
          <p className="text-text-muted mb-6">Browse our collection or request a custom piece made just for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop"><Button>Shop Now</Button></Link>
            <Link to="/custom-order"><Button variant="secondary">Custom Order</Button></Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
