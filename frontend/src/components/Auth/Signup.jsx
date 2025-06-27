import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Signup = ({ onToggle }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none pr-12"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-400 mt-6">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-green-500 hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Signup;