import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ChatArea from './components/Chat/ChatArea';
import Navbar from './components/Layout/Navbar';

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // <-- Add this
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="h-screen bg-black">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="h-[calc(100vh-80px)]">
          <ChatArea isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
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