import React from 'react';
import { OnboardingData } from '../../types/onboarding';

interface SocialLearningStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SocialLearningStep: React.FC<SocialLearningStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const handleCollaborationChange = (collaboration: string) => {
    onUpdate({ collaboration });
  };

  const handleCommunityChange = (community: string) => {
    onUpdate({ community });
  };

  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        <div className="onboarding-header">
          <button className="skip-btn">Skip</button>
        </div>
        
        <div className="onboarding-content">
          <div className="character-container">
            <div className="character-illustration">
              <div className="character-emoji">👥</div>
              <div className="floating-elements">
                <span className="float-element" style={{ animationDelay: '0s' }}>💬</span>
                <span className="float-element" style={{ animationDelay: '0.5s' }}>🤝</span>
                <span className="float-element" style={{ animationDelay: '1s' }}>🌐</span>
                <span className="float-element" style={{ animationDelay: '1.5s' }}>👨‍🏫</span>
              </div>
            </div>
          </div>

          <h2>Social Learning Preferences</h2>
          <p>How do you prefer to learn with others?</p>

          <div className="form-section">
            <label>Collaboration Style</label>
            <div className="option-grid">
              {[
                { value: 'solo', label: 'Solo Learning', icon: '🧑‍💻' },
                { value: 'pairs', label: 'Pair Learning', icon: '👥' },
                { value: 'groups', label: 'Group Learning', icon: '👨‍👩‍👧‍👦' },
                { value: 'mixed', label: 'Mixed Approach', icon: '🔄' }
              ].map((option) => (
                <button
                  key={option.value}
                  className={`option-card ${data.collaboration === option.value ? 'selected' : ''}`}
                  onClick={() => handleCollaborationChange(option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Community Engagement</label>
            <div className="option-grid">
              {[
                { value: 'observer', label: 'Observer', icon: '👁️' },
                { value: 'participant', label: 'Active Participant', icon: '🙋‍♂️' },
                { value: 'contributor', label: 'Content Contributor', icon: '✍️' },
                { value: 'mentor', label: 'Mentor Others', icon: '👨‍🏫' }
              ].map((option) => (
                <button
                  key={option.value}
                  className={`option-card ${data.community === option.value ? 'selected' : ''}`}
                  onClick={() => handleCommunityChange(option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="onboarding-footer">
          <div className="progress-dots">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className={`dot ${i === 13 ? 'active' : i < 13 ? 'completed' : ''}`} />
            ))}
          </div>
          <div className="navigation-buttons">
            <button className="btn-secondary" onClick={onBack}>Back</button>
            <button 
              className="btn-primary" 
              onClick={onNext}
              disabled={!data.collaboration || !data.community}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};