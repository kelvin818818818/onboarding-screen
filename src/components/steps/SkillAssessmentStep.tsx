import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface SkillAssessmentStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const SkillAssessmentStep: React.FC<SkillAssessmentStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const skills = [
    { key: 'speaking' as const, label: 'Speaking', icon: '🗣️', description: 'Expressing yourself verbally' },
    { key: 'listening' as const, label: 'Listening', icon: '👂', description: 'Understanding spoken English' },
    { key: 'reading' as const, label: 'Reading', icon: '📖', description: 'Comprehending written text' },
    { key: 'writing' as const, label: 'Writing', icon: '✍️', description: 'Expressing ideas in writing' },
    { key: 'grammar' as const, label: 'Grammar', icon: '📝', description: 'Understanding language rules' },
    { key: 'vocabulary' as const, label: 'Vocabulary', icon: '📚', description: 'Knowledge of words and meanings' },
    { key: 'pronunciation' as const, label: 'Pronunciation', icon: '🎵', description: 'Speaking clearly and accurately' },
    { key: 'comprehension' as const, label: 'Comprehension', icon: '🧠', description: 'Understanding context and meaning' }
  ];

  const skillLevels = [
    { value: 1, label: 'Beginner', description: 'Just starting', color: '#ef4444' },
    { value: 2, label: 'Elementary', description: 'Basic understanding', color: '#f97316' },
    { value: 3, label: 'Pre-Intermediate', description: 'Some knowledge', color: '#eab308' },
    { value: 4, label: 'Intermediate', description: 'Comfortable level', color: '#22c55e' },
    { value: 5, label: 'Upper-Intermediate', description: 'Good proficiency', color: '#06b6d4' },
    { value: 6, label: 'Advanced', description: 'Very proficient', color: '#8b5cf6' },
    { value: 7, label: 'Proficient', description: 'Near-native level', color: '#6366f1' }
  ];

  const updateSkillLevel = (skill: keyof UserProfile['skillLevels'], level: number) => {
    onUpdate({
      skillLevels: {
        ...profile.skillLevels,
        [skill]: level
      }
    });
  };

  const getSkillColor = (level: number) => {
    const skillLevel = skillLevels.find(sl => sl.value === level);
    return skillLevel?.color || '#6b7280';
  };

  const getAverageLevel = () => {
    const levels = Object.values(profile.skillLevels);
    return Math.round(levels.reduce((sum, level) => sum + level, 0) / levels.length);
  };

  return (
    <div className="card-content">
      <button 
        className="skip-button" 
        onClick={onNext}
      >
        Skip
      </button>

      <div>
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-main">📊</div>
          <motion.div
            className="floating-element"
            animate={{ y: [-6, 6, -6], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📈
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⭐
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Assess Your Skills</h2>
          <p className="card-subtitle">Rate your current English abilities</p>
          <div style={{ 
            background: '#f3f4f6', 
            borderRadius: '8px', 
            padding: '8px 12px', 
            marginTop: '12px',
            fontSize: '14px',
            color: '#374151'
          }}>
            Average Level: <strong>{skillLevels.find(sl => sl.value === getAverageLevel())?.label || 'Beginner'}</strong>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ display: 'grid', gap: '16px' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '2px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>{skill.icon}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                      {skill.label}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                      {skill.description}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={profile.skillLevels[skill.key]}
                    onChange={(e) => updateSkillLevel(skill.key, parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: `linear-gradient(to right, ${getSkillColor(profile.skillLevels[skill.key])} 0%, ${getSkillColor(profile.skillLevels[skill.key])} ${(profile.skillLevels[skill.key] - 1) * 16.67}%, #e5e7eb ${(profile.skillLevels[skill.key] - 1) * 16.67}%, #e5e7eb 100%)`,
                      outline: 'none',
                      appearance: 'none'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Level {profile.skillLevels[skill.key]}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '500',
                    color: getSkillColor(profile.skillLevels[skill.key])
                  }}>
                    {skillLevels.find(sl => sl.value === profile.skillLevels[skill.key])?.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Assessment Questions */}
          <div style={{ marginTop: '20px', padding: '16px', background: '#eff6ff', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>
              💡 Quick Self-Assessment
            </h4>
            <div style={{ fontSize: '12px', color: '#1e40af', lineHeight: '1.4' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Beginner (1-2):</strong> Know basic words, simple phrases
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Intermediate (3-4):</strong> Can have conversations, understand main ideas
              </p>
              <p style={{ margin: '0' }}>
                <strong>Advanced (5-7):</strong> Fluent communication, complex topics
              </p>
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