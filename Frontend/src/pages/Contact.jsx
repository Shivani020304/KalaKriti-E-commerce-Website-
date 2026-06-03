import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Phone, Mail, Clock, Instagram, Facebook, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
  const handle = import.meta.env.VITE_INSTAGRAM_HANDLE || 'kalakriti';

  const onSubmit = () => {
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    reset();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">Get in Touch</h1>
          <p className="text-text-muted mt-2">We&apos;d love to hear from you. Reach out anytime!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-card shadow-card p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Name *</label>
                  <input {...register('name', { required: 'Name is required' })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your name" />
                  {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Email *</label>
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="your@email.com" />
                  {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">WhatsApp Number</label>
                <input type="tel" {...register('whatsapp')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Subject *</label>
                <select {...register('subject', { required: true })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option value="General Query">General Query</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Bulk Order">Bulk Order</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Message *</label>
                <textarea {...register('message', { required: 'Message is required' })} rows={5} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="How can we help you?" />
                {errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-card shadow-card p-6">
              <h3 className="font-heading text-lg font-semibold text-text-dark mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">WhatsApp</p>
                    <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">+91 99999 99999</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">Email</p>
                    <p className="text-sm text-text-muted">hello@kalakriti.art</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">Response Time</p>
                    <p className="text-sm text-text-muted">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">Location</p>
                    <p className="text-sm text-text-muted">Handcrafted in India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-card shadow-card p-6">
              <h3 className="font-heading text-lg font-semibold text-text-dark mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all" aria-label="Pinterest">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-.99 4.01-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.78-2.26 3.78-5.52 0-2.89-2.07-4.9-5.04-4.9-3.43 0-5.45 2.58-5.45 5.24 0 1.04.4 2.15.9 2.75a.36.36 0 0 1 .08.35l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.78 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
