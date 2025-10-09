import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useTheme } from '../context/themeContext';

const Navbar = ({ title = 'Dashboard' }) => {
  const { user, handleLogout } = useAuth();
  const { toggleTheme, isDarkMode } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full h-16 flex justify-center items-center py-4 relative z-50 ${
        isDarkMode
          ? 'bg-gradient-to-r to-stone-800 from-slate-700'
          : 'bg-gradient-to-r from-slate-100 via-blue-100 to-indigo-100 backdrop-blur-xl'
      }`}
    >
      <nav
        className={`
          w-[95vw] mr-0.5 h-16 px-6 flex items-center justify-between 
          rounded-2xl transition-all duration-300 relative z-10
          `}
      >
        {/* Left Side - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center w-auto gap-2">
            <img
              src="https://res.cloudinary.com/dqqnqq7xh/image/upload/v1760022122/logoipsum-398_lzskbl.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Divider */}
          <div className={`w-px h-8 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'}`}></div>

          {/* Page Title */}
          <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
            {title}
          </h1>
        </div>

        {/* Right Side - User Info and Controls */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p
                className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}
              >
                {user?.name || 'Guest User'}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-indigo-600'}`}>
                {user?.email || 'guest@example.com'}
              </p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              border transition-all duration-300
              ${
                isDarkMode
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-indigo-400 shadow-lg shadow-indigo-200/50'
              }
            `}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-white" />
            )}
          </button>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-300
                ${
                  isDarkMode
                    ? 'border-zinc-700 hover:border-zinc-600'
                    : 'border-indigo-200 hover:border-indigo-300 shadow-md shadow-indigo-100/30'
                }
                ${showProfileMenu ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
              `}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || 'G'
                }&background=${isDarkMode ? '27272a' : '6366f1'}&color=${
                  isDarkMode ? 'f4f4f5' : 'ffffff'
                }&bold=true`}
                alt="User Avatar"
                className="w-full h-full rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div
                className={`
                  absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl border z-[9999]
                  ${
                    isDarkMode
                      ? 'bg-zinc-900 border-zinc-700'
                      : 'bg-white border-indigo-100 shadow-indigo-100/20'
                  }
                  backdrop-blur-lg
                `}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    isDarkMode ? 'border-zinc-700' : 'border-indigo-100'
                  }`}
                >
                  <p className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                    {user?.name || 'Guest User'}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-indigo-600'}`}>
                    {user?.email || 'guest@example.com'}
                  </p>
                </div>

                <div className="py-2">
                  <button
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? 'text-zinc-200 hover:bg-zinc-800'
                        : 'text-gray-700 hover:bg-indigo-50'
                    }`}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={16} />
                    View Profile
                  </button>

                  <button
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? 'text-red-400 hover:bg-red-900/20'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
