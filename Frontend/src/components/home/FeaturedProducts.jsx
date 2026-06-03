import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../shop/ProductCard';
import Button from '../ui/Button';

export default function FeaturedProducts() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 6);

  // If no products are specifically marked as featured, fallback to highest rated
  const displayProducts = featured.length > 0 
    ? featured 
    : [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Curated Collection</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mt-2">Our Finest Creations</h2>
        <p className="text-text-muted mt-3 max-w-lg mx-auto">Each piece is a labor of love — handcrafted with premium clay and embedded with real mirrors.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      <div className="text-center">
        <Link to="/shop">
          <Button variant="secondary" size="lg">View All Products</Button>
        </Link>
      </div>
    </section>
  );
}
