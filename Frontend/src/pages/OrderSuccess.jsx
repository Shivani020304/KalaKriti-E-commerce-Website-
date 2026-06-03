import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || `TLA-${Date.now().toString(36).toUpperCase()}`;
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
          >
            <CheckCircle className="text-success" size={56} />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-3"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-text-muted text-lg mb-2"
        >
          Your order has been placed successfully.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-card shadow-card p-6 mb-8"
        >
          <p className="text-sm text-text-muted mb-1">Order ID</p>
          <p className="text-xl font-bold text-primary font-mono">{orderId}</p>
          <p className="text-sm text-text-muted mt-4">
            We&apos;ll send you an update on WhatsApp once your handcrafted piece is ready for shipping. 🍃
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/shop">
            <Button className="flex items-center gap-2">
              <ShoppingBag size={18} />
              Back to Shop
            </Button>
          </Link>
          <a
            href={`https://wa.me/${phone}?text=Hi! I just placed order ${orderId}. I'd like to track my order.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="flex items-center gap-2">
              <MessageCircle size={18} />
              Track via WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
