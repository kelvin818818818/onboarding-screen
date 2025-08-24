import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface LanguageBackgroundStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const LanguageBackgroundStep: React.FC<LanguageBackgroundStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const languages = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Other'
  ];

  const exposureLevels = [
    { value: 'none', label: 'No Exposure', description: 'First time learning English' },
    { value: 'minimal', label: 'Minimal', description: 'Heard English in movies/music' },
    { value: 'some', label: 'Some Exposure', description: 'Basic school English classes' },
    { value: 'regular', label: 'Regular', description: 'Use English occasionally' },
    { value: 'daily', label: 'Daily', description: 'Encounter English every day' }
  ];

  const challenges = [
    { id: 'pronunciation', label: 'Pronunciation', icon: '🗣️' },
    { id: 'grammar', label: 'Grammar Rules', icon: '📝' },
    { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
    { id: 'listening', label: 'Understanding Accents', icon: '👂' },
    { id: 'speaking', label: 'Speaking Confidence', icon: '💬' },
    { id: 'writing', label: 'Writing Skills', icon: '✍️' },
    { id: 'reading', label: 'Reading Speed', icon: '📖' },
    { id: 'idioms', label: 'Idioms & Expressions', icon: '🎭' }
  ];

  const toggleChallenge = (challengeId: string) => {
    const current = profile.specificChallenges || [];
    const updated = current.includes(challengeId)
      ? current.filter(id => id !== challengeId)
      : [...current, challengeId];
    onUpdate({ specificChallenges: updated });
  };

  const toggleExperience = (lang: string) => {
    const current = profile.previousExperience || [];
    const updated = current.includes(lang)
      ? current.filter(l => l !== lang)
      : [...current, lang];
    onUpdate({ previousExperience: updated });
  };

  return (
    <div className="card-content">
      <button className="skip-btn" onClick={onNext}>Skip</button>

      <div>
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-main">🌍</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            🗣️
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            📚
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Your Language Background</h2>
          <p className="card-subtitle">Help us understand your language journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Native Language */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px', display: 'block', color: '#374151' }}>
              What's your native language?
            </label>
            <select
              value={profile.nativeLanguage}
              onChange={(e) => onUpdate({ nativeLanguage: e.target.value })}
              className="form-input"
              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'%23666\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")' }}
            >
              <option value="">Select your native language</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Previous Language Learning */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              Have you learned other languages? (Optional)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {languages.filter(lang => lang !== profile.nativeLanguage).slice(0, 9).map((lang) => (
                <button
                  key={lang}
                  onClick={() => toggleExperience(lang)}
                  className={`option-btn ${profile.previousExperience?.includes(lang) ? 'selected' : ''}`}
                  style={{ fontSize: '12px', padding: '8px 4px' }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* English Exposure */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How much English are you exposed to?
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              {exposureLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => onUpdate({ languageExposure: level.value })}
                  className={`option-btn ${profile.languageExposure === level.value ? 'selected' : ''}`}
                  style={{ textAlign: 'left', padding: '12px' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{level.label}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>{level.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Confidence Level */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How confident are you with English? ({profile.confidenceLevel}/10)
            </p>
            <input
              type="range"
              min="1"
              max="10"
              value={profile.confidenceLevel}
              onChange={(e) => onUpdate({ confidenceLevel: parseInt(e.target.value) })}
              style={{ 
                width: '100%', 
                height: '6px', 
                borderRadius: '3px',
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${profile.confidenceLevel * 10}%, #e5e7eb ${profile.confidenceLevel * 10}%, #e5e7eb 100%)`,
                outline: 'none',
                appearance: 'none'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              <span>Not confident</span>
              <span>Very confident</span>
            </div>
          </div>

          {/* Specific Challenges */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              What challenges you most? (Select multiple)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {challenges.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => toggleChallenge(challenge.id)}
                  className={`option-btn ${profile.specificChallenges?.includes(challenge.id) ? 'selected' : ''}`}
                  style={{ fontSize: '12px', padding: '10px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>{challenge.icon}</span>
                  <span>{challenge.label}</span>
                </button>
              ))}
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
            disabled={!profile.nativeLanguage || !profile.languageExposure}
            style={{ flex: 1, marginBottom: 0 }}
          >
            NEXT
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