import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-body text-sm font-semibold text-text-dark truncate">{item.name}</h4>
        {item.selectedSize && (
          <p className="text-xs text-text-muted mt-0.5">{item.selectedSize.label} — {item.selectedSize.diameter}</p>
        )}
        <p className="text-sm font-semibold text-primary mt-1">{formatPrice(item.price)}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-1 py-0.5">
            <button
              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id, item.selectedSize)}
            className="text-gray-400 hover:text-error transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
