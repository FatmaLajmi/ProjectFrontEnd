import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice.js'; // 💡 Import de ton slice auth

// Charger le panier depuis le localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : { list: [], total: 0 };
};

const store = configureStore({
  reducer: {
    auth: authReducer, // 💡 Ici tu déclares ton slice d'authentification
    // cart: cartReducer (si tu en crées un plus tard)
  },
  preloadedState: {
    cart: loadCartFromLocalStorage()
  }
});

export default store;
