import { useAuth } from '../../context/AuthContext';
import { LogOut, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="text-green-500" size={24} />
          <h1 className="text-xl font-bold text-white">ChatApp</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, {user?.username}</span>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
