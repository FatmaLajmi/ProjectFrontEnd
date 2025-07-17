import axios from "axios";

const API_URL = "http://localhost:3000"; // adapte si besoin

// Signup
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/authentification/signup`, userData);
  return response.data;
};

// Login
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/authentification/login`, { email, password });
  return response.data;
};

// Logout (juste nettoyage local ici)
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // If we get a 401 Unauthorized, clear auth data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload(); // Force refresh to update UI
    }
    return Promise.reject(error);
  }
);

const authService = {
  signup,
  login,
  logout,
};

export default authService;
