import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Upload, X, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { readFileAsBase64 } from '../utils/imageUpload';
import toast from 'react-hot-toast';

export default function CustomOrder() {
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await readFileAsBase64(file);
      setPreview(base64);
      setValue('referenceImage', base64);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = (data) => {
    toast.success("Your request has been received! We'll WhatsApp you within 24 hours.");
    reset();
    setPreview(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">Custom Order</h1>
          <p className="text-text-muted mt-2">Tell us your vision and we&apos;ll bring it to life in clay and mirrors</p>
        </div>

        <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name *</label>
                <input {...register('fullName', { required: 'Name is required' })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your name" />
                {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Email *</label>
                <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="your@email.com" />
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">WhatsApp Number *</label>
              <input type="tel" {...register('whatsapp', { required: 'WhatsApp number is required', pattern: { value: /^\d{10}$/, message: 'Enter 10-digit number' } })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="9876543210" />
              {errors.whatsapp && <p className="text-error text-xs mt-1">{errors.whatsapp.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Art Type</label>
                <select {...register('artType')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option value="Plate">Plate</option>
                  <option value="Wall Hanging">Wall Hanging</option>
                  <option value="Keychain">Keychain</option>
                  <option value="Toran">Toran</option>
                  <option value="Pot">Pot</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Size</label>
                <select {...register('size')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Preferred Colors</label>
              <input {...register('colors')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="e.g., Teal & Gold, Forest Green" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Budget Range</label>
                <select {...register('budget')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option value="Under ₹500">Under ₹500</option>
                  <option value="₹500-₹1000">₹500 - ₹1,000</option>
                  <option value="₹1000-₹2500">₹1,000 - ₹2,500</option>
                  <option value="₹2500+">₹2,500+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Quantity</label>
                <input type="number" min="1" defaultValue={1} {...register('quantity', { min: 1 })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Reference Image (optional)</label>
              <div className="relative">
                {preview ? (
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setPreview(null); setValue('referenceImage', null); }} className="absolute top-1 right-1 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <Upload className="text-text-muted mb-2" size={24} />
                    <span className="text-sm text-text-muted">Click to upload (JPG, PNG, PDF — max 5MB)</span>
                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Special Instructions</label>
              <textarea {...register('instructions')} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Any special requirements or details..." />
            </div>

            <Button type="submit" className="w-full" size="lg">Send Custom Order Request</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-text-muted mb-3">Prefer WhatsApp? Chat directly →</p>
            <a href={`https://wa.me/${phone}?text=Hi! I'd like to place a custom order for Lippen Art.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1da855] transition-colors text-sm">
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
