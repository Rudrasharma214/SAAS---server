import { useState } from 'react';
import { useTheme } from '../../context/themeContext';

const UserDashboardContent = () => {
  const { isDarkMode } = useTheme();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);

  const handlePunchToggle = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    setIsPunchedIn(!isPunchedIn);
    setPunchTime(currentTime);
  };

  return (
    <div className={`h-full w-full flex flex-col overflow-hidden transition-all ${
      isDarkMode
       ? 'bg-gradient-to-r to-stone-800 from-slate-600'
          : 'bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100'
    }`}>
      {/* Navbar Component */}
      <nav className={`w-full px-6 py-4 border-b backdrop-blur-lg ${
        isDarkMode 
          ? 'bg-transparent shadow-lg shadow-cyan-900/20' 
          : 'bg-transparent shadow-xl shadow-cyan-100/30'
      } transition-all`}>
        <div className="flex items-center justify-between">
          {/* Left Section - Dashboard Title */}
          <div className="flex items-center gap-4">
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-cyan-100' : 'text-cyan-900'
            }`}>
              User Dashboard
            </h2>
          </div>

          {/* Right Section - Punch In/Out Toggle */}
          <div className="flex items-center gap-4">
            {punchTime && (
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-cyan-300' : 'text-sky-700'
              }`}>
                {isPunchedIn ? 'Punched In' : 'Punched Out'} at {punchTime}
              </span>
            )}
            
            <button
              onClick={handlePunchToggle}
              className={`relative inline-flex items-center h-10 rounded-full w-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isPunchedIn
                  ? isDarkMode
                    ? 'bg-cyan-600 focus:ring-cyan-500 shadow-lg shadow-cyan-500/50'
                    : 'bg-gradient-to-r from-cyan-500 to-sky-600 focus:ring-sky-500 shadow-lg shadow-cyan-400/50'
                  : isDarkMode 
                    ? 'bg-cyan-800 focus:ring-cyan-700 border border-cyan-700' 
                    : 'bg-cyan-200 focus:ring-cyan-400 border border-cyan-300'
              }`}
              aria-label="Toggle punch in/out"
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full shadow-lg transition-transform ${
                  isPunchedIn 
                    ? isDarkMode
                      ? 'translate-x-11 bg-cyan-50 ring-2 ring-cyan-400'
                      : 'translate-x-11 bg-white ring-2 ring-cyan-300'
                    : 'translate-x-1 bg-white'
                }`}
              />
              <span className={`absolute text-xs font-bold ${
                isPunchedIn 
                  ? isDarkMode
                    ? 'left-2 text-cyan-100'
                    : 'left-2 text-white'
                  : isDarkMode
                    ? 'right-2 text-cyan-300'
                    : 'right-2 text-cyan-700'
              }`}>
                {isPunchedIn ? 'IN' : 'OUT'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <h1 className={`text-2xl ${
          isDarkMode ? 'text-cyan-100' : 'text-cyan-900'
        } font-bold mb-4`}>
          Welcome Back
        </h1>
        
        {/* Status Card */}
        <div className={`p-6 rounded-xl backdrop-blur-lg transition-all ${
          isDarkMode 
            ? 'bg-gradient-to-bl from-stone-700/80 to-slate-600/80 border border-cyan-700/50 shadow-lg shadow-cyan-900/20' 
            : 'bg-gradient-to-br from-cyan-50/80 to-sky-100/80 border border-cyan-200 shadow-xl shadow-cyan-100/30'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-cyan-100' : 'text-cyan-900'
          }`}>
            Attendance Status
          </h3>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              isPunchedIn 
                ? isDarkMode
                  ? 'bg-cyan-400 ring-4 ring-cyan-400/30'
                  : 'bg-gradient-to-r from-cyan-500 to-sky-600 ring-4 ring-cyan-300/40'
                : isDarkMode
                  ? 'bg-red-400 ring-4 ring-red-400/30'
                  : 'bg-red-500 ring-4 ring-red-300/40'
            }`} />
            <p className={`font-medium ${
              isDarkMode ? 'text-cyan-300' : 'text-sky-700'
            }`}>
              {isPunchedIn 
                ? 'You are currently clocked in' 
                : 'You are currently clocked out'}
            </p>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${
          isDarkMode 
            ? 'bg-cyan-900/20 border border-cyan-800/50' 
            : 'bg-cyan-50/50 border border-cyan-200/50'
        }`}>
          <p className={isDarkMode ? 'text-cyan-400' : 'text-sky-600'}>
            Dashboard functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardContent;
