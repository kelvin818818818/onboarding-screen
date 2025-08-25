import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface TechnologyStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const TechnologyStep: React.FC<TechnologyStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const devices = [
    { id: 'smartphone', label: 'Smartphone', icon: '📱', description: 'Learn on the go' },
    { id: 'tablet', label: 'Tablet', icon: '📱', description: 'Larger screen experience' },
    { id: 'laptop', label: 'Laptop', icon: '💻', description: 'Full desktop features' },
    { id: 'desktop', label: 'Desktop', icon: '🖥️', description: 'Complete workstation' },
    { id: 'smart_tv', label: 'Smart TV', icon: '📺', description: 'Living room learning' }
  ];

  const connectionTypes = [
    { value: 'high_speed', label: 'High-Speed Internet', description: 'Fast, reliable connection' },
    { value: 'moderate', label: 'Moderate Speed', description: 'Good for most activities' },
    { value: 'limited', label: 'Limited Bandwidth', description: 'Need data-efficient content' },
    { value: 'mobile_only', label: 'Mobile Data Only', description: 'Primarily use mobile data' },
    { value: 'intermittent', label: 'Intermittent', description: 'Sometimes offline' }
  ];

  const accessibilityNeeds = [
    { id: 'large_text', label: 'Large Text', icon: '🔍', description: 'Bigger fonts and UI elements' },
    { id: 'high_contrast', label: 'High Contrast', icon: '⚫', description: 'Better visual distinction' },
    { id: 'audio_descriptions', label: 'Audio Descriptions', icon: '🔊', description: 'Spoken content descriptions' },
    { id: 'subtitles', label: 'Subtitles/Captions', icon: '📝', description: 'Text for all audio content' },
    { id: 'slow_pace', label: 'Slower Pace', icon: '🐌', description: 'More time for interactions' },
    { id: 'simplified_ui', label: 'Simplified Interface', icon: '🎯', description: 'Less complex layouts' }
  ];

  const techComfortLevels = [
    { value: 1, label: 'Not Comfortable', description: 'Prefer simple, basic features' },
    { value: 2, label: 'Somewhat Comfortable', description: 'Can handle basic apps' },
    { value: 3, label: 'Moderately Comfortable', description: 'Use various apps regularly' },
    { value: 4, label: 'Very Comfortable', description: 'Enjoy trying new features' },
    { value: 5, label: 'Tech Savvy', description: 'Love advanced functionality' }
  ];

  const toggleDevice = (deviceId: string) => {
    const current = profile.devicePreferences || [];
    const updated = current.includes(deviceId)
      ? current.filter(id => id !== deviceId)
      : [...current, deviceId];
    onUpdate({ devicePreferences: updated });
  };

  const toggleAccessibility = (needId: string) => {
    const current = profile.accessibilityNeeds || [];
    const updated = current.includes(needId)
      ? current.filter(id => id !== needId)
      : [...current, needId];
    onUpdate({ accessibilityNeeds: updated });
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
          <div className="character-main">💻</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📱
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ⚡
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Technology & Accessibility</h2>
          <p className="card-subtitle">Help us optimize your experience</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Device Preferences */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              Which devices will you use? (Select multiple)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => toggleDevice(device.id)}
                  className={`option-btn ${profile.devicePreferences?.includes(device.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '11px', 
                    padding: '10px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{device.icon}</span>
                  <span style={{ fontWeight: '600' }}>{device.label}</span>
                  <span style={{ opacity: 0.7 }}>{device.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Internet Connection */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              What's your internet connection like?
            </p>
            <div style={{ display: 'grid', gap: '6px' }}>
              {connectionTypes.map((connection) => (
                <button
                  key={connection.value}
                  onClick={() => onUpdate({ internetConnection: connection.value })}
                  className={`option-btn ${profile.internetConnection === connection.value ? 'selected' : ''}`}
                  style={{ textAlign: 'left', padding: '10px 12px' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{connection.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{connection.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tech Comfort Level */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How comfortable are you with technology? ({profile.techComfort}/5)
            </p>
            <input
              type="range"
              min="1"
              max="5"
              value={profile.techComfort}
              onChange={(e) => onUpdate({ techComfort: parseInt(e.target.value) })}
              style={{ 
                width: '100%', 
                height: '6px', 
                borderRadius: '3px',
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${profile.techComfort * 20}%, #e5e7eb ${profile.techComfort * 20}%, #e5e7eb 100%)`,
                outline: 'none',
                appearance: 'none'
              }}
            />
            <div style={{ 
              fontSize: '12px', 
              color: '#374151', 
              marginTop: '8px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {techComfortLevels.find(level => level.value === profile.techComfort)?.label}
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#6b7280', 
              textAlign: 'center',
              marginTop: '2px'
            }}>
              {techComfortLevels.find(level => level.value === profile.techComfort)?.description}
            </div>
          </div>

          {/* Accessibility Needs */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              Any accessibility preferences? (Optional)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {accessibilityNeeds.map((need) => (
                <button
                  key={need.id}
                  onClick={() => toggleAccessibility(need.id)}
                  className={`option-btn ${profile.accessibilityNeeds?.includes(need.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '10px', 
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{need.icon}</span>
                  <span style={{ fontWeight: '600' }}>{need.label}</span>
                  <span style={{ opacity: 0.7 }}>{need.description}</span>
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
            disabled={!profile.devicePreferences?.length || !profile.internetConnection}
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