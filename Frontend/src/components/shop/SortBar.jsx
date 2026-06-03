import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function SortBar({ totalResults, sortBy, setSortBy, onToggleMobileFilters, currentPage, itemsPerPage }) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-text-dark hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
        <p className="text-sm text-text-muted">
          Showing <span className="font-semibold text-text-dark">{start}-{end}</span> of{' '}
          <span className="font-semibold text-text-dark">{totalResults}</span> results
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-muted">Sort by :</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
          >
            <option value="newest">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="bestseller">Best Sellers</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
