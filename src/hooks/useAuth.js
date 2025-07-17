import { useDispatch, useSelector } from "react-redux";
import { login, signup, logout, resetAuthState } from "../redux/auth/auth.slice";
import { useEffect } from "react";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

useEffect(() => {
  const checkAuthState = () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      // If either is missing but Redux thinks we're logged in
      if ((user && !storedUser) || (token && !storedToken)) {
        handleLogout();
      }
    } catch (error) {
      console.error("Auth state check failed:", error);
      handleLogout();
    }
  };

  checkAuthState();
}, []);

  // 🔐 Login
  const handleLogin = async (email, password) => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      console.error("Erreur de connexion :", error);
      console.log("💬 Message:", error.response.data);
      throw error;
    }
  };

  // 📝 Signup
  const handleSignup = async (formData) => {
    try {
      await dispatch(signup(formData)).unwrap();
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      console.log("💬 Message:", error.response.data);
      throw error;
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // 🔄 Réinitialiser l’état d'erreur/succès
  const reset = () => dispatch(resetAuthState());

  return {
    user,
    token,
    isLoading,
    isError,
    isSuccess,
    message,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    reset,
  };
};

export default useAuth;
