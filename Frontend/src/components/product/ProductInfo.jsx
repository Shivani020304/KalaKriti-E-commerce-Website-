import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, calculateDiscount } from '../../utils/formatPrice';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const currentPrice = selectedSize?.price || product.price;
  const discount = calculateDiscount(currentPrice, product.originalPrice);
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    toast.success(`${product.name} added to cart!`);
    toggleCart();
  };

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1 text-xs text-text-muted">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={12} />
        <span className="hover:text-primary">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-text-dark font-medium truncate">{product.name}</span>
      </nav>

      <div className="flex items-center gap-2">
        {product.isNew && <Badge variant="new">New</Badge>}
        {discount > 0 && <Badge variant="sale">{discount}% Off</Badge>}
      </div>

      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-dark">{product.name}</h1>

      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} showValue count={product.reviewCount} />
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">{formatPrice(currentPrice)}</span>
        {product.originalPrice && (
          <span className="text-lg text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>

      <p className="text-text-muted text-sm leading-relaxed">{product.shortDescription}</p>

      {product.sizes?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-text-dark mb-2">Size</h4>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedSize?.label === size.label
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-text-dark border-gray-200 hover:border-primary'
                }`}
              >
                {size.label} ({size.diameter})
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-text-dark mb-2">Color: <span className="font-normal text-text-muted">{selectedColor}</span></h4>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                  selectedColor === color
                    ? 'bg-primary/10 text-primary border-primary font-medium'
                    : 'bg-white text-text-muted border-gray-200 hover:border-primary'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <h4 className="text-sm font-semibold text-text-dark">Quantity</h4>
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Decrease">
            <Minus size={16} />
          </button>
          <span className="text-base font-semibold w-8 text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Increase">
            <Plus size={16} />
          </button>
        </div>
        {product.stockCount <= 5 && product.inStock && (
          <span className="text-sm text-accent font-medium">Only {product.stockCount} left!</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2" disabled={!product.inStock}>
          <ShoppingBag size={18} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => { toggleWishlist(product); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!'); }}
          className="flex items-center justify-center gap-2"
        >
          <Heart size={18} className={wishlisted ? 'fill-error text-error' : ''} />
          {wishlisted ? 'Wishlisted' : 'Wishlist'}
        </Button>
      </div>

      <a
        href={`https://wa.me/${phone}?text=Hi! I'm interested in ordering "${product.name}" (${selectedSize?.label || ''}) from KalaKriti.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1da855] transition-colors text-sm"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Order on WhatsApp
      </a>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <Truck size={16} className="text-primary" />
          <span>Delivered in {product.deliveryDays} | Free shipping above ₹999</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <Shield size={16} className="text-primary" />
          <span>100% Handmade | Secure Packaging</span>
        </div>
      </div>
    </div>
  );
}
