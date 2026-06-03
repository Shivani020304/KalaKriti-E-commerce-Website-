import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import { reviews } from '../../data/reviews';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function ReviewSection({ productId, rating, reviewCount }) {
  const [showForm, setShowForm] = useState(false);
  const productReviews = reviews.filter((r) => r.productId === productId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    toast.success('Thank you for your review!');
    setShowForm(false);
    reset();
  };

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: productReviews.filter((r) => r.rating === star).length,
    pct: productReviews.length > 0 ? (productReviews.filter((r) => r.rating === star).length / productReviews.length) * 100 : 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="text-center sm:text-left">
          <div className="text-5xl font-bold text-text-dark">{rating}</div>
          <StarRating rating={rating} size={18} />
          <p className="text-sm text-text-muted mt-1">{reviewCount} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {ratingDist.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-text-muted">{star}★</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-6 text-text-muted text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h4 className="font-heading text-lg font-semibold">Customer Reviews</h4>
        <Button size="sm" variant="secondary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Write a Review'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 rounded-card p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Your Name</label>
            <input {...register('name', { required: 'Name is required' })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Enter your name" />
            {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Rating</label>
            <select {...register('rating', { required: true })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
              <option value="5">5 — Excellent</option>
              <option value="4">4 — Good</option>
              <option value="3">3 — Average</option>
              <option value="2">2 — Below Average</option>
              <option value="1">1 — Poor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Your Review</label>
            <textarea {...register('comment', { required: 'Review is required' })} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Share your experience..." />
            {errors.comment && <p className="text-error text-xs mt-1">{errors.comment.message}</p>}
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      )}

      <div className="space-y-4">
        {productReviews.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-8">No reviews yet. Be the first to review this product!</p>
        ) : (
          productReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h5 className="text-sm font-semibold text-text-dark">{review.name}</h5>
                  <p className="text-xs text-text-muted">{review.city} • {new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <StarRating rating={review.rating} size={14} />
              <p className="text-sm text-text-muted mt-2 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
