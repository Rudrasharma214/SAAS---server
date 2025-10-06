import { Sun, Moon, MoreVertical, Menu, X } from "lucide-react";
import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/themeContext";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true); // Default open
  const { user, handleLogout } = useAuth();
  const { current: theme, toggleTheme, isDarkMode } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`h-screen flex items-center justify-start p-4 ${isDarkMode ? "bg-zinc-950/90" : "bg-gray-100/90"}`}>
      <aside
        className={`
          h-[95vh]
          ${expanded ? "w-64" : "w-20"}
          rounded-2xl
          ${isDarkMode ? "shadow-[0_0_25px_rgba(0,0,0,0.5)]" : "shadow-[0_0_25px_rgba(0,0,0,0.1)]"}
          ${theme.border}
          overflow-visible
          transition-all duration-500
          backdrop-blur-lg
          relative
        `}
      >
        <nav className={`relative h-full flex flex-col overflow-visible ${theme.text} ${theme.sidebarBg} ${theme.glowEffects} rounded-2xl`}>
          
          {/* 🔘 Toggle Button and Logo */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-100"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              title={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? <X size={20} /> : <Menu size={20} />}
            </button>

            <img
              src="https://img.logoipsum.com/243.svg"
              alt="Logo"
              className={`overflow-hidden transition-all ${expanded ? "w-28 ml-2" : "w-0"}`}
            />
          </div>

          {/* Sidebar Items */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          {/* Bottom User Panel */}
          <div className={`${theme.border} border-t flex p-3 ${isDarkMode ? "bg-zinc-950/50" : "bg-gray-50/50"} relative`}>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "G"}&background=${isDarkMode ? "27272a" : "e5e7eb"}&color=${isDarkMode ? "f4f4f5" : "374151"}&bold=true`}
              alt="User avatar"
              className={`w-10 h-10 rounded-md ring-1 ${isDarkMode ? "ring-zinc-800" : "ring-gray-300"}`}
            />

            <div className={`flex items-center transition-all ${expanded ? "w-52 ml-3" : "ml-3"}`}>
              {expanded && (
                <div className="flex-1 min-w-0 mr-2">
                  <h4 className={`font-semibold ${theme.textPrimary} whitespace-nowrap overflow-hidden text-ellipsis`}>
                    {user?.name || "Guest"}
                  </h4>
                  <span className={`text-xs ${theme.textSecondary} whitespace-nowrap overflow-hidden text-ellipsis block`}>
                    {user?.email}
                  </span>
                </div>
              )}

              {expanded && (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu((prev) => !prev)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md ${
                      isDarkMode
                        ? "bg-zinc-900 hover:bg-zinc-800 shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-zinc-700"
                        : "bg-gray-200 hover:bg-gray-300 shadow-[0_0_10px_rgba(99,102,241,0.2)] border border-gray-300"
                    } transition-all duration-300`}
                    title="Menu"
                  >
                    <MoreVertical size={18} className={theme.text} />
                  </button>

                  {/* Popup Menu */}
                  {showUserMenu && (
                    <div
                      className={`absolute bottom-full right-0 mb-2 w-44 rounded-md shadow-lg border z-50
                      ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"}`}
                    >
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white transition rounded-t-md flex items-center gap-2 ${
                          isDarkMode ? "text-zinc-200" : "text-gray-700"
                        }`}
                      >
                        👤 Profile
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white transition flex items-center gap-2 ${
                          isDarkMode ? "text-zinc-200" : "text-gray-700"
                        }`}
                        onClick={() => {
                          toggleTheme();
                          setShowUserMenu(false);
                        }}
                      >
                        {isDarkMode ? (
                          <>
                            <Sun size={16} className="text-yellow-400" /> Light Mode
                          </>
                        ) : (
                          <>
                            <Moon size={16} className="text-indigo-600" /> Dark Mode
                          </>
                        )}
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition rounded-b-md flex items-center gap-2 ${
                          isDarkMode ? "text-zinc-200" : "text-gray-700"
                        }`}
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

// Sidebar Item Component
export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const { current: theme, isDarkMode } = useTheme();

  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer transition-colors
        ${active
          ? `${theme.activeBg} ${theme.textPrimary} shadow-inner ring-1 ${
              isDarkMode ? "ring-zinc-700" : "ring-blue-200"
            }`
          : `${theme.hoverBg} ${theme.text}`}
      `}
    >
      {/* Active bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-sky-400" />
      )}

      {/* Icon */}
      <span className={theme.text}>{icon}</span>

      {/* Text */}
      {expanded && <span className="ml-3">{text}</span>}

      {/* Alert Dot */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400/90 ring-2 ${
            isDarkMode ? "ring-zinc-950" : "ring-white"
          }`}
        />
      )}
    </li>
  );
}

