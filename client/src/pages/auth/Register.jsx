import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authServices';
import Loader from '../../components/Loader';
import { ShieldAlert } from 'lucide-react';

const Register = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!formData.name.trim()) return (setError('Name is required'), false);
    if (!formData.email) return (setError('Email is required'), false);
    if (!isValidEmail(formData.email))
      return (setError('Please enter a valid email address'), false);
    if (!formData.password) return (setError('Password is required'), false);
    if (formData.password.length < 6)
      return (setError('Password must be at least 6 characters long'), false);
    if (formData.password !== formData.confirmPassword)
      return (setError('Passwords do not match'), false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');

      const response = await register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
      });

      if (response.success !== false) {
        setSuccess('Admin registered successfully! Please login with your credentials.');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) setError(err.response.data.message);
      else if (err.message) setError(err.message);
      else setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-900 px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Admin Account</h1>
          <p className="text-gray-500">Register as a company owner</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${
                error && !formData.name ? 'border-red-500 ring-red-200' : 'border-gray-300'
              }`}
              required
            />
          </div>

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
              placeholder="Enter your password (min 6 characters)"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${
                error && !formData.password ? 'border-red-500 ring-red-200' : 'border-gray-300'
              }`}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${
                error && formData.password !== formData.confirmPassword
                  ? 'border-red-500 ring-red-200'
                  : 'border-gray-300'
              }`}
              required
            />
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-2 text-sm">
              <ShieldAlert size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-sm">
              ✅ {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </>
            ) : (
              'Create Admin Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2 text-sm text-gray-500">
          <p>
            Already have an account?
            <Link to="/login" className="text-indigo-500 font-semibold ml-1 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm">
          Note: This will create a Company Owner account with administrative privileges.
        </div>
      </div>
    </div>
  );
};

export default Register;
