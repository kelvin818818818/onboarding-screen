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

  const ageRanges = [
    { value: '13-17', label: '13-17', description: 'High School' },
    { value: '18-24', label: '18-24', description: 'University Age' },
    { value: '25-34', label: '25-34', description: 'Young Professional' },
    { value: '35-44', label: '35-44', description: 'Mid-Career' },
    { value: '45-54', label: '45-54', description: 'Senior Professional' },
    { value: '55-64', label: '55-64', description: 'Pre-Retirement' },
    { value: '65+', label: '65+', description: 'Retirement Age' }
  ];

  const occupations = [
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'teacher', label: 'Teacher/Educator', icon: '👨‍🏫' },
    { value: 'business', label: 'Business Professional', icon: '💼' },
    { value: 'healthcare', label: 'Healthcare Worker', icon: '⚕️' },
    { value: 'engineer', label: 'Engineer/Tech', icon: '👨‍💻' },
    { value: 'artist', label: 'Artist/Creative', icon: '🎨' },
    { value: 'service', label: 'Service Industry', icon: '🏪' },
    { value: 'government', label: 'Government/Public', icon: '🏛️' },
    { value: 'retired', label: 'Retired', icon: '🏖️' },
    { value: 'unemployed', label: 'Between Jobs', icon: '🔍' },
    { value: 'other', label: 'Other', icon: '💭' }
  ];

  const educationLevels = [
    { value: 'elementary', label: 'Elementary School', description: 'Basic education' },
    { value: 'middle', label: 'Middle School', description: 'Junior high level' },
    { value: 'high_school', label: 'High School', description: 'Secondary education' },
    { value: 'some_college', label: 'Some College', description: 'Partial university' },
    { value: 'associate', label: 'Associate Degree', description: '2-year degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree', description: '4-year degree' },
    { value: 'master', label: 'Master\'s Degree', description: 'Graduate degree' },
    { value: 'doctorate', label: 'Doctorate/PhD', description: 'Advanced degree' },
    { value: 'professional', label: 'Professional Degree', description: 'Law, Medicine, etc.' }
  ];

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!profile.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!profile.age) {
      newErrors.age = 'Please select your age range';
    }
    if (!profile.occupation) {
      newErrors.occupation = 'Please select your occupation';
    }
    if (!profile.educationLevel) {
      newErrors.educationLevel = 'Please select your education level';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-time">9:41</div>
          <div className="status-indicators">
            <span>📶</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        <div className="card-content">
          <button className="skip-btn">Skip</button>
          
          {/* Header with Character */}
          <div className="card-header">
            <div className="character-container" style={{ width: '120px', height: '120px', margin: '1rem auto' }}>
              <div className="character-main" style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}>
                👋
              </div>
              <div className="floating-element">✨</div>
              <div className="floating-element">📝</div>
              <div className="floating-element">🎯</div>
              <div className="floating-element">💡</div>
            </div>
            <h2 className="card-title">Tell us about yourself</h2>
            <p className="card-subtitle">Help us personalize your learning experience</p>
          </div>

          {/* Form Content */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Personal Information */}
            <div className="form-section">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && (
                <p className="form-error">{errors.name}</p>
              )}
            </div>
            
            <div className="form-section">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="Enter your email"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>

            {/* Age Range */}
            <div className="form-section">
              <label className="form-label">Age Range *</label>
              <div className="option-grid">
                {ageRanges.slice(0, 6).map((age) => (
                  <div
                    key={age.value}
                    onClick={() => onUpdate({ age: age.value })}
                    className={`option-card ${profile.age === age.value ? 'selected' : ''}`}
                  >
                    <div className="option-title">{age.label}</div>
                    <div className="option-description">{age.description}</div>
                  </div>
                ))}
              </div>
              {errors.age && (
                <p className="form-error">{errors.age}</p>
              )}
            </div>

            {/* Occupation */}
            <div className="form-section">
              <label className="form-label">Current Occupation *</label>
              <div className="option-grid">
                {occupations.slice(0, 8).map((occ) => (
                  <div
                    key={occ.value}
                    onClick={() => onUpdate({ occupation: occ.value })}
                    className={`option-card ${profile.occupation === occ.value ? 'selected' : ''}`}
                  >
                    <div className="option-icon">{occ.icon}</div>
                    <div className="option-title">{occ.label}</div>
                  </div>
                ))}
              </div>
              {errors.occupation && (
                <p className="form-error">{errors.occupation}</p>
              )}
            </div>

            {/* Education Level */}
            <div className="form-section">
              <label className="form-label">Education Level *</label>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {educationLevels.slice(0, 6).map((edu) => (
                  <div
                    key={edu.value}
                    onClick={() => onUpdate({ educationLevel: edu.value })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: `2px solid ${profile.educationLevel === edu.value ? '#667eea' : '#e5e7eb'}`,
                      background: profile.educationLevel === edu.value ? 'rgba(102, 126, 234, 0.1)' : 'white'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>
                        {edu.label}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        {edu.description}
                      </div>
                    </div>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: `2px solid ${profile.educationLevel === edu.value ? '#667eea' : '#d1d5db'}`,
                      background: profile.educationLevel === edu.value ? '#667eea' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {profile.educationLevel === edu.value && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'white'
                        }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.educationLevel && (
                <p className="form-error">{errors.educationLevel}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer">
            <div className="nav-buttons">
              <button onClick={onBack} className="btn-secondary">
                Back
              </button>
              <button
                onClick={validateAndNext}
                disabled={!profile.name.trim() || !profile.email.trim() || !profile.age || !profile.occupation || !profile.educationLevel}
                className="btn-primary"
                style={{ flex: 1, marginLeft: '1rem' }}
              >
                Continue
              </button>
            </div>
            
            {/* Progress Dots */}
            <div className="progress-dots">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index + 1 === currentStep ? 'active' : index < currentStep ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};