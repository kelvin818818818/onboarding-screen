import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface PersonalizationStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const PersonalizationStep: React.FC<PersonalizationStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const aiPersonalities = [
    { value: 'encouraging', label: 'Encouraging Coach', description: 'Positive, motivational, celebrates progress', icon: '🌟' },
    { value: 'professional', label: 'Professional Tutor', description: 'Formal, structured, academic approach', icon: '👔' },
    { value: 'friendly', label: 'Friendly Companion', description: 'Casual, conversational, like a friend', icon: '😊' },
    { value: 'challenging', label: 'Challenging Mentor', description: 'Pushes you harder, high expectations', icon: '💪' },
    { value: 'patient', label: 'Patient Guide', description: 'Understanding, takes time, very supportive', icon: '🤗' }
  ];

  const contentPersonalization = [
    { value: 'adaptive', label: 'Fully Adaptive', description: 'AI adjusts everything based on your progress' },
    { value: 'guided', label: 'Guided Path', description: 'Structured curriculum with some flexibility' },
    { value: 'custom', label: 'Custom Mix', description: 'You choose topics, AI optimizes difficulty' },
    { value: 'traditional', label: 'Traditional', description: 'Fixed curriculum, consistent structure' }
  ];

  const gamificationLevels = [
    { value: 'none', label: 'No Gamification', description: 'Pure learning, no game elements', icon: '📚' },
    { value: 'minimal', label: 'Minimal', description: 'Basic progress tracking only', icon: '📊' },
    { value: 'moderate', label: 'Moderate', description: 'Points, badges, and streaks', icon: '🏆' },
    { value: 'high', label: 'High', description: 'Full game experience with levels', icon: '🎮' }
  ];

  const updateAdaptiveSetting = (key: keyof UserProfile['adaptiveSettings'], value: any) => {
    onUpdate({
      adaptiveSettings: {
        ...profile.adaptiveSettings,
        [key]: value
      }
    });
  };

  const toggleAdaptiveSetting = (key: keyof UserProfile['adaptiveSettings']) => {
    onUpdate({
      adaptiveSettings: {
        ...profile.adaptiveSettings,
        [key]: !profile.adaptiveSettings[key]
      }
    });
  };

  return (
    <div className="card-content">
      <button className="skip-button" onClick={onNext}>Skip</button>

      <div>
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-main">🤖</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            ⚙️
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">AI Personalization</h2>
          <p className="card-subtitle">Customize your AI learning assistant</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* AI Tutor Personality */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              What AI tutor personality do you prefer?
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              {aiPersonalities.map((personality) => (
                <button
                  key={personality.value}
                  onClick={() => updateAdaptiveSetting('aiTutorPersonality', personality.value)}
                  className={`option-btn ${profile.adaptiveSettings.aiTutorPersonality === personality.value ? 'selected' : ''}`}
                  style={{ textAlign: 'left', padding: '12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px', marginRight: '8px' }}>{personality.icon}</span>
                    <span style={{ fontWeight: '600' }}>{personality.label}</span>
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.7, marginLeft: '24px' }}>
                    {personality.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Personalization */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How should we personalize your content?
            </p>
            <div style={{ display: 'grid', gap: '6px' }}>
              {contentPersonalization.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateAdaptiveSetting('contentPersonalization', option.value)}
                  className={`option-btn ${profile.adaptiveSettings.contentPersonalization === option.value ? 'selected' : ''}`}
                  style={{ textAlign: 'left', padding: '10px 12px' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Gamification Level */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How much gamification do you want?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {gamificationLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => updateAdaptiveSetting('gamificationLevel', level.value)}
                  className={`option-btn ${profile.adaptiveSettings.gamificationLevel === level.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'center', 
                    padding: '10px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{level.icon}</span>
                  <span style={{ fontWeight: '600', fontSize: '12px' }}>{level.label}</span>
                  <span style={{ fontSize: '10px', opacity: 0.7 }}>{level.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              Advanced AI Features
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '12px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
                    Auto-Adjust Difficulty
                  </span>
                  <button
                    onClick={() => toggleAdaptiveSetting('autoAdjustDifficulty')}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: profile.adaptiveSettings.autoAdjustDifficulty ? '#6366f1' : '#d1d5db',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: profile.adaptiveSettings.autoAdjustDifficulty ? '22px' : '2px',
                      transition: 'all 0.2s'
                    }} />
                  </button>
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                  AI automatically makes content easier or harder based on your performance
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '12px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
                    Personalized Recommendations
                  </span>
                  <button
                    onClick={() => toggleAdaptiveSetting('personalizedRecommendations')}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: profile.adaptiveSettings.personalizedRecommendations ? '#6366f1' : '#d1d5db',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: profile.adaptiveSettings.personalizedRecommendations ? '22px' : '2px',
                      transition: 'all 0.2s'
                    }} />
                  </button>
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                  Get content suggestions based on your interests and learning patterns
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '12px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
                    Social Learning
                  </span>
                  <button
                    onClick={() => toggleAdaptiveSetting('socialLearning')}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: profile.adaptiveSettings.socialLearning ? '#6366f1' : '#d1d5db',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: profile.adaptiveSettings.socialLearning ? '22px' : '2px',
                      transition: 'all 0.2s'
                    }} />
                  </button>
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                  Connect with other learners and participate in group activities
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="card-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="nav-buttons">
          <button className="back-btn" onClick={onBack}>Back</button>
          <button 
            className="primary-btn" 
            onClick={onNext}
            style={{ flex: 1, marginBottom: 0 }}
          >
            ALMOST DONE!
          </button>
        </div>
        
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