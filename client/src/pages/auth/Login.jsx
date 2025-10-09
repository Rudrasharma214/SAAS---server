import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { handleLogin, isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('Login Navigation Check:', {
      isAuthenticated,
      user,
      loading,
      userRole: user?.role,
      isRegistered: user?.isRegistered,
    });

    if (isAuthenticated && user && !loading) {
      if (user.role === 'company_owner') {
        if (user.isRegistered === false) {
          navigate('/register-company');
        } else {
          navigate('/admin/dashboard');
        }
      } else if (user.role === 'super_admin') {
        navigate('/superadmin/dashboard');
      } else if (user.role === 'manager') {
        navigate('/manager/dashboard');
      } else if (user.role === 'user') {
        navigate('/user/dashboard');
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) {
      setError('');
      toast.dismiss(); // Dismiss any existing error toasts when user starts typing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      setError('Please fill in all fields');
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      setError('Please enter a valid email address');
      return;
    }

    const loadingToast = toast.loading('Signing you in...');

    try {
      setIsSubmitting(true);
      setError('');
      const res = await handleLogin(formData);
      toast.success('Login successful! Welcome back.', { id: loadingToast });
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage, { id: loadingToast });
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-teal-700 to-purple-900 px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <div className="absolute top-0 left-0 right-0 h-1from-cyan-900 via-teal-700 to-purple-900 rounded-t-xl"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${
                error && !formData.email ? 'border-red-500 ring-red-200' : 'border-gray-300'
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${
                error && !formData.password ? 'border-red-500 ring-red-200' : 'border-gray-300'
              }`}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-2 text-sm">
              <ShieldAlert size={16} /> {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.email || !formData.password}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2 text-sm text-gray-500">
          <p>
            Don't have an account?
            <Link to="/register" className="text-indigo-500 font-semibold ml-1 hover:underline">
              Register here
            </Link>
          </p>
          <Link to="/forgot-password" className="text-indigo-500 font-semibold hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
