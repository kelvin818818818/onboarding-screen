import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface SkillLevelStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const SkillLevelStep: React.FC<SkillLevelStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const levels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting out' },
    { value: 'elementary', label: 'Elementary', description: 'Basic phrases' },
    { value: 'intermediate', label: 'Intermediate', description: 'Simple conversations' },
    { value: 'advanced', label: 'Advanced', description: 'Fluent communication' }
  ];

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
          transition={{ duration: 0.8 }}
        >
          <div className="character-main">🎓</div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📊
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ⭐
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">What's your English level?</h2>
          <p className="card-subtitle">Help us understand your current abilities</p>
        </motion.div>

        {/* Level Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ display: 'grid', gap: '12px' }}>
            {levels.map((level) => (
              <button
                key={level.value}
                onClick={() => onUpdate({ overallLevel: level.value as any })}
                className={`option-btn ${profile.overallLevel === level.value ? 'selected' : ''}`}
                style={{ 
                  textAlign: 'left', 
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{level.label}</div>
                <div style={{ fontSize: '14px', opacity: 0.7 }}>{level.description}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="card-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="nav-buttons">
          <button className="back-btn" onClick={onBack}>
            Back
          </button>
          <button 
            className="primary-btn" 
            onClick={onNext}
            style={{ flex: 1, marginBottom: 0 }}
          >
            NEXT
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