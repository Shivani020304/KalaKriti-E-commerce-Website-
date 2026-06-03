import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'lippen_cart';

const getInitialState = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return { items: JSON.parse(stored), isOpen: false };
    }
  } catch (e) {
    console.error('Failed to load cart from localStorage:', e);
  }
  return { items: [], isOpen: false };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, selectedSize, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.selectedSize?.label === selectedSize?.label
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: newItems };
      }
      const price = selectedSize?.price || product.price;
      return {
        ...state,
        items: [...state.items, { ...product, selectedSize, quantity, price }],
      };
    }
    case 'REMOVE_FROM_CART': {
      const { id, selectedSize } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === id && item.selectedSize?.label === selectedSize?.label)
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, selectedSize, newQty } = action.payload;
      if (newQty < 1) return state;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id && item.selectedSize?.label === selectedSize?.label
            ? { ...item, quantity: newQty }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [state.items]);

  const addToCart = (product, selectedSize, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, selectedSize, quantity } });
  };

  const removeFromCart = (id, selectedSize) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, selectedSize } });
  };

  const updateQuantity = (id, selectedSize, newQty) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, selectedSize, newQty } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  const setCartOpen = (open) => dispatch({ type: 'SET_CART_OPEN', payload: open });

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
