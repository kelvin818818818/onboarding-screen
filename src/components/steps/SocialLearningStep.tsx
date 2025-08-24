import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface SocialLearningStepProps {
  profile: UserProfile;
  onUpdate: (profile: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SocialLearningStep: React.FC<SocialLearningStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
}) => {
  const handleCollaborationChange = (collaboration: string) => {
    const currentPreferences = profile.collaborationPreferences || [];
    const updatedPreferences = currentPreferences.includes(collaboration)
      ? currentPreferences.filter(pref => pref !== collaboration)
      : [...currentPreferences, collaboration];
    
    onUpdate({ collaborationPreferences: updatedPreferences });
  };

  const handleCommunityChange = (community: string) => {
    const currentParticipation = profile.communityParticipation || [];
    const updatedParticipation = currentParticipation.includes(community)
      ? currentParticipation.filter(part => part !== community)
      : [...currentParticipation, community];
    
    onUpdate({ communityParticipation: updatedParticipation });
  };

  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        <div className="onboarding-header">
          <button className="skip-btn">Skip</button>
        </div>
        
        <motion.div 
          className="card-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
            <label>Collaboration Style (Select all that apply)</label>
            <div className="option-grid">
              {[
                { value: 'solo', label: 'Solo Learning', icon: '🧑‍💻' },
                { value: 'pairs', label: 'Pair Learning', icon: '👥' },
                { value: 'groups', label: 'Group Learning', icon: '👨‍👩‍👧‍👦' },
                { value: 'mixed', label: 'Mixed Approach', icon: '🔄' }
              ].map((option) => (
                <button
                  key={option.value}
                  className={`option-card ${(profile.collaborationPreferences || []).includes(option.value) ? 'selected' : ''}`}
                  onClick={() => handleCollaborationChange(option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Community Engagement (Select all that apply)</label>
            <div className="option-grid">
              {[
                { value: 'observer', label: 'Observer', icon: '👁️' },
                { value: 'participant', label: 'Active Participant', icon: '🙋‍♂️' },
                { value: 'contributor', label: 'Content Contributor', icon: '✍️' },
                { value: 'mentor', label: 'Mentor Others', icon: '👨‍🏫' }
              ].map((option) => (
                <button
                  key={option.value}
                  className={`option-card ${(profile.communityParticipation || []).includes(option.value) ? 'selected' : ''}`}
                  onClick={() => handleCommunityChange(option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

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
              disabled={
                !(profile.collaborationPreferences && profile.collaborationPreferences.length > 0) ||
                !(profile.communityParticipation && profile.communityParticipation.length > 0)
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};