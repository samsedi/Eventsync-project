import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Moon, Sun, Bell, Search, Menu, MessageSquare } from 'lucide-react';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setMobileOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Left: Mobile Menu Trigger & Search */}
      <div className="flex items-center flex-1">
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 mr-4"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search events, attendees..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button 
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
          <MessageSquare className="h-5 w-5" />
        </button>

        <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
        </button>

        <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2"></div>

        <div className="flex items-center">
          <div className="flex flex-col items-end mr-3 hidden md:flex">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.displayName}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role}</span>
          </div>
          <img 
            className="h-9 w-9 rounded-full ring-2 ring-gray-100 dark:ring-gray-700 object-cover"
            src={currentUser?.photoURL || "https://ui-avatars.com/api/?name=Eleanor+Vance&background=random"}
            alt="User profile"
          />
        </div>
      </div>
    </header>
  );
};
