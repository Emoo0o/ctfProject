import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Menu, User, LogOut, X, BarChart2 } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const navLinks = [
    { to: '/', label: 'Home', icon: <Shield size={18} /> },
    { to: '/map', label: 'Game Map', icon: <BarChart2 size={18} /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <BarChart2 size={18} /> },
  ];
  
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      className="bg-cyber-black bg-opacity-80 backdrop-blur-md border-b border-cyber-blue-200 py-3 px-4 fixed top-0 left-0 right-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Shield size={24} className="text-cyber-blue-100" />
            <span className="font-cyber text-xl bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
              CyberQuest
            </span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div key={link.to} variants={itemVariants}>
              <Link 
                to={link.to}
                className={`flex items-center space-x-1 text-sm font-future ${
                  location.pathname === link.to 
                    ? 'text-cyber-blue-100 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </motion.div>
          ))}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <motion.div variants={itemVariants}>
                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <User size={18} />
                  <span className="text-sm font-future">{user?.username}</span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <motion.div variants={itemVariants}>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/register">
                  <Button variant="primary" size="sm" glowing>Register</Button>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          variants={itemVariants}
        >
          <Menu size={24} />
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 z-50 bg-cyber-black`}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Shield size={24} className="text-cyber-blue-100" />
              <span className="font-cyber text-xl">CyberQuest</span>
            </Link>
            <button 
              className="text-white"
              onClick={toggleMenu}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 p-2 rounded ${
                  location.pathname === link.to 
                    ? 'bg-cyber-gray text-cyber-blue-100'
                    : 'text-gray-300'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-cyber-gray">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link to="/profile" className="flex items-center justify-between p-2 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <User size={18} />
                    <span>{user?.username}</span>
                  </div>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  fullWidth
                  className="flex items-center justify-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" fullWidth>Login</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="primary" glowing fullWidth>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;