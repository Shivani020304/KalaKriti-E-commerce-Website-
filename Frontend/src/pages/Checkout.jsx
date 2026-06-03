import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { initiatePayment } from '../utils/razorpay';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { CreditCard, MessageCircle } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h1 className="font-heading text-2xl font-bold text-text-dark mb-2">Your cart is empty</h1>
          <p className="text-text-muted mb-6">Add some items before checking out</p>
          <Button onClick={() => navigate('/shop')}>Browse Collection</Button>
        </div>
      </motion.div>
    );
  }

  const onSubmit = async (data) => {
    const orderId = `TLA-${Date.now().toString(36).toUpperCase()}`;

    if (paymentMethod === 'whatsapp') {
      const itemList = items.map((i) => `• ${i.name} (${i.selectedSize?.label || 'Default'}) x${i.quantity}`).join('\n');
      const msg = `Hi! I'd like to place an order:\n\n${itemList}\n\nTotal: ${formatPrice(total)}\n\nDelivery to:\n${data.name}\n${data.address}, ${data.city}\n${data.state} - ${data.pincode}\nPhone: ${data.phone}`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
      clearCart();
      navigate('/order-success', { state: { orderId } });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await initiatePayment({
        amount: total,
        name: data.name,
        email: data.email || 'customer@example.com',
        phone: data.phone,
        orderId,
      });
      clearCart();
      navigate('/order-success', { state: { orderId: result.orderId, paymentId: result.paymentId } });
    } catch (err) {
      toast.error(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-text-dark mb-8 text-center">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-card shadow-card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-text-dark mb-6">Delivery Details</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Full Name *</label>
                    <input {...register('name', { required: 'Name is required' })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your name" />
                    {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Phone *</label>
                    <input type="tel" {...register('phone', { required: 'Phone is required', pattern: { value: /^\d{10}$/, message: '10-digit number required' } })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="9876543210" />
                    {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Address *</label>
                  <textarea {...register('address', { required: 'Address is required' })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Street address, apartment, etc." />
                  {errors.address && <p className="text-error text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">City *</label>
                    <input {...register('city', { required: 'City is required' })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="City" />
                    {errors.city && <p className="text-error text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">State *</label>
                    <input {...register('state', { required: 'State is required' })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="State" />
                    {errors.state && <p className="text-error text-xs mt-1">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Pincode *</label>
                    <input {...register('pincode', { required: 'Pincode is required', pattern: { value: /^\d{6}$/, message: '6-digit pincode' } })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="400001" />
                    {errors.pincode && <p className="text-error text-xs mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>
              </div>

              <h2 className="font-heading text-xl font-semibold text-text-dark mt-10 mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" onClick={() => setPaymentMethod('online')} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <CreditCard size={24} className={paymentMethod === 'online' ? 'text-primary' : 'text-text-muted'} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text-dark">Online Payment</p>
                    <p className="text-xs text-text-muted">UPI, Cards, Net Banking via Razorpay</p>
                  </div>
                </button>
                <button type="button" onClick={() => setPaymentMethod('whatsapp')} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'whatsapp' ? 'border-[#25D366] bg-[#25D366]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <MessageCircle size={24} className={paymentMethod === 'whatsapp' ? 'text-[#25D366]' : 'text-text-muted'} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text-dark">WhatsApp Order</p>
                    <p className="text-xs text-text-muted">Place order via WhatsApp chat</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-card shadow-card p-6 sticky top-28">
                <h2 className="font-heading text-lg font-semibold text-text-dark mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize?.label}`} className="flex items-center gap-3">
                      <img src={item.images?.[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-dark truncate">{item.name}</p>
                        <p className="text-xs text-text-muted">{item.selectedSize?.label} × {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-text-muted">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-muted">Shipping</span><span>{shipping === 0 ? <span className="text-success font-medium">Free</span> : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
                </div>
                <Button type="submit" className="w-full mt-6" size="lg" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : paymentMethod === 'online' ? `Pay ${formatPrice(total)}` : 'Order via WhatsApp'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
