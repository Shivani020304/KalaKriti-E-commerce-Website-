import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import CartDrawer from '../cart/CartDrawer';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/custom-order', label: 'Custom Order' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { getCartCount, toggleCart, isOpen: cartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-[#FBF7F2]/90 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              {/* Lippan art inspired logo icon */}
              <div className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#2D6A4F' }}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/60" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-white/60" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block font-heading text-lg font-bold text-text-dark leading-none">
                  KalaKriti
                </span>
                <span className="block text-[10px] font-body font-medium tracking-[0.15em] uppercase" style={{ color: '#6B7C6E' }}>
                  Handcrafted Art
                </span>
              </div>
            </Link>

            {/* Center Nav Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative font-body text-sm font-medium transition-colors duration-300 hover:text-[#C8956C] ${
                      isActive ? 'text-[#C8956C]' : 'text-text-dark'
                    } ${isActive ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[#C8956C] after:rounded-full' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-full transition-colors duration-300 hover:bg-[#C8956C]/10 text-text-dark"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/shop"
                className="relative p-2 rounded-full transition-colors duration-300 hover:bg-[#C8956C]/10 text-text-dark"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full transition-colors duration-300 hover:bg-[#C8956C]/10 text-text-dark"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-semibold" style={{ backgroundColor: '#2D6A4F' }}>
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Shop Now Button */}
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                style={{ backgroundColor: '#2D6A4F' }}
              >
                Shop Now
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-full transition-colors duration-300 hover:bg-[#C8956C]/10 text-text-dark"
                aria-label="Menu"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="mt-4 pb-2">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search for art pieces..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C8956C]/30 focus:border-[#C8956C] text-sm font-body"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {isMobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-body text-base font-medium transition-colors duration-200 ${
                      isActive ? 'text-[#C8956C] bg-[#C8956C]/5' : 'text-text-dark hover:text-[#C8956C] hover:bg-[#C8956C]/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/shop"
                onClick={() => setIsMobileOpen(false)}
                className="block mx-4 mt-4 px-5 py-3 rounded-xl text-center font-semibold text-white text-base transition-all"
                style={{ backgroundColor: '#2D6A4F' }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}
