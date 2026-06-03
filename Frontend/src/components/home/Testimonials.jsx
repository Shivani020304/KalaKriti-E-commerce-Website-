import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/reviews';
import StarRating from '../ui/StarRating';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mt-2 mb-12">What Our Customers Say</h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
              <Quote className="text-primary/20 mx-auto mb-6" size={48} />
              <p className="text-lg sm:text-xl text-text-dark leading-relaxed mb-6 font-body italic">
                &ldquo;{testimonials[current].comment}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <h4 className="font-semibold text-text-dark">{testimonials[current].name}</h4>
                  <p className="text-sm text-text-muted">{testimonials[current].city}</p>
                </div>
              </div>
              <StarRating rating={testimonials[current].rating} size={16} />
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setCurrent(idx)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === current ? 'bg-primary w-8' : 'bg-gray-300'}`} aria-label={`Go to testimonial ${idx + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
