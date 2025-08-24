import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface GoalsStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const GoalsStep: React.FC<GoalsStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const goals = [
    { id: 'conversation', label: 'Daily Conversation' },
    { id: 'business', label: 'Business English' },
    { id: 'travel', label: 'Travel & Tourism' },
    { id: 'academic', label: 'Academic Studies' },
    { id: 'culture', label: 'Cultural Learning' },
    { id: 'general', label: 'General Improvement' }
  ];

  const toggleGoal = (goalId: string) => {
    const currentGoals = profile.primaryGoals || [];
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(id => id !== goalId)
      : [...currentGoals, goalId];
    
    onUpdate({ primaryGoals: updatedGoals });
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
          <div className="character-main">🎯</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            🚀
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            💪
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">What are your goals?</h2>
          <p className="card-subtitle">Select all that apply to personalize your learning path</p>
        </motion.div>

        {/* Goals Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`option-btn ${profile.primaryGoals?.includes(goal.id) ? 'selected' : ''}`}
                style={{ fontSize: '14px', padding: '12px 8px' }}
              >
                {goal.label}
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