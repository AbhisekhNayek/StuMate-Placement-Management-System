import axios from 'axios';


const API_URL = import.meta.env.BACKEND_API_URL;

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem('token', response.data.token);
};

const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    await axios.get(`${API_URL}/check-auth`, {
      headers: { 'x-auth-token': token },
    });
  }
};

const logout = async () => {
  localStorage.removeItem('token');
};

export default {
  login,
  checkAuth,
  logout,
};
