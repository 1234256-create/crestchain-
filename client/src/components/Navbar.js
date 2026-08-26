import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  BarChart3,
  Coins,
  Trophy,
  User,
  Settings,
  LogOut,
  Shield,
  FileText,
  LogIn,
  Mail
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleJoinNow = () => {
    try {
      const ref = localStorage.getItem('landingReferralCode');
      navigate(ref ? `/join-notice?ref=${encodeURIComponent(ref)}` : '/join-notice');
    } catch {
      navigate('/join-notice');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const logoPath = '/images/logo.svg';

  const [canContribute, setCanContribute] = useState(false);

  React.useEffect(() => {
    const checkContributionStatus = async () => {
      try {
        const [activeRes, publicRes, roundRes] = await Promise.all([
          axios.get('/api/settings/contributionActive'),
          axios.get('/api/settings/publicContributionsEnabled'),
          axios.get('/api/settings/contributionRound')
        ]);

        const isActive = activeRes.data?.data?.value ?? true;
        const isPublic = publicRes.data?.data?.value === true;
        const round = roundRes.data?.data?.value;
        const nowMs = Date.now();
        const hasRound = Boolean(round && round.startTime && round.endTime && nowMs <= new Date(round.endTime).getTime());

        setCanContribute(isActive && (isPublic || hasRound));
      } catch (error) {
        // Silently fail, default to false
      }
    };

    checkContributionStatus();

    // Listen for updates via custom event if any
    const handleUpdate = () => checkContributionStatus();
    window.addEventListener('datastore:update', handleUpdate);
    return () => window.removeEventListener('datastore:update', handleUpdate);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3, protected: true },
    { name: 'Voting', path: '/voting', icon: BarChart3, protected: true },
    { name: 'Contribute', path: '/contribute', icon: Coins },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy, protected: true },
    { name: 'Referral', path: '/referral', icon: User, protected: true },
    { name: 'Contact Us', path: '/contact', icon: Mail },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.name === 'Contribute') return canContribute;
    if (item.name === 'Home' && !user) return false;
    if (item.name === 'Contact Us' && !user) return false;
    if (item.protected && !user) return false;
    return true;
  });



  const adminItems = [
    { name: 'Admin Panel', path: '/admin', icon: Shield },
    { name: 'User Management', path: '/admin/users', icon: User },
    { name: 'Vote Management', path: '/admin/votes', icon: BarChart3 },
    { name: 'Contribution Management', path: '/admin/contributions', icon: Coins },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#02141a]/85 backdrop-blur-md border-b border-cyan-500/20">
      <div className="w-full pl-0 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex items-center justify-between h-16 overflow-visible flex-nowrap">
          <div className="flex items-center flex-shrink-0 pl-4 sm:pl-6">
            <Link to="/" className="flex items-center gap-2.5 py-1 group">
              <img
                src="/images/logo.png"
                alt="Veritas Logo"
                className="h-10 sm:h-11 w-auto max-h-11 object-contain group-hover:scale-105 transition-transform duration-200 py-0.5"
              />
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                Veritas
              </span>
            </Link>
          </div>





          <div className="hidden md:flex flex-1 items-center justify-center space-x-8 min-w-0">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;

              // For protected routes when user is not logged in, redirect to login
              if (item.protected && !user) {
                return (
                  <Link
                    key={item.name}
                    to="/login"
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-cyan-950/50"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              }

              const isContact = item.name === 'Contact Us';
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(item.path)
                    ? isContact
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/20 font-semibold'
                      : 'bg-emerald-500/20 text-white border border-emerald-500/30 shadow-sm shadow-emerald-500/20 font-bold'
                    : isContact
                      ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 font-semibold'
                      : 'text-white hover:text-emerald-200 hover:bg-emerald-950/50 font-medium'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isContact ? 'text-emerald-400' : 'text-white'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#041c24]/90 border border-emerald-500/30 hover:bg-[#07323e] transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full flex items-center justify-center shadow-sm shadow-emerald-500/30">
                    <span className="text-white text-sm font-medium">
                      {(user.fullName || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim()).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white">{user.fullName || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim()}</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#031c23]/95 backdrop-blur-md rounded-lg border border-cyan-500/30 shadow-xl"
                    >
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:text-cyan-200 hover:bg-cyan-950/50 transition-all duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 text-white" />
                          <span>Profile</span>
                        </Link>

                        {user.role === 'admin' && (
                          <>
                            <div className="border-t border-cyan-500/20 my-2"></div>
                            {adminItems.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:text-cyan-200 hover:bg-cyan-950/50 transition-all duration-200"
                                  onClick={() => setIsProfileOpen(false)}
                                >
                                  <Icon className="w-4 h-4 text-white" />
                                  <span>{item.name}</span>
                                </Link>
                              );
                            })}
                          </>
                        )}

                        <div className="border-t border-cyan-500/20 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/"
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm ${
                    isActive('/')
                      ? 'bg-emerald-500/15 text-white border border-emerald-500/25 shadow-sm font-bold'
                      : 'text-white hover:text-emerald-200 bg-white/10 hover:bg-emerald-950/50 font-medium'
                  }`}
                >
                  <Home className="w-4 h-4 text-white" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/contact"
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm ${
                    isActive('/contact')
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shadow-sm font-semibold'
                      : 'text-emerald-400 hover:text-emerald-300 bg-white/10 hover:bg-emerald-950/50 font-semibold'
                  }`}
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  to="/login"
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm ${
                    isActive('/login')
                      ? 'bg-emerald-500/15 text-white border border-emerald-500/25 shadow-sm font-bold'
                      : 'text-white hover:text-emerald-200 bg-white/10 hover:bg-emerald-950/50 font-medium'
                  }`}
                >
                  <LogIn className="w-4 h-4 text-white" />
                  <span>Login</span>
                </Link>
                <button
                  onClick={handleJoinNow}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-extrabold hover:from-emerald-400 hover:to-teal-300 transition-all duration-200 shadow-lg shadow-emerald-950/50 text-sm"
                >
                  Request a refund
                </button>
              </div>
            )}
          </div>




          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#02141a]/95 backdrop-blur-md border-t border-cyan-500/20 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 pb-6 space-y-2">
              {!user && (
                <>
                  <Link
                    to="/"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive('/')
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-cyan-950/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/contact"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive('/contact')
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-cyan-950/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Us</span>
                  </Link>
                </>
              )}

              {filteredNavItems.map((item) => {

                const Icon = item.icon;

                // For protected routes when user is not logged in, redirect to login
                if (item.protected && !user) {
                  return (
                    <Link
                      key={item.name}
                      to="/login"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-teal-900/30"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(item.path)
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-teal-900/30'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {user && user.role === 'admin' && (
                <>
                  <div className="border-t border-teal-500/20 my-2"></div>
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-teal-900/30 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </>
              )}

              {user ? (
                <>
                  <div className="border-t border-teal-500/20 my-2"></div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-teal-900/30 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-teal-500/20 my-2"></div>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-teal-900/30 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Login</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleJoinNow();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 px-3 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:from-emerald-500 hover:to-teal-400 transition-all duration-200 w-full"
                  >

                    <span>Request a refund</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
