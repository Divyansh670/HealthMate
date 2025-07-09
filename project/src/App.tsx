import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import './index.css';

/**
 * HealthMate - Digital Wellness & ID Suite
 * 
 * Built by: Divyansh Srivastav
 * LinkedIn: https://linkedin.com/in/divyansh-srivastav
 * GitHub: https://github.com/Divyansh670
 * 
 * Tech Stack: React.js, TailwindCSS, Framer Motion, TypeScript
 * Focus: Employee wellness, digital health, SaaS solutions
 */

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </motion.div>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm">
              Made with ❤️ by{' '}
              <a 
                href="https://linkedin.com/in/divyansh-srivastav" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Divyansh Srivastav
              </a>
              {' | '}
              <a 
                href="https://github.com/Divyansh670" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                GitHub
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Passionate about Employee Wellness & Digital Health Solutions
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;