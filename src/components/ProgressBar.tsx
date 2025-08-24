import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  className = '' 
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-white/80">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
        <motion.div
          className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index < currentStep
                ? 'bg-primary-400 shadow-lg'
                : index === currentStep - 1
                ? 'bg-secondary-400 shadow-lg pulse-glow'
                : 'bg-white/30'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};