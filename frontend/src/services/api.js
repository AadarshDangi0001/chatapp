import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5050/api' });

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