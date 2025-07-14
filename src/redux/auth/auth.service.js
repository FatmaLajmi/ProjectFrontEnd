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

const authService = {
  signup,
  login,
  logout,
};

export default authService;
