import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface CertificationStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const CertificationStep: React.FC<CertificationStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const certifications = [
    {
      id: 'ielts',
      name: 'IELTS',
      fullName: 'International English Language Testing System',
      description: 'Widely accepted for immigration and university admission',
      difficulty: 'Advanced',
      duration: '2h 45m',
      skills: ['Speaking', 'Listening', 'Reading', 'Writing'],
      recognition: 'Global',
      icon: '🌍',
      color: '#0ea5e9',
      preparationTime: '3-6 months',
      cost: '$250-300',
      validity: '2 years'
    },
    {
      id: 'toefl',
      name: 'TOEFL iBT',
      fullName: 'Test of English as a Foreign Language',
      description: 'Preferred by US universities and institutions',
      difficulty: 'Advanced',
      duration: '3 hours',
      skills: ['Speaking', 'Listening', 'Reading', 'Writing'],
      recognition: 'US/Canada focused',
      icon: '🇺🇸',
      color: '#8b5cf6',
      preparationTime: '2-4 months',
      cost: '$200-250',
      validity: '2 years'
    },
    {
      id: 'cambridge_cae',
      name: 'Cambridge CAE',
      fullName: 'Certificate in Advanced English',
      description: 'Demonstrates high-level English proficiency',
      difficulty: 'Advanced',
      duration: '4 hours',
      skills: ['Speaking', 'Listening', 'Reading', 'Writing', 'Use of English'],
      recognition: 'UK/Europe focused',
      icon: '🎓',
      color: '#10b981',
      preparationTime: '4-8 months',
      cost: '$180-220',
      validity: 'Lifetime'
    },
    {
      id: 'cambridge_cpe',
      name: 'Cambridge CPE',
      fullName: 'Certificate of Proficiency in English',
      description: 'Highest level Cambridge qualification',
      difficulty: 'Expert',
      duration: '4 hours',
      skills: ['Speaking', 'Listening', 'Reading', 'Writing', 'Use of English'],
      recognition: 'UK/Europe focused',
      icon: '👑',
      color: '#f59e0b',
      preparationTime: '6-12 months',
      cost: '$200-240',
      validity: 'Lifetime'
    },
    {
      id: 'toeic',
      name: 'TOEIC',
      fullName: 'Test of English for International Communication',
      description: 'Business English proficiency assessment',
      difficulty: 'Intermediate-Advanced',
      duration: '2 hours',
      skills: ['Listening', 'Reading', 'Speaking', 'Writing'],
      recognition: 'Business/Corporate',
      icon: '💼',
      color: '#ef4444',
      preparationTime: '2-3 months',
      cost: '$150-200',
      validity: '2 years'
    },
    {
      id: 'business_english',
      name: 'Business English Certificate',
      fullName: 'Cambridge Business English Certificate',
      description: 'Specialized business communication skills',
      difficulty: 'Intermediate-Advanced',
      duration: '3 hours',
      skills: ['Business Writing', 'Presentations', 'Meetings', 'Negotiations'],
      recognition: 'Business/Professional',
      icon: '📊',
      color: '#6366f1',
      preparationTime: '3-5 months',
      cost: '$160-200',
      validity: 'Lifetime'
    }
  ];

  const achievementGoals = [
    { id: 'fluency', label: 'Conversational Fluency', description: 'Speak confidently in any situation', icon: '🗣️' },
    { id: 'professional', label: 'Professional Proficiency', description: 'Excel in business communications', icon: '💼' },
    { id: 'academic', label: 'Academic Excellence', description: 'Master academic English skills', icon: '🎓' },
    { id: 'cultural', label: 'Cultural Competency', description: 'Understand cultural nuances', icon: '🌍' },
    { id: 'creative', label: 'Creative Expression', description: 'Write and speak creatively', icon: '🎨' },
    { id: 'leadership', label: 'Leadership Communication', description: 'Lead and inspire in English', icon: '👑' }
  ];

  const badgePreferences = [
    { id: 'skill_mastery', label: 'Skill Mastery Badges', description: 'Earn badges for mastering specific skills', icon: '🏆' },
    { id: 'streak_achievements', label: 'Streak Achievements', description: 'Celebrate consistent learning habits', icon: '🔥' },
    { id: 'milestone_rewards', label: 'Milestone Rewards', description: 'Special recognition for major achievements', icon: '🎯' },
    { id: 'community_recognition', label: 'Community Recognition', description: 'Get recognized by fellow learners', icon: '👥' },
    { id: 'expert_endorsements', label: 'Expert Endorsements', description: 'Validation from language experts', icon: '⭐' },
    { id: 'real_world_application', label: 'Real-World Application', description: 'Badges for using English in real situations', icon: '🌟' }
  ];

  const competencyFrameworks = [
    { 
      id: 'cefr', 
      name: 'CEFR', 
      fullName: 'Common European Framework of Reference',
      description: 'International standard for language proficiency',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      icon: '🇪🇺'
    },
    { 
      id: 'actfl', 
      name: 'ACTFL', 
      fullName: 'American Council on the Teaching of Foreign Languages',
      description: 'US-based proficiency guidelines',
      levels: ['Novice', 'Intermediate', 'Advanced', 'Superior'],
      icon: '🇺🇸'
    },
    { 
      id: 'ielts_scale', 
      name: 'IELTS Scale', 
      fullName: 'IELTS Band Score System',
      description: 'IELTS 9-band scoring system',
      levels: ['1-3', '4-5', '6-7', '8-9'],
      icon: '📊'
    }
  ];

  const toggleCertification = (certId: string) => {
    const current = profile.targetCertifications || [];
    const updated = current.includes(certId)
      ? current.filter(id => id !== certId)
      : [...current, certId];
    onUpdate({ targetCertifications: updated });
  };

  const toggleAchievementGoal = (goalId: string) => {
    const current = profile.achievementGoals || [];
    const updated = current.includes(goalId)
      ? current.filter(id => id !== goalId)
      : [...current, goalId];
    onUpdate({ achievementGoals: updated });
  };

  const toggleBadgePreference = (badgeId: string) => {
    const current = profile.badgePreferences || [];
    const updated = current.includes(badgeId)
      ? current.filter(id => id !== badgeId)
      : [...current, badgeId];
    onUpdate({ badgePreferences: updated });
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
          <div className="character-main">🏆</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            🎓
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
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
          <h2 className="card-title">Certifications & Achievements</h2>
          <p className="card-subtitle">Set your certification goals and achievement preferences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Target Certifications */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Which certifications interest you? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  className={`option-btn ${profile.targetCertifications?.includes(cert.id) ? 'selected' : ''}`}
                  onClick={() => toggleCertification(cert.id)}
                  style={{ 
                    textAlign: 'left', 
                    padding: '16px',
                    cursor: 'pointer',
                    border: profile.targetCertifications?.includes(cert.id) ? `2px solid ${cert.color}` : '2px solid #e5e7eb'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ 
                      fontSize: '24px',
                      minWidth: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${cert.color}20`,
                      borderRadius: '8px'
                    }}>
                      {cert.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                          {cert.name}
                        </h4>
                        <span style={{ 
                          fontSize: '10px', 
                          background: cert.color, 
                          color: 'white', 
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}>
                          {cert.difficulty}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
                        {cert.fullName}
                      </p>
                      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#374151' }}>
                        {cert.description}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11px' }}>
                        <div>
                          <span style={{ fontWeight: '600', color: '#6b7280' }}>Duration:</span> {cert.duration}
                        </div>
                        <div>
                          <span style={{ fontWeight: '600', color: '#6b7280' }}>Prep Time:</span> {cert.preparationTime}
                        </div>
                        <div>
                          <span style={{ fontWeight: '600', color: '#6b7280' }}>Cost:</span> {cert.cost}
                        </div>
                        <div>
                          <span style={{ fontWeight: '600', color: '#6b7280' }}>Valid:</span> {cert.validity}
                        </div>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                          <strong>Skills Tested:</strong>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {cert.skills.map((skill, index) => (
                            <span
                              key={index}
                              style={{
                                fontSize: '10px',
                                background: '#f3f4f6',
                                color: '#374151',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: '500'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievement Goals */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What achievements motivate you? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {achievementGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleAchievementGoal(goal.id)}
                  className={`option-btn ${profile.achievementGoals?.includes(goal.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '11px', 
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{goal.icon}</span>
                  <span style={{ fontWeight: '600' }}>{goal.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{goal.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Badge Preferences */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How would you like to earn recognition? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {badgePreferences.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => toggleBadgePreference(badge.id)}
                  className={`option-btn ${profile.badgePreferences?.includes(badge.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '10px', 
                    padding: '10px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{badge.icon}</span>
                  <span style={{ fontWeight: '600' }}>{badge.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '9px' }}>{badge.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Competency Framework */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Preferred proficiency framework?
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {competencyFrameworks.map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => onUpdate({ competencyFramework: framework.id })}
                  className={`option-btn ${profile.competencyFramework === framework.id ? 'selected' : ''}`}
                  style={{ textAlign: 'left', padding: '12px 16px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{framework.icon}</span>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                        {framework.name} - {framework.fullName}
                      </div>
                      <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>
                        {framework.description}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6366f1' }}>
                        Levels: {framework.levels.join(' → ')}
                      </div>
                    </div>
                  </div>
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
            style={{ flex: 1, marginBottom: 0 }}
          >
            CONTINUE
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