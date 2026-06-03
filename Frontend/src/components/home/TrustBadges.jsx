import { motion } from 'framer-motion';
import { Truck, Hand, RotateCcw, MessageCircle } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    subtitle: 'On Orders Over ₹999',
  },
  {
    icon: Hand,
    title: '100% Handcrafted',
    subtitle: 'Made with Love',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: '7-Day Guarantee',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    subtitle: 'WhatsApp Assistance',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-6 sm:py-8" style={{ background: '#FBF7F2' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5"
        >
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-0">
            {badges.map((badge, idx) => (
              <div key={badge.title} className="flex items-center gap-0">
                {/* Badge Content */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C8956C12' }}>
                    <badge.icon size={22} style={{ color: '#C8956C' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-dark leading-tight">{badge.title}</p>
                    <p className="text-xs text-text-muted leading-tight">{badge.subtitle}</p>
                  </div>
                </div>

                {/* Separator dot (not on last item) */}
                {idx < badges.length - 1 && (
                  <div className="hidden lg:block ml-8 w-1.5 h-1.5 rounded-full bg-[#C8956C]/30" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
