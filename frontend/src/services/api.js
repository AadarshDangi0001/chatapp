import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE; 

const API = axios.create({ baseURL: API_BASE });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  signup: (data) => API.post('/auth/signup', data),
  getMe: () => API.get('/auth/me')
};

export const chatAPI = {
  getUsers: () => API.get('/chat/users'),
  getMessages: (userId) => API.get(`/chat/messages/${userId}`),
  getGroupMessages: () => API.get('/chat/group-messages')
};