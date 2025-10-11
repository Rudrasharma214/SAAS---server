import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { handleLogin, isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      toast.dismiss();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-slate-100 via-blue-100 to-indigo-100 px-4 py-8">
      {/* Main Card */}
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-bl from-slate-100 via-blue-100 to-indigo-100 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            
              <img
              src="https://res.cloudinary.com/dqqnqq7xh/image/upload/v1760022122/logoipsum-398_lzskbl.png"
              alt="Logo"
              className={`overflow-hidden h-8 w-38 transition-all`}
            />

          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in with email</h1>
            <p className="text-gray-600 text-sm">
              One Platform, Endless Possibilities
              <br />
              Emphasizes the unified nature of ERP systems.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={isSubmitting}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-100/80 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition disabled:opacity-50"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={isSubmitting}
                className="w-full pl-12 pr-12 py-3.5 bg-gray-100/80 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition disabled:opacity-50"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-700 hover:text-gray-900 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.email || !formData.password}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-gray-900 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
