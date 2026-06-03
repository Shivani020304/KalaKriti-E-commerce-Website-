import { createContext, useContext, useState, useEffect } from 'react';
import { products as fallbackProducts } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts); // Fallback to local data initially
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch products from backend, using local fallback:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      // Create FormData to handle image uploads if we had a file, 
      // but for now our admin panel sends JSON with image URLs
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          imageUrl: productData.images[0] // Send first image as main imageUrl for now
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        // Update state
        setProducts(prev => [newProduct, ...prev]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
