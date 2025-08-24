import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface CompletionStepProps {
  profile: UserProfile;
  onComplete: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
  profile,
  onComplete,
  onBack,
  currentStep,
  totalSteps
}) => {
  return (
    <div className="card-content">
      <div>
        {/* Character illustration */}
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-main">🎉</div>
          <motion.div
            className="floating-element"
            animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏆
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🚀
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="card-title">Ready to Start Learning!</h2>
          <p className="card-subtitle">
            Your personalized English learning journey is ready. Let's begin your path to fluency!
          </p>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ 
            background: '#f8fafc', 
            borderRadius: '12px', 
            padding: '16px', 
            marginBottom: '24px',
            fontSize: '14px',
            color: '#64748b'
          }}
        >
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#1e293b' }}>Name:</strong> {profile.name || 'Not provided'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#1e293b' }}>Level:</strong> {profile.overallLevel?.charAt(0).toUpperCase() + profile.overallLevel?.slice(1) || 'Beginner'}
          </div>
          <div>
            <strong style={{ color: '#1e293b' }}>Goals:</strong> {profile.primaryGoals?.length || 0} selected
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="card-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="nav-buttons">
          <button className="back-btn" onClick={onBack}>
            Back
          </button>
          <button 
            className="primary-btn" 
            onClick={onComplete}
            style={{ flex: 1, marginBottom: 0, background: '#10b981' }}
          >
            LET'S BEGIN
          </button>
        </div>
        
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