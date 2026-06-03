import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import SizeGuide from '../components/product/SizeGuide';
import CareInstructions from '../components/product/CareInstructions';
import ReviewSection from '../components/product/ReviewSection';
import ProductCard from '../components/shop/ProductCard';

const tabs = ['Description', 'Size Guide', 'Care', 'Reviews'];

export default function ProductDetail() {
  const { products } = useProducts();
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('Description');
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center min-h-screen flex items-center justify-center">
        <div>
          <p className="text-6xl mb-4">🍃</p>
          <h1 className="font-heading text-2xl font-bold text-text-dark mb-2">Product Not Found</h1>
          <p className="text-text-muted">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <ImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <div className="mb-16">
          <div className="flex border-b border-gray-200 gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === tab ? 'text-primary border-primary' : 'text-text-muted border-transparent hover:text-text-dark'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="pt-8">
            {activeTab === 'Description' && (
              <div className="prose max-w-none">
                <p className="text-text-muted leading-relaxed">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-xs text-text-muted uppercase tracking-wide">Weight</span>
                    <p className="text-sm font-semibold text-text-dark mt-1">{product.weight}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-xs text-text-muted uppercase tracking-wide">Materials</span>
                    <p className="text-sm font-semibold text-text-dark mt-1">{product.materials?.join(', ')}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-xs text-text-muted uppercase tracking-wide">Delivery</span>
                    <p className="text-sm font-semibold text-text-dark mt-1">{product.deliveryDays}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Size Guide' && <SizeGuide sizes={product.sizes} />}
            {activeTab === 'Care' && <CareInstructions instructions={product.careInstructions} />}
            {activeTab === 'Reviews' && <ReviewSection productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />}
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
