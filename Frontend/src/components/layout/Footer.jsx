import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';

const quickLinks = [
  { to: '/shop', label: 'Shop All' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/custom-order', label: 'Custom Order' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const categoryLinks = [
  { to: '/shop?category=Lippen Art Plates', label: 'Lippen Art Plates' },
  { to: '/shop?category=Wall Hanging Lippen Art', label: 'Wall Hangings' },
  { to: '/shop?category=Keychains', label: 'Keychains' },
  { to: '/shop?category=Door Torans', label: 'Door Torans' },
  { to: '/shop?category=Shubh-Labh Hangings', label: 'Shubh-Labh' },
  { to: '/shop?category=Decorative Flower Pots', label: 'Flower Pots' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const instagramHandle = import.meta.env.VITE_INSTAGRAM_HANDLE || 'kalakriti';

  return (
    <footer className="bg-text-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-7 h-7 text-accent" />
              <span className="font-heading text-xl font-bold text-white">KalaKriti</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Handcrafted clay-based mandala art embedded with real mirrors. Each piece tells a story of earth, light, and love — made in India.
            </p>
            <div className="flex items-center gap-3">
              <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300" aria-label="Pinterest">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-.99 4.01-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.78-2.26 3.78-5.52 0-2.89-2.07-4.9-5.04-4.9-3.43 0-5.45 2.58-5.45 5.24 0 1.04.4 2.15.9 2.75a.36.36 0 0 1 .08.35l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.78 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors duration-300" aria-label="WhatsApp">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-accent">Categories</h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-accent">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>hello@kalakriti.art</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>Handcrafted with love in India</span>
              </li>
            </ul>
            <p className="text-gray-500 text-xs mt-4">Response within 24 hours</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} KalaKriti. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-6 h-4" viewBox="0 0 48 32" fill="currentColor"><rect width="48" height="32" rx="4" opacity="0.3"/><text x="24" y="20" textAnchor="middle" fontSize="10" fill="white">UPI</text></svg>
              UPI
            </span>
            <span>•</span>
            <span>Cards</span>
            <span>•</span>
            <span>Net Banking</span>
            <span>•</span>
            <span className="text-secondary">Powered by Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
