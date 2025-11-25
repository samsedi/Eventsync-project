import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Ticket, 
  Megaphone, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles,
  Search,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NavItem } from '../../types';

export const Sidebar: React.FC<{ mobileOpen: boolean, setMobileOpen: (o: boolean) => void }> = ({ mobileOpen, setMobileOpen }) => {
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  // Organizer Navigation
  const organizerItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Events', icon: CalendarDays, path: '/events' },
    { label: 'Ticketing', icon: Ticket, path: '/ticketing' },
    { label: 'Attendees', icon: Users, path: '/attendees' },
    { label: 'Marketing', icon: Megaphone, path: '/marketing' },
    { label: 'Reports', icon: BarChart3, path: '/analytics' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Buyer Navigation
  const buyerItems: NavItem[] = [
    { label: 'Browse Events', icon: Search, path: '/browse' },
    { label: 'My Tickets', icon: QrCode, path: '/my-tickets' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const navItems = currentUser?.role === 'buyer' ? buyerItems : organizerItems;

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo */}
        <Link to="/" className="h-16 flex items-center px-6 border-b border-gray-800 hover:bg-slate-800 transition-colors">
          <Sparkles className="h-8 w-8 text-primary-500 mr-2" />
          <span className="text-xl font-bold tracking-tight">EventSync</span>
        </Link>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-400 rounded-lg hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};