import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ChatArea from './components/Chat/ChatArea';
import Navbar from './components/Layout/Navbar';

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="h-screen bg-black">
        <Navbar />
        <div className="h-[calc(100vh-80px)]">
          <ChatArea />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {isLogin ? (
        <Login onToggle={() => setIsLogin(false)} />
      ) : (
        <Signup onToggle={() => setIsLogin(true)} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

export default App;