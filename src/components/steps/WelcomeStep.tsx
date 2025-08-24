import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, currentStep, totalSteps }) => {
  return (
    <div className="text-center">
      {/* Hero Illustration */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Main Character */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl shadow-2xl">
              👨‍🎓
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-4 right-8 text-3xl"
            animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📚
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-4 text-3xl"
            animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🌟
          </motion.div>
          <motion.div
            className="absolute top-12 left-8 text-2xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-12 text-2xl"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            🎯
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Master English with
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Learning
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Personalized learning paths, real-time feedback, and adaptive content 
          designed specifically for your goals and learning style.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-semibold text-gray-800 mb-2">Personalized Learning</h3>
          <p className="text-sm text-gray-600">AI adapts to your pace and style</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
          <p className="text-sm text-gray-600">Detailed analytics and insights</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-semibold text-gray-800 mb-2">Achievements</h3>
          <p className="text-sm text-gray-600">Earn badges and certificates</p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <button
          onClick={onNext}
          className="btn-primary text-lg px-8 py-4 mb-6"
        >
          Start Your Learning Journey
        </button>
        
        <div className="text-sm text-gray-500">
          Takes only 5-10 minutes to complete
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="flex items-center gap-2">
          <span>🔒</span>
          <span>Secure & Private</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🌟</span>
          <span>Personalized</span>
        </div>
      </motion.div>
    </div>
  );
};