import { Sun, Moon, MoreVertical, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import React, { useContext, createContext, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { useTheme } from '../context/themeContext.jsx';

const SidebarContext = createContext();

export default function Sidebar_ME({ children }) {
  const { user, handleLogout } = useAuth();

  const [expanded, setExpanded] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`h-screen flex items-center justify-start ${
        isDarkMode
          ? 'bg-slate-600'
          : 'bg-gradient-to-bl from-slate-100 via-blue-100 to-indigo-100'
      }`}
    >
      <aside
        className={`h-full
          ${expanded ? 'w-64' : 'w-18'}
          overflow-visible
          transition-all duration-500
          backdrop-blur-lg
          relative
        `}
      >
        <nav
          className={`relative h-full flex flex-col overflow-visible 
            ${
              isDarkMode
                ? 'text-zinc-200 bg-gradient-to-l to-stone-700 from-slate-500'
                : 'text-cyan-800 bg-gradient-to-b from-cyan-100 to-sky-200 border border-cyan-300/50 shadow-xl shadow-cyan-100/20'
            } 
            rounded-r-3xl`}
        >
          {/* Toggle Button and Logo */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? ' hover:bg-cyan-400 text-cyan-100'
                  : 'bg-cyan-100 hover:bg-sky-300 text-cyan-800 '
              }`}
              title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {expanded ? <X size={20} /> : <Menu size={20} />}
            </button>

            <img
              src={`${!user.companyId || user.role === 'superadmin' ? 'https://res.cloudinary.com/dqqnqq7xh/image/upload/v1760246574/logoipsum-332_lpbl8d.png' : user.companyId.logoUrl}`}
              alt="Logo"
              className={`overflow-hidden transition-all ${expanded ? 'w-38 ml-4' : 'w-0'}`}
            />
          </div>

          {/* Sidebar Items */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
           {/* Bottom User Panel */}
          <div className={`border-t flex p-3 relative ${isDarkMode ? 'border-cyan-600' : 'border-cyan-600/50'}`}>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || 'G'}&background=${isDarkMode ? '164e63' : 'cffafe'}&color=${isDarkMode ? 'ecfeff' : '0891b2'}&bold=true`}
              alt="User avatar"
              className={`w-10 h-10 rounded-md ring-1 ${isDarkMode ? 'ring-cyan-700' : 'ring-cyan-400'}`}
            />

            <div className={`flex items-center transition-all ${expanded ? 'w-52 ml-3' : 'w-0 ml-0 overflow-hidden'}`}>
              {/* User Info */}
              <div className="flex-1 min-w-0 mr-2">
                <h4 className={`font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'}`}>
                  {user?.name || 'Guest'}
                </h4>
                <span className={`text-xs whitespace-nowrap overflow-hidden text-ellipsis block ${isDarkMode ? 'text-cyan-300' : 'text-sky-600'}`}>
                  {user?.email}
                </span>
              </div>

              {/* 3-Dots Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className={`w-9 h-9 flex items-center justify-center rounded-md transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-cyan-700 hover:bg-cyan-600 border border-cyan-600'
                      : 'bg-cyan-200 hover:bg-sky-300 border border-cyan-400'
                  }`}
                  title="Menu"
                >
                  <MoreVertical size={18} className={isDarkMode ? 'text-cyan-200' : 'text-cyan-700'} />
                </button>

                {/* 3-Options Popup Menu */}
                {showUserMenu && (
                  <div
                    className={`absolute bottom-full right-0 mb-2 w-44 rounded-md shadow-lg border z-50
                      ${isDarkMode ? 'bg-cyan-800 border-cyan-700' : 'bg-cyan-50 border-cyan-200'}`}
                  >
                    <button
                      className={`w-full text-left px-4 py-2 transition rounded-t-md flex items-center gap-2 ${
                        isDarkMode ? 'text-cyan-200 hover:bg-cyan-700' : 'text-cyan-700 hover:bg-cyan-100'
                      }`}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <UserIcon size={16} /> Profile
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 transition flex items-center gap-2 ${
                        isDarkMode ? 'text-emerald-200 hover:bg-emerald-700' : 'text-cyan-700 hover:bg-cyan-100'
                      }`}
                      onClick={() => {
                        toggleTheme();
                        setShowUserMenu(false);
                      }}
                    >
                      {isDarkMode ? <><Sun size={16} className="text-yellow-400" /> Light Mode</> : <><Moon size={16} className="text-sky-600" /> Dark Mode</>}
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 transition rounded-b-md flex items-center gap-2 ${
                        isDarkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-100'
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
export function Sidebar_MEItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const { isDarkMode } = useTheme();

  const baseClasses =
    'relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all duration-200';

  const activeClasses = isDarkMode
    ? 'bg-cyan-700 text-cyan-50 shadow-inner ring-1 ring-cyan-600'
    : 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-200/50';

  const inactiveClasses = isDarkMode
    ? 'text-cyan-100 hover:bg-cyan-700/50 hover:text-cyan-100'
    : 'text-cyan-700 hover:bg-cyan-100 hover:text-sky-800';

  return (
    <li onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      {active && (
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full ${
            isDarkMode ? 'bg-gradient-to-b from-sky-400 via-cyan-400 to-blue-400' : 'bg-white'
          }`}
        />
      )}

      <span className="text-xl">{icon}</span>

      {expanded && <span className="ml-3">{text}</span>}

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-yellow-400 ring-2 ${
            isDarkMode ? 'ring-cyan-800' : 'ring-cyan-50'
          }`}
        />
      )}
    </li>
  );
}
