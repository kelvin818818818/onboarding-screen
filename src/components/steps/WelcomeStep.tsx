import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Users, Zap, Star, Trophy } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const features = [
    { icon: Globe, text: "Global Community" },
    { icon: Users, text: "Expert Teachers" },
    { icon: Zap, text: "Fast Progress" },
    { icon: Trophy, text: "Achievements" },
    { icon: BookOpen, text: "Rich Content" },
    { icon: Star, text: "Premium Quality" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Skip Button */}
      <button 
        onClick={onNext}
        className="btn-skip absolute top-8 right-8 z-10"
      >
        Skip
      </button>

      <div className="mobile-card text-center space-y-8 w-full max-w-sm">
        {/* Character Illustration */}
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="character-illustration">
            👨‍🎓
          </div>
          {/* Floating elements around character */}
          <motion.div
            className="absolute top-4 right-4 text-2xl"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📚
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 text-2xl"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🌟
          </motion.div>
          <motion.div
            className="absolute top-8 left-4 text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💡
          </motion.div>
        </motion.div>

        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Learn English
            <br />
            <span className="gradient-text">Anywhere, Anytime</span>
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Accelerate your English learning journey with personalized lessons and interactive activities.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={onNext}
            className="btn-primary w-full text-lg mb-4"
          >
            Start Learning! →
          </button>
          
          <p className="text-gray-500 text-sm">
            Join thousands of learners worldwide
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative mb-8">
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-400 to-secondary-500 rounded-3xl flex items-center justify-center shadow-2xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen size={64} className="text-white" />
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-warning-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star size={16} className="text-white" />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
            EnglishMaster
          </span>
        </h1>
        
        <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Your personalized English learning journey starts here. Let's create a learning experience that's perfectly tailored to you.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
          >
            <feature.icon size={24} className="text-primary-300 mx-auto mb-2" />
            <p className="text-sm text-white/80 font-medium">{feature.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-white/70 text-sm">
          This will take about 3-5 minutes to complete
        </p>
        
        <button
          onClick={onNext}
          className="btn-primary text-lg px-8 py-4 mx-auto block"
        >
          Let's Get Started
        </button>
        
        <p className="text-white/50 text-xs">
          Your data is secure and will only be used to personalize your learning experience
        </p>
      </motion.div>
    </div>
  );
};