import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { products as initialProducts, categories as initialCategories } from '../data/products';

const AdminContext = createContext();

const STORAGE_KEYS = {
  AUTH: 'kalakriti_admin_auth',
  PRODUCTS: 'kalakriti_admin_products',
  ORDERS: 'kalakriti_admin_orders',
  CATEGORIES: 'kalakriti_admin_categories',
};

// Default admin password — in production this would be server-side
const ADMIN_PASSWORD = 'kalakriti2026';

// Generate sample orders for demo
const generateSampleOrders = (products) => {
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const names = ['Priya Sharma', 'Rahul Patel', 'Sneha Gupta', 'Amit Kumar', 'Neha Singh', 'Vikram Joshi', 'Anjali Desai', 'Rohan Mehta'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Jaipur', 'Ahmedabad', 'Pune', 'Chennai', 'Kolkata'];
  const orders = [];

  for (let i = 0; i < 15; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const qty = Math.floor(Math.random() * 3) + 1;
    const size = product.sizes[Math.floor(Math.random() * product.sizes.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    orders.push({
      id: `TLA-${(Date.now() - daysAgo * 86400000).toString(36).toUpperCase()}${i}`,
      customer: {
        name: names[Math.floor(Math.random() * names.length)],
        phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: `customer${i + 1}@example.com`,
        address: `${Math.floor(100 + Math.random() * 900)}, Main Street`,
        city: cities[Math.floor(Math.random() * cities.length)],
        state: 'Maharashtra',
        pincode: `${Math.floor(100000 + Math.random() * 900000)}`,
      },
      items: [
        {
          productId: product.id,
          name: product.name,
          image: product.images[0],
          size: size.label,
          quantity: qty,
          price: size.price,
        },
      ],
      subtotal: size.price * qty,
      shipping: size.price * qty >= 999 ? 0 : 99,
      total: size.price * qty + (size.price * qty >= 999 ? 0 : 99),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentMethod: Math.random() > 0.3 ? 'online' : 'whatsapp',
      paymentId: Math.random() > 0.3 ? `pay_${Math.random().toString(36).substring(2, 15)}` : null,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });
  }

  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getInitialState = () => {
  try {
    const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
    const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);

    const products = storedProducts ? JSON.parse(storedProducts) : initialProducts;
    const orders = storedOrders ? JSON.parse(storedOrders) : generateSampleOrders(initialProducts);
    const categories = storedCategories ? JSON.parse(storedCategories) : initialCategories;

    return {
      isAuthenticated: auth === 'true',
      products,
      orders,
      categories,
    };
  } catch (e) {
    console.error('Failed to load admin state:', e);
    return {
      isAuthenticated: false,
      products: initialProducts,
      orders: generateSampleOrders(initialProducts),
      categories: initialCategories,
    };
  }
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };

    // Products
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    // Orders
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id
            ? { ...o, status: action.payload.status, updatedAt: new Date().toISOString() }
            : o
        ),
      };

    // Categories
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) =>
          c === action.payload.oldName ? action.payload.newName : c
        ),
        products: state.products.map((p) =>
          p.category === action.payload.oldName
            ? { ...p, category: action.payload.newName }
            : p
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c !== action.payload),
      };

    default:
      return state;
  }
};

import { useProducts } from './ProductContext';

export function AdminProvider({ children }) {
  const { products: fetchedProducts, addProduct: apiAddProduct } = useProducts();
  const [state, dispatch] = useReducer(adminReducer, null, getInitialState);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, state.isAuthenticated.toString());
  }, [state.isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
  }, [state.orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(state.categories));
  }, [state.categories]);

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      dispatch({ type: 'LOGIN' });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const addProduct = useCallback(async (product) => {
    const id = `lp-${Date.now().toString(36)}`;
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct = {
      ...product,
      id,
      slug,
      rating: 0,
      reviewCount: 0,
      featured: false,
      isNew: true,
      tags: product.tags || [],
    };
    
    // Call the backend API!
    const success = await apiAddProduct(newProduct);
    
    if (success) {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: newProduct,
      });
    }
  }, [apiAddProduct]);

  const updateProduct = useCallback((product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  }, []);

  const deleteProduct = useCallback((id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  }, []);

  const updateOrderStatus = useCallback((id, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
  }, []);

  const addCategory = useCallback((name) => {
    if (!state.categories.includes(name)) {
      dispatch({ type: 'ADD_CATEGORY', payload: name });
      return true;
    }
    return false;
  }, [state.categories]);

  const updateCategory = useCallback((oldName, newName) => {
    if (!state.categories.includes(newName)) {
      dispatch({ type: 'UPDATE_CATEGORY', payload: { oldName, newName } });
      return true;
    }
    return false;
  }, [state.categories]);

  const deleteCategory = useCallback((name) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: name });
  }, []);

  // Analytics helpers
  const getAnalytics = useCallback(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayOrders = state.orders.filter((o) => new Date(o.createdAt) >= today);
    const monthOrders = state.orders.filter((o) => new Date(o.createdAt) >= thisMonth);

    const totalRevenue = state.orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const todayRevenue = todayOrders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const monthRevenue = monthOrders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = state.orders.filter((o) => o.status === 'pending').length;
    const processingOrders = state.orders.filter((o) => o.status === 'processing').length;

    // Revenue by last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayOrders = state.orders.filter((o) => {
        const d = new Date(o.createdAt);
        return d >= dayStart && d < dayEnd && o.status !== 'cancelled';
      });

      last7Days.push({
        label: dayStart.toLocaleDateString('en-IN', { weekday: 'short' }),
        date: dayStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
        orders: dayOrders.length,
      });
    }

    // Top selling products
    const productSales = {};
    state.orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = { name: item.name, image: item.image, quantity: 0, revenue: 0 };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      totalProducts: state.products.length,
      totalOrders: state.orders.length,
      totalRevenue,
      todayRevenue,
      monthRevenue,
      pendingOrders,
      processingOrders,
      last7Days,
      topProducts,
    };
  }, [state.orders, state.products]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        products: fetchedProducts, // Use products from the database via ProductContext!
        orders: state.orders,
        categories: state.categories,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        getAnalytics,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};
