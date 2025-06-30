import { configureStore } from '@reduxjs/toolkit';

// Try to load the cart from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : { list: [], total: 0 };
};

const store = configureStore({
  reducer: {
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(), // Initialize cart state with data from localStorage
  }
});

export default store;
