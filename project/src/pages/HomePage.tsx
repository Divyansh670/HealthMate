import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Gift, BarChart3, Menu, X } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import HealthCardForm from '../components/HealthCardForm';
import ActivityLogger from '../components/ActivityLogger';
import RewardsStore from '../components/RewardsStore';

const HomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load user points from localStorage
    const savedPoints = localStorage.getItem('healthmate_points');
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints, 10));
    }
  }, []);

  const updatePoints = (newPoints: number) => {
    setUserPoints(newPoints);
    localStorage.setItem('healthmate_points', newPoints.toString());
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3, color: 'text-purple-600' },
    { name: 'Health Card', path: '/health-card', icon: Shield, color: 'text-blue-600' },
    { name: 'Activities', path: '/activities', icon: Heart, color: 'text-green-600' },
    { name: 'Rewards', path: '/rewards', icon: Gift, color: 'text-orange-600' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                HealthMate
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    currentPath === item.path
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              ))}
            </nav>

            {/* Points Display */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full font-semibold"
              >
                {userPoints} Points
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-2 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${
                      currentPath === item.path
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
                <div className="pt-2 border-t">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-lg font-semibold text-center">
                    {userPoints} Points
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard userPoints={userPoints} />} />
            <Route path="/health-card" element={<HealthCardForm />} />
            <Route path="/activities" element={<ActivityLogger updatePoints={updatePoints} />} />
            <Route path="/rewards" element={<RewardsStore userPoints={userPoints} updatePoints={updatePoints} />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default HomePage;