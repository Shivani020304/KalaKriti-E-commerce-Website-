import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import CartItem from './CartItem';
import Button from '../ui/Button';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { items, isOpen, setCartOpen, getCartTotal, getCartCount } = useCart();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-primary" size={22} />
                <h2 className="font-heading text-xl font-semibold text-text-dark">Your Cart</h2>
                <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 font-semibold">{getCartCount()}</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="text-gray-300 mb-4" size={64} />
                  <h3 className="font-heading text-lg text-text-dark mb-2">Your cart is empty</h3>
                  <p className="text-text-muted text-sm mb-6">Discover our handcrafted art collection</p>
                  <Button onClick={() => { setCartOpen(false); navigate('/shop'); }}>
                    Browse Collection
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem key={`${item.id}-${item.selectedSize?.label}`} item={item} />
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-3 bg-gray-50/50">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? <span className="text-success">Free</span> : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-text-muted">Free shipping on orders above ₹999</p>
                )}
                <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
                <div className="space-y-2 pt-2">
                  <Button className="w-full" onClick={() => { setCartOpen(false); navigate('/checkout'); }}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
