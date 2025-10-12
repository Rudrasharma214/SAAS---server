import React from 'react';
import { Monitor, Tablet, Smartphone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeviceNotSupported = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="relative inline-flex">
            <Smartphone className="text-red-400 w-16 h-16" />
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Device Not Supported
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          This dashboard is optimized for larger screens. Please access it from a laptop or tablet for the best experience.
        </p>

        {/* Supported Devices */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Supported Devices:</h3>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <Monitor className="text-indigo-600 w-8 h-8 mb-1" />
              <span className="text-xs text-gray-600">Desktop</span>
            </div>
            <div className="flex flex-col items-center">
              <Tablet className="text-indigo-600 w-8 h-8 mb-1" />
              <span className="text-xs text-gray-600">Tablet</span>
            </div>
          </div>
        </div>

        {/* Minimum Requirements */}
        <div className="bg-gray-50 rounded-lg p-3 mb-6">
          <p className="text-xs text-gray-600">
            <strong>Minimum screen width:</strong> 768px
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        {/* Alternative Access */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need mobile access? Contact support for our mobile app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceNotSupported;