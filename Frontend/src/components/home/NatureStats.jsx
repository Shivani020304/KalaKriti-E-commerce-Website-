import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Hand, Palette, Truck, Users } from 'lucide-react';

const stats = [
  { icon: Hand, label: '100% Handmade', value: 100, suffix: '%' },
  { icon: Palette, label: 'Unique Designs', value: 18, suffix: '+' },
  { icon: Users, label: 'Happy Customers', value: 500, suffix: '+' },
  { icon: Truck, label: 'Pan India Delivery', value: 28, suffix: ' States' },
];

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count}{suffix}</span>;
}

export default function NatureStats() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value, suffix }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-card p-6 text-center shadow-card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon className="text-primary" size={28} />
              </div>
              <div className="text-3xl font-bold text-text-dark font-heading">
                <CountUp target={value} suffix={suffix} inView={inView} />
              </div>
              <p className="text-sm text-text-muted mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
