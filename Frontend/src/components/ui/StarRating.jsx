import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, size = 16, showValue = false, count = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'fill-accent text-accent' : 'fill-gray-200 text-gray-200'}
        />
      ))}
      {showValue && <span className="ml-1 text-sm font-medium text-text-dark">{rating}</span>}
      {count > 0 && <span className="ml-1 text-sm text-text-muted">({count})</span>}
    </div>
  );
}
