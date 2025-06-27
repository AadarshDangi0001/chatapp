import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT': return { ...state, user: null, isAuthenticated: false };
    default: return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null, 
    isAuthenticated: false 
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getMe().then(res => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      }).catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = async (credentials) => {
    const res = await authAPI.login(credentials);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
    return res.data;
  };

  const signup = async (userData) => {
    const res = await authAPI.signup(userData);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);