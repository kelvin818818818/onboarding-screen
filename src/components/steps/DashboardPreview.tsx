import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface DashboardPreviewProps {
  profile: UserProfile;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  adaptiveRecommendations?: string[];
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  profile,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  adaptiveRecommendations = []
}) => {
  const learningPaths = [
    {
      id: 'business_essentials',
      title: 'Business English Mastery',
      description: 'Professional communication skills',
      progress: 0,
      modules: 12,
      duration: '8 weeks',
      difficulty: 'Intermediate',
      color: '#3b82f6',
      icon: '💼'
    },
    {
      id: 'conversation_fluency',
      title: 'Conversational Fluency',
      description: 'Daily communication confidence',
      progress: 0,
      modules: 15,
      duration: '10 weeks',
      difficulty: 'Beginner',
      color: '#10b981',
      icon: '💬'
    },
    {
      id: 'pronunciation_perfect',
      title: 'Pronunciation Perfection',
      description: 'Clear and accurate speaking',
      progress: 0,
      modules: 8,
      duration: '6 weeks',
      difficulty: 'All Levels',
      color: '#f59e0b',
      icon: '🎵'
    }
  ];

  const badges = [
    { id: 'first_lesson', name: 'First Steps', icon: '🎯', earned: false, progress: 0 },
    { id: 'week_streak', name: 'Week Warrior', icon: '🔥', earned: false, progress: 0 },
    { id: 'grammar_master', name: 'Grammar Guru', icon: '📝', earned: false, progress: 0 },
    { id: 'vocab_builder', name: 'Word Wizard', icon: '📚', earned: false, progress: 0 }
  ];

  const skillProgress = [
    { skill: 'Speaking', level: profile.skillLevels.speaking, target: 8, color: '#ef4444' },
    { skill: 'Listening', level: profile.skillLevels.listening, target: 7, color: '#f97316' },
    { skill: 'Reading', level: profile.skillLevels.reading, target: 8, color: '#eab308' },
    { skill: 'Writing', level: profile.skillLevels.writing, target: 7, color: '#22c55e' },
    { skill: 'Grammar', level: profile.skillLevels.grammar, target: 8, color: '#06b6d4' },
    { skill: 'Vocabulary', level: profile.skillLevels.vocabulary, target: 9, color: '#8b5cf6' }
  ];

  return (
    <div className="card-content">
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
            animate={{ y: [-8, 8, -8], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            📈
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎯
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ x: [-6, 6, -6] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            🏆
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Your Learning Dashboard</h2>
          <p className="card-subtitle">Preview of your personalized learning environment</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Profile Summary */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '12px', 
            padding: '16px',
            color: 'white',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👨‍🎓
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>
                  Welcome, {profile.name || 'Learner'}!
                </h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  {profile.currentLevel?.charAt(0).toUpperCase() + profile.currentLevel?.slice(1)} Level • 
                  Profile {profile.profileCompleteness}% Complete
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '11px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>0</div>
                <div style={{ opacity: 0.8 }}>Lessons</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>0</div>
                <div style={{ opacity: 0.8 }}>Streak</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>
                  {profile.estimatedTimeToGoal || 'TBD'}
                </div>
                <div style={{ opacity: 0.8 }}>To Goal</div>
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              📚 Recommended Learning Paths
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {learningPaths.slice(0, 2).map((path) => (
                <div
                  key={path.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderLeft: `4px solid ${path.color}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{path.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>
                        {path.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>
                        {path.description}
                      </p>
                    </div>
                    <div style={{ 
                      fontSize: '10px', 
                      background: path.color, 
                      color: 'white', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {path.difficulty}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280' }}>
                    <span>{path.modules} modules</span>
                    <span>{path.duration}</span>
                    <span>{path.progress}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Progress */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              📊 Skill Progress Overview
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {skillProgress.slice(0, 4).map((skill) => (
                <div key={skill.skill} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ minWidth: '60px', fontSize: '11px', fontWeight: '500', color: '#374151' }}>
                    {skill.skill}
                  </div>
                  <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${(skill.level / 10) * 100}%`,
                        height: '100%',
                        background: skill.color,
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', minWidth: '40px' }}>
                    {skill.level}/{skill.target}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              🏆 Achievement Badges
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    background: badge.earned ? '#f0f9ff' : '#f9fafb',
                    borderRadius: '8px',
                    padding: '8px',
                    textAlign: 'center',
                    border: `2px solid ${badge.earned ? '#3b82f6' : '#e5e7eb'}`,
                    opacity: badge.earned ? 1 : 0.6
                  }}
                >
                  <div style={{ fontSize: '16px', marginBottom: '4px' }}>{badge.icon}</div>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#374151' }}>
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          {adaptiveRecommendations.length > 0 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              borderRadius: '12px', 
              padding: '12px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🤖 AI Recommendations
              </h4>
              <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                {adaptiveRecommendations.slice(0, 2).map((rec, index) => (
                  <div key={index} style={{ marginBottom: index < 1 ? '4px' : 0 }}>
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div style={{ 
            marginTop: '16px',
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '8px',
            fontSize: '11px'
          }}>
            <div style={{ background: '#fef3c7', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: '700', color: '#92400e' }}>Ready to Start</div>
              <div style={{ color: '#b45309' }}>Your journey begins!</div>
            </div>
            <div style={{ background: '#dbeafe', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: '700', color: '#1e40af' }}>
                {profile.primaryGoals?.length || 0} Goals
              </div>
              <div style={{ color: '#1d4ed8' }}>Learning objectives</div>
            </div>
            <div style={{ background: '#dcfce7', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: '700', color: '#166534' }}>
                {profile.availableTime || 'TBD'}
              </div>
              <div style={{ color: '#15803d' }}>Daily commitment</div>
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
            style={{ flex: 1, marginBottom: 0, background: '#10b981' }}
          >
            FINALIZE PROFILE
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