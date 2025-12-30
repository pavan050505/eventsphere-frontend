import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, User, Plus, LogOut, Settings } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { Modal } from './ui/Modal';
import logo from '../img/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Events', path: '/events' },
  ];



  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-27 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="EventSphere" className="h-20 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <button className="text-slate-500 hover:text-slate-700 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  
                  <Link to="/create-event">
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Event
                    </Button>
                  </Link>

                  <div className="relative ml-2" ref={dropdownRef}>
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2 focus:outline-none"
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold border-2 border-transparent hover:border-blue-200 transition-all overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span>{user.firstName?.[0]}{user.lastName?.[0]}</span>
                        )}
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-medium text-slate-900">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                        
                        <div className="py-1">
                          <Link 
                            to="/profile" 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => setShowDropdown(false)}
                          >
                            <User className="w-4 h-4" /> Profile
                          </Link>
                          <Link 
                            to="/create-event" 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => setShowDropdown(false)}
                          >
                            <Plus className="w-4 h-4" /> Create Event
                          </Link>
                        </div>

                        <div className="border-t border-slate-100 py-1">
                          <button 
                            onClick={() => setShowLogoutModal(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                          >
                            <LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              {user && (
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                 </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-500 hover:text-slate-700 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top-5 max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Account
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/create-event"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Create Event
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full justify-center">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-transparent" onClick={handleLogout}>
              Logout
            </Button>
          </>
        }
      >
        <p className="text-slate-600">
          Are you sure you want to log out? You will be redirected to the home page.
        </p>
      </Modal>
    </>
  );
};
