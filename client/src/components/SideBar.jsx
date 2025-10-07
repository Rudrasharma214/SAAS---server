import { Sun, Moon, MoreVertical, Menu, X } from 'lucide-react';
import React, { useContext, createContext, useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useTheme } from '../context/themeContext';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true); // Default open
  const {  isDarkMode } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
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
      className={`h-screen flex items-center justify-start p-4 ${isDarkMode ? 'bg-gradient-to-l  to-stone-800 from-slate-700' : 'bg-gradient-to-l to-indigo-400 from-blue-400'}`}
    >
      <aside
        className={`
          h-[95vh]
          ${expanded ? 'w-64' : 'w-18'}
          rounded-2xl
          overflow-visible
          transition-all duration-500
          backdrop-blur-lg
          relative
        `}
      >
        <nav
          className={`relative h-full flex flex-col overflow-visible 
            ${isDarkMode ? 'text-zinc-200 bg-gradient-to-l to-stone-700 from-slate-600' : 'text-gray-800 bg-gradient-to-l to-indigo-400 from-blue-300'} 
             rounded-2xl`}
        >
          {/* Toggle Button and Logo */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-slate-900 hover:bg-slate-800 text-zinc-100'
                  : 'bg-indigo-200 hover:bg-indigo-300 text-gray-700'
              }`}
              title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {expanded ? <X size={20} /> : <Menu size={20} />}
            </button>

            <img
              src="https://img.logoipsum.com/243.svg"
              alt="Logo"
              className={`overflow-hidden transition-all ${expanded ? 'w-28 ml-2' : 'w-0'}`}
            />
          </div>

          {/* Sidebar Items */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
          
        </nav>
      </aside>
    </div>
  );
}

// Sidebar Item Component
export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const { isDarkMode } = useTheme();

  const baseClasses = "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors";

  const activeClasses = isDarkMode
    ? "bg-slate-700 text-zinc-50 shadow-inner ring-1 ring-zinc-700"
    : "bg-indigo-200 text-gray-900 shadow-inner ring-1 ring-blue-200";

  const inactiveClasses = isDarkMode
    ? "text-zinc-400 hover:bg-slate-600  hover:text-zinc-200"
    : "text-gray-600 hover:bg-indigo-200";

  return (
    <li
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-sky-400" />
      )}

      <span className="text-xl">{icon}</span>

      {expanded && <span className="ml-3">{text}</span>}

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400/90 ring-2 ${
            isDarkMode ? "ring-zinc-900" : "ring-white"
          }`}
        />
      )}
    </li>
  );
}
