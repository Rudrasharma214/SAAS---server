import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react"; // Optional icon

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 text-center">
      <div className="bg-gray-800/50 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700 animate-fadeIn">
        <ShieldAlert className="mx-auto mb-4 text-red-500" size={60} />
        <h1 className="text-4xl font-bold mb-3">Unauthorized Access</h1>
        <p className="text-gray-400 mb-8">
          You don’t have permission to view this page. Please check your account role or log in again.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-lg font-semibold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
