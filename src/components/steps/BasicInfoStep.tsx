import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface BasicInfoStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ageRanges = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!profile.age) {
      newErrors.age = 'Please select your age range';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

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
          <div className="character-main">👋</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎯
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Tell us about yourself</h2>
          <p className="card-subtitle">This helps us personalize your experience</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Name Input */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Enter your first name"
              className={`form-input ${errors.name ? 'border-red-400' : ''}`}
            />
            {errors.name && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.name}</p>
            )}
          </div>

          {/* Age Range */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              What's your age range?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {ageRanges.map((age) => (
                <button
                  key={age}
                  onClick={() => onUpdate({ age })}
                  className={`option-btn ${profile.age === age ? 'selected' : ''}`}
                >
                  {age}
                </button>
              ))}
            </div>
            {errors.age && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.age}</p>
            )}
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
            onClick={validateAndNext}
            disabled={!profile.name.trim() || !profile.age}
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