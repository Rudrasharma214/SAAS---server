import {
  Sun,
  Moon,
  MoreVertical,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useTheme } from "../context/themeContext.jsx";

const SidebarContext = createContext();

export default function Sidebar_ME({ children }) {
  const { user, handleLogout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [expanded, setExpanded] = useState(false); // Default collapsed
  const [locked, setLocked] = useState(false); // Lock toggle
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover open/close logic
  const handleMouseEnter = () => {
    if (!locked) setExpanded(true);
  };
  const handleMouseLeave = () => {
    if (!locked) setExpanded(false);
  };

  return (
    <div
      className={`h-screen flex items-center justify-start ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900"
          : "bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-yellow-50/30"
      }`}
    >
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`h-full transition-all duration-500 backdrop-blur-lg relative ${
          expanded ? "w-64" : "w-18"
        }`}
      >
        <nav
          className={`relative h-full flex flex-col overflow-visible rounded-r-4xl border ${
            isDarkMode
              ? "text-gray-100 bg-gradient-to-b from-slate-800 to-gray-900 border-gray-700"
              : "text-gray-800 bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-200/50 border-gray-100"
          }`}
        >
          {/* Toggle + Lock + Logo */}
          <div className="p-4 pb-2 flex justify-between items-center relative">
            {/* Lock Button */}
            <button
              onClick={() => setLocked((prev) => !prev)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? locked
                    ? "bg-gray-700 text-yellow-400"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  : locked
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 border border-gray-200 shadow-sm"
              }`}
              title={locked ? "Unlock sidebar" : "Lock sidebar"}
            >
              {locked ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>

            <img
              src={`${
                !user.companyId || user.role === "superadmin"
                  ? "https://res.cloudinary.com/dqqnqq7xh/image/upload/v1760246574/logoipsum-332_lpbl8d.png"
                  : user.companyId.logoUrl
              }`}
              alt="Logo"
              className={`overflow-hidden transition-all ${expanded ? "w-38 ml-4" : "w-0"}`}
            />
          </div>

          {/* Sidebar Items */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          {/* Bottom User Panel */}
          <div
            className={`border-t flex p-3 relative ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "G"
              }&background=${isDarkMode ? "4b5563" : "f3f4f6"}&color=${
                isDarkMode ? "f3f4f6" : "374151"
              }&bold=true`}
              alt="User avatar"
              className={`w-10 h-10 rounded-lg ring-2 ${
                isDarkMode ? "ring-gray-700" : "ring-gray-200"
              }`}
            />

            <div
              className={`flex items-center transition-all ${
                expanded ? "w-52 ml-3" : "w-0 ml-0 overflow-hidden"
              }`}
            >
              <div className="flex-1 min-w-0 mr-2">
                <h4
                  className={`font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {user?.name || "Guest"}
                </h4>
                <span
                  className={`text-xs whitespace-nowrap overflow-hidden text-ellipsis block ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user?.email}
                </span>
              </div>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                      : "bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-200 shadow-sm"
                  }`}
                  title="Menu"
                >
                  <MoreVertical
                    size={18}
                    className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                  />
                </button>

                {showUserMenu && (
                  <div
                    className={`absolute bottom-full right-0 mb-2 w-44 rounded-xl shadow-xl border z-50 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <button
                      className={`w-full text-left px-4 py-2 transition rounded-t-xl flex items-center gap-2 ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <UserIcon size={16} /> Profile
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 transition flex items-center gap-2 ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-50"
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
                          <Moon size={16} className="text-gray-600" /> Dark Mode
                        </>
                      )}
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 transition rounded-b-xl flex items-center gap-2 ${
                        isDarkMode
                          ? "text-red-400 hover:bg-red-900/20"
                          : "text-red-600 hover:bg-red-50"
                      }`}
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

// Sidebar Item Component
export function Sidebar_MEItem({ icon, text, active, alert, onClick, gradientType = "blue" }) {
  const { expanded } = useContext(SidebarContext);
  const { isDarkMode } = useTheme();

  const baseClasses =
    "relative flex items-center py-2.5 px-3 my-1 font-medium rounded-lg cursor-pointer transition-all duration-300";

  const gradients = {
    blue: "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600",
    purple: "bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600",
    green: "bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600",
    orange: "bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600",
    pink: "bg-gradient-to-r from-pink-500 via-rose-600 to-red-600",
    cyan: "bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600",
    violet: "bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-600",
    lime: "bg-gradient-to-r from-lime-500 via-green-600 to-emerald-600",
  };

  const activeClasses = isDarkMode
    ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-50 shadow-lg ring-1 ring-gray-600"
    : `${gradients[gradientType]} text-white shadow-lg`;

  const inactiveClasses = isDarkMode
    ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
    : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-800 hover:shadow-sm";

  return (
    <li onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      {active && (
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full ${
            isDarkMode
              ? "bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400"
              : gradients[gradientType]
          }`}
        />
      )}
      <span className="text-xl">{icon}</span>
      {expanded && <span className="ml-3">{text}</span>}

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full ${
            isDarkMode
              ? "bg-blue-400"
              : "bg-gradient-to-br from-red-500 to-pink-600"
          } ring-2 ${isDarkMode ? "ring-gray-800" : "ring-white"}`}
        />
      )}
    </li>
  );
}
