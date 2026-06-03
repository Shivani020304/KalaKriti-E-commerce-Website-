import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Truck, CreditCard, Headphones } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/shop/ProductGrid';
import FilterSidebar from '../components/shop/FilterSidebar';
import SortBar from '../components/shop/SortBar';
import Button from '../components/ui/Button';

const ITEMS_PER_PAGE = 12;

const defaultFilters = {
  categories: [],
  maxPrice: 6000,
  sizes: [],
  inStockOnly: false,
  minRating: 0,
  promotions: [],
};

export default function Shop() {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    categories: categoryParam ? [categoryParam] : [],
  }));
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Price filter
    result = result.filter((p) => p.price <= filters.maxPrice);

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes?.some((s) => filters.sizes.includes(s.label)));
    }

    // Stock filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Promotions filter
    if (filters.promotions?.length > 0) {
      result = result.filter((p) => {
        if (filters.promotions.includes('new') && p.isNew) return true;
        if (filters.promotions.includes('sale') && p.originalPrice) return true;
        if (filters.promotions.includes('bestseller') && p.reviewCount >= 20) return true;
        return false;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  // Check if any filters are active
  const activeFilterChips = [];
  if (filters.categories.length > 0) {
    filters.categories.forEach((c) =>
      activeFilterChips.push({ type: 'category', label: c, value: c })
    );
  }
  if (filters.maxPrice < 6000) {
    activeFilterChips.push({
      type: 'price',
      label: `Price : ₹0 - ₹${filters.maxPrice.toLocaleString('en-IN')}`,
      value: 'price',
    });
  }
  if (filters.sizes.length > 0) {
    filters.sizes.forEach((s) =>
      activeFilterChips.push({ type: 'size', label: s, value: s })
    );
  }
  if (filters.inStockOnly) {
    activeFilterChips.push({ type: 'stock', label: 'In Stock', value: 'stock' });
  }
  if (filters.minRating > 0) {
    activeFilterChips.push({
      type: 'rating',
      label: `${filters.minRating}+ Stars`,
      value: 'rating',
    });
  }
  if (filters.promotions?.length > 0) {
    filters.promotions.forEach((p) => {
      const labels = { new: 'New Arrivals', bestseller: 'Best Sellers', sale: 'On Sale' };
      activeFilterChips.push({ type: 'promo', label: labels[p], value: p });
    });
  }

  const removeChip = (chip) => {
    if (chip.type === 'category') {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== chip.value),
      }));
    } else if (chip.type === 'price') {
      setFilters((prev) => ({ ...prev, maxPrice: 6000 }));
    } else if (chip.type === 'size') {
      setFilters((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((s) => s !== chip.value),
      }));
    } else if (chip.type === 'stock') {
      setFilters((prev) => ({ ...prev, inStockOnly: false }));
    } else if (chip.type === 'rating') {
      setFilters((prev) => ({ ...prev, minRating: 0 }));
    } else if (chip.type === 'promo') {
      setFilters((prev) => ({
        ...prev,
        promotions: prev.promotions.filter((p) => p !== chip.value),
      }));
    }
    setCurrentPage(1);
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header with Breadcrumb */}
      <div className="bg-[#FBF7F2] pt-8 pb-10">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-2">Shop</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-dark font-medium">Shop</span>
          </nav>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[270px] flex-shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={(f) => {
                setFilters(f);
                setCurrentPage(1);
              }}
              onReset={resetFilters}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div
              className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            >
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute left-0 top-0 bottom-0 w-[310px] bg-[#FBF7F2] p-4 overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading text-lg font-bold">Filter Options</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  setFilters={(f) => {
                    setFilters(f);
                    setCurrentPage(1);
                  }}
                  onReset={resetFilters}
                />
              </motion.div>
            </div>
          )}

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters + Sort */}
            <div className="mb-1">
              {activeFilterChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-text-dark uppercase tracking-wide mr-1">Active Filter</span>
                  {activeFilterChips.map((chip, idx) => (
                    <button
                      key={`${chip.type}-${chip.value}-${idx}`}
                      onClick={() => removeChip(chip)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {chip.label}
                      <X size={12} />
                    </button>
                  ))}
                  <button
                    onClick={resetFilters}
                    className="text-xs text-error font-medium hover:underline ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            <SortBar
              totalResults={filtered.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onToggleMobileFilters={() => setShowMobileFilters(true)}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />

            {/* Product Grid */}
            <ProductGrid products={paginated} />

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🍃</p>
                <h3 className="font-heading text-xl font-semibold text-text-dark mb-2">
                  No products found
                </h3>
                <p className="text-text-muted text-sm mb-6">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
                <Button onClick={resetFilters} variant="secondary">
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-12">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {getPaginationNumbers().map((page, idx) =>
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-text-muted text-sm">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo(0, 0);
                      }}
                      className={`w-9 h-9 rounded-lg font-medium text-sm transition-all duration-200 ${
                        page === currentPage
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-text-dark hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges Bar (matching reference) */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-dark leading-tight">Free Shipping</p>
                <p className="text-xs text-text-muted leading-tight">Free shipping for order above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <CreditCard size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-dark leading-tight">Flexible Payment</p>
                <p className="text-xs text-text-muted leading-tight">Multiple secure payment options</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-dark leading-tight">24×7 Support</p>
                <p className="text-xs text-text-muted leading-tight">We support online all days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
