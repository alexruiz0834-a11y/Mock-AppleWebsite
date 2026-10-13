import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// A reducer takes the current cart and an "action" describing a change,
// and returns the NEW cart.
function cartReducer(items, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = items.find((item) => item.product.id === action.product.id);
      if (existing) {
        return items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      }
      return [...items, { product: action.product, quantity: action.quantity }];
    }
    case 'SET_QUANTITY':
      return items.map((item) =>
        item.product.id === action.id ? { ...item, quantity: action.quantity } : item
      );
    case 'REMOVE':
      return items.filter((item) => item.product.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product, quantity = 1) => dispatch({ type: 'ADD', product, quantity });
  const setQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE', id });
    } else {
      dispatch({ type: 'SET_QUANTITY', id, quantity });
    }
  };
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const value = { items, addToCart, setQuantity, removeFromCart, clearCart, totalItems, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}