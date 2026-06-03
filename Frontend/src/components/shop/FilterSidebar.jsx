import { Star, RotateCcw } from 'lucide-react';
import { categories } from '../../data/products';

export default function FilterSidebar({ filters, setFilters, onReset }) {
  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const cats = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: cats };
    });
  };

  const handleSizeChange = (size) => {
    setFilters((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating,
    }));
  };

  const handlePromotionChange = (promo) => {
    setFilters((prev) => {
      const promos = prev.promotions?.includes(promo)
        ? prev.promotions.filter((p) => p !== promo)
        : [...(prev.promotions || []), promo];
      return { ...prev, promotions: promos };
    });
  };

  const renderStars = (count) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? 'fill-accent text-accent' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );

  // Count active filters
  const activeCount =
    filters.categories.length +
    filters.sizes.length +
    (filters.maxPrice < 6000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.promotions?.length || 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <aside className="shop-filter-sidebar">
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-text-dark">Filter Options</h3>
            {activeCount > 0 && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            )}
          </div>
          {activeCount > 0 && (
            <p className="text-[11px] text-text-muted mt-1">{activeCount} filter{activeCount > 1 ? 's' : ''} applied</p>
          )}
        </div>

        <div className="px-5 py-4">

          {/* Categories */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h4 className="font-body text-[13px] font-bold text-text-dark mb-3 uppercase tracking-wide">By Categories</h4>
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="shop-checkbox"
                  />
                  <span className={`text-[13px] transition-colors leading-tight ${
                    filters.categories.includes(cat) ? 'text-text-dark font-medium' : 'text-text-muted group-hover:text-text-dark'
                  }`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h4 className="font-body text-[13px] font-bold text-text-dark mb-3 uppercase tracking-wide">By Size</h4>
            <div className="space-y-2.5">
              {['Small', 'Medium', 'Large'].map((size) => (
                <label key={size} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="shop-checkbox"
                  />
                  <span className={`text-[13px] transition-colors ${
                    filters.sizes.includes(size) ? 'text-text-dark font-medium' : 'text-text-muted group-hover:text-text-dark'
                  }`}>
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h4 className="font-body text-[13px] font-bold text-text-dark mb-3 uppercase tracking-wide">Price</h4>
            <div className="flex items-center justify-between text-xs text-text-muted mb-3">
              <span className="bg-gray-50 px-2 py-1 rounded text-text-dark font-medium">₹0</span>
              <span className="text-gray-300">—</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded font-semibold">₹{filters.maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="6000"
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full"
            />
          </div>

          {/* Review / Rating */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h4 className="font-body text-[13px] font-bold text-text-dark mb-3 uppercase tracking-wide">Review</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className={`flex items-center gap-2.5 cursor-pointer group py-1 px-2 rounded-lg transition-colors ${
                    filters.minRating === rating ? 'bg-primary/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="shop-radio"
                  />
                  <div className="flex items-center gap-1.5">
                    {renderStars(rating)}
                    <span className="text-[11px] text-text-muted">
                      {rating === 5 ? '' : '& up'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Promotions */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h4 className="font-body text-[13px] font-bold text-text-dark mb-3 uppercase tracking-wide">By Promotions</h4>
            <div className="space-y-2.5">
              {[
                { key: 'new', label: 'New Arrivals', dot: '#74C0E8' },
                { key: 'bestseller', label: 'Best Sellers', dot: '#D4A843' },
                { key: 'sale', label: 'On Sale', dot: '#E63946' },
              ].map(({ key, label, dot }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    checked={filters.promotions?.includes(key) || false}
                    onChange={() => handlePromotionChange(key)}
                    className="shop-checkbox"
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: dot }}
                    />
                    <span className={`text-[13px] transition-colors ${
                      filters.promotions?.includes(key) ? 'text-text-dark font-medium' : 'text-text-muted group-hover:text-text-dark'
                    }`}>
                      {label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="font-body text-[13px] font-bold text-text-dark mb-3 uppercase tracking-wide">Availability</h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                <span
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0 border-2"
                  style={{
                    backgroundColor: '#2D6A4F',
                    borderColor: '#2D6A4F',
                  }}
                />
                <span className="text-[13px] text-text-dark font-medium">In Stock</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                  className="shop-checkbox"
                />
                <span className={`text-[13px] transition-colors ${
                  filters.inStockOnly ? 'text-text-dark font-medium' : 'text-text-muted group-hover:text-text-dark'
                }`}>
                  Show In Stock Only
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
