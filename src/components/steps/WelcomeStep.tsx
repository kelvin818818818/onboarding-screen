import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, currentStep, totalSteps }) => {
  return (
    <div className="card-content">
      {/* Skip button */}
      <button className="skip-btn" onClick={onNext}>
        Skip
      </button>

      <div>
        {/* Character illustration */}
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="character-main">👨‍🎓</div>
          <motion.div
            className="floating-element"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📚
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🌟
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💡
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="card-title">
            Learn English
            <br />
            Anywhere, Anytime
          </h1>
          <p className="card-subtitle">
            Let the learning process flow to develop their cognitive development skills
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="card-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <button className="primary-btn" onClick={onNext}>
          NEXT
        </button>
        
        {/* Progress dots */}
        <div className="progress-dots">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`progress-dot ${index + 1 === currentStep ? 'active' : ''}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};