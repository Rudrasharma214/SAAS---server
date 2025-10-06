import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/themeContext";

const Navbar = ({ title = "Dashboard" }) => {
  const { user, handleLogout } = useAuth();
  const { current: theme, toggleTheme, isDarkMode } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full flex justify-center items-center py-4 ${
        isDarkMode ? "bg-zinc-950/90" : "bg-gray-100/90"
      }`}
    >
      <nav
        className={`
          w-[95vw] mr-0.5 h-16 px-6 flex items-center justify-between
          rounded-2xl border
          ${isDarkMode
            ? "bg-zinc-900/70 border-zinc-700 "
            : "bg-white/60 border-gray-300 "}
          backdrop-blur-xl transition-all duration-300 relative z-10
        `}
      >
        {/* Left Side - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://img.logoipsum.com/243.svg"
              alt="Company Logo"
              className="w-8 h-8"
            />
            <span className={`text-xl font-bold ${theme.textPrimary}`}>
              Company
            </span>
          </div>

          {/* Divider */}
          <div
            className={`w-px h-8 ${
              isDarkMode ? "bg-zinc-700" : "bg-gray-300"
            }`}
          ></div>

          {/* Page Title */}
          <h1 className={`text-lg font-semibold ${theme.textPrimary}`}>
            {title}
          </h1>
        </div>

        {/* Right Side - User Info and Controls */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={`text-sm font-medium ${theme.textPrimary}`}>
                {user?.name || "Guest User"}
              </p>
              <p className={`text-xs ${theme.textSecondary}`}>
                {user?.email || "guest@example.com"}
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
                  ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
              }
            `}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-indigo-600" />
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
                    ? "border-zinc-700 hover:border-zinc-600"
                    : "border-gray-300 hover:border-gray-400"
                }
                ${showProfileMenu ? "ring-2 ring-indigo-500" : ""}
              `}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || "G"
                }&background=${isDarkMode ? "27272a" : "e5e7eb"}&color=${
                  isDarkMode ? "f4f4f5" : "374151"
                }&bold=true`}
                alt="User Avatar"
                className="w-full h-full rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div
                className={`
                  absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg border z-50
                  ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"}
                  backdrop-blur-lg
                `}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    isDarkMode ? "border-zinc-700" : "border-gray-200"
                  }`}
                >
                  <p className={`font-medium ${theme.textPrimary}`}>
                    {user?.name || "Guest User"}
                  </p>
                  <p className={`text-xs ${theme.textSecondary}`}>
                    {user?.email || "guest@example.com"}
                  </p>
                </div>

                <div className="py-2">
                  <button
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? "text-zinc-200 hover:bg-zinc-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={16} />
                    View Profile
                  </button>

                  <button
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                      isDarkMode
                        ? "text-red-400 hover:bg-red-900/20"
                        : "text-red-600 hover:bg-red-50"
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
