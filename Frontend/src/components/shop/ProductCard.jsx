import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, calculateDiscount } from '../../utils/formatPrice';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);
  const defaultSize = product.sizes?.[0];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultSize, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Card Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1">

          {/* Image Area */}
          <div className="relative overflow-hidden aspect-[4/3.8] bg-gradient-to-b from-[#f7f3ee] to-[#efe9e0]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              loading="lazy"
            />

            {/* Discount badge — top left */}
            {discount > 0 && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {discount}% off
                </span>
              </div>
            )}

            {/* New badge */}
            {product.isNew && !discount && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  New
                </span>
              </div>
            )}

            {/* Wishlist — top right */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                wishlisted
                  ? 'bg-error text-white'
                  : 'bg-white text-gray-400 hover:text-error hover:bg-white'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
            </button>

            {/* Quick action bar on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pt-10 pb-3 px-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-text-dark font-semibold py-2.5 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors duration-200 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
                <span className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white text-text-dark transition-colors duration-200 flex-shrink-0 cursor-pointer">
                  <Eye size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="px-4 pt-3.5 pb-4">
            {/* Category + Rating */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider">
                {product.category.length > 18
                  ? product.category.split(' ').slice(0, 2).join(' ')
                  : product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={13} className="fill-accent text-accent" />
                <span className="text-xs font-bold text-text-dark">{product.rating}</span>
              </div>
            </div>

            {/* Product name */}
            <h3 className="font-heading text-[15px] font-semibold text-text-dark mb-2 line-clamp-1 leading-snug">
              {product.name}
            </h3>

            {/* Price row */}
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
