import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface BehavioralAnalysisStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  aiProcessing?: boolean;
}

export const BehavioralAnalysisStep: React.FC<BehavioralAnalysisStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  aiProcessing
}) => {
  const studyHabits = [
    { id: 'early_morning', label: 'Early Morning Study', description: 'I study best in the early morning hours', icon: '🌅' },
    { id: 'late_night', label: 'Night Owl', description: 'I prefer studying late at night', icon: '🌙' },
    { id: 'short_bursts', label: 'Short Study Bursts', description: 'I like frequent, short study sessions', icon: '⚡' },
    { id: 'long_sessions', label: 'Extended Sessions', description: 'I prefer longer, immersive study periods', icon: '📚' },
    { id: 'background_music', label: 'Background Music', description: 'I study better with music or ambient sounds', icon: '🎵' },
    { id: 'complete_silence', label: 'Complete Silence', description: 'I need absolute quiet to concentrate', icon: '🤫' },
    { id: 'note_taking', label: 'Active Note-Taking', description: 'I learn by writing and taking detailed notes', icon: '✍️' },
    { id: 'discussion_based', label: 'Discussion-Based', description: 'I learn through talking and discussion', icon: '💬' }
  ];

  const procrastinationOptions = [
    { value: 'never', label: 'Never Procrastinate', description: 'I always start tasks immediately', color: '#10b981' },
    { value: 'rarely', label: 'Rarely Procrastinate', description: 'I occasionally delay but usually stay on track', color: '#22c55e' },
    { value: 'sometimes', label: 'Sometimes Procrastinate', description: 'I procrastinate on some tasks but not others', color: '#eab308' },
    { value: 'often', label: 'Often Procrastinate', description: 'I frequently delay starting tasks', color: '#f97316' },
    { value: 'always', label: 'Always Procrastinate', description: 'I consistently struggle with starting tasks', color: '#ef4444' }
  ];

  const motivationalTriggers = [
    { id: 'progress_tracking', label: 'Progress Tracking', description: 'Seeing my advancement motivates me', icon: '📈' },
    { id: 'competition', label: 'Friendly Competition', description: 'Competing with others drives me', icon: '🏆' },
    { id: 'rewards', label: 'Rewards & Achievements', description: 'Earning badges and rewards motivates me', icon: '🎁' },
    { id: 'deadlines', label: 'Clear Deadlines', description: 'Having specific dates keeps me focused', icon: '⏰' },
    { id: 'social_pressure', label: 'Social Accountability', description: 'Others knowing my goals motivates me', icon: '👥' },
    { id: 'personal_growth', label: 'Personal Growth', description: 'Self-improvement is my main driver', icon: '🌱' },
    { id: 'immediate_feedback', label: 'Immediate Feedback', description: 'Quick responses keep me engaged', icon: '⚡' },
    { id: 'long_term_vision', label: 'Long-term Vision', description: 'Future goals drive my daily actions', icon: '🎯' }
  ];

  const feedbackFrequencyOptions = [
    { value: 'immediate', label: 'Immediate', description: 'I want feedback right after each activity', icon: '⚡' },
    { value: 'after_each_lesson', label: 'After Each Lesson', description: 'Feedback at the end of each lesson', icon: '📝' },
    { value: 'daily', label: 'Daily Summary', description: 'A daily summary of my progress', icon: '📅' },
    { value: 'weekly', label: 'Weekly Report', description: 'Comprehensive weekly progress reports', icon: '📊' },
    { value: 'milestone', label: 'At Milestones', description: 'Feedback only at major achievements', icon: '🎯' }
  ];

  const errorToleranceOptions = [
    { value: 'very_low', label: 'Very Low Tolerance', description: 'Mistakes frustrate me significantly', color: '#ef4444' },
    { value: 'low', label: 'Low Tolerance', description: 'I prefer to avoid making mistakes', color: '#f97316' },
    { value: 'moderate', label: 'Moderate Tolerance', description: 'Mistakes are part of learning', color: '#eab308' },
    { value: 'high', label: 'High Tolerance', description: 'I learn well from making mistakes', color: '#22c55e' },
    { value: 'very_high', label: 'Very High Tolerance', description: 'Mistakes don\'t bother me at all', color: '#10b981' }
  ];

  const toggleStudyHabit = (habitId: string) => {
    const current = profile.learningBehavior.studyHabits || [];
    const updated = current.includes(habitId)
      ? current.filter(id => id !== habitId)
      : [...current, habitId];
    
    onUpdate({
      learningBehavior: {
        ...profile.learningBehavior,
        studyHabits: updated
      }
    });
  };

  const toggleMotivationalTrigger = (triggerId: string) => {
    const current = profile.learningBehavior.motivationalTriggers || [];
    const updated = current.includes(triggerId)
      ? current.filter(id => id !== triggerId)
      : [...current, triggerId];
    
    onUpdate({
      learningBehavior: {
        ...profile.learningBehavior,
        motivationalTriggers: updated
      }
    });
  };

  const updateLearningBehavior = (key: keyof UserProfile['learningBehavior'], value: any) => {
    onUpdate({
      learningBehavior: {
        ...profile.learningBehavior,
        [key]: value
      }
    });
  };

  const validateAndNext = () => {
    if (!profile.learningBehavior.studyHabits?.length || 
        !profile.learningBehavior.procrastinationTendencies ||
        !profile.learningBehavior.motivationalTriggers?.length ||
        !profile.learningBehavior.preferredFeedbackFrequency ||
        !profile.learningBehavior.errorToleranceLevel) {
      return;
    }
    onNext();
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
            💡
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Behavioral Learning Analysis</h2>
          <p className="card-subtitle">Understanding your learning patterns and behaviors</p>
          {aiProcessing && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm">Analyzing behavioral patterns...</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Study Habits */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What are your study habits? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {studyHabits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => toggleStudyHabit(habit.id)}
                  className={`option-btn ${profile.learningBehavior.studyHabits?.includes(habit.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '16px' }}>{habit.icon}</span>
                  <span style={{ fontWeight: '600' }}>{habit.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{habit.description}</span>
                </button>
              ))}
            </div>
            {profile.learningBehavior.studyHabits?.length === 0 && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select at least one study habit
              </p>
            )}
          </div>

          {/* Procrastination Tendencies */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How would you describe your procrastination tendencies?
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {procrastinationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateLearningBehavior('procrastinationTendencies', option.value)}
                  className={`option-btn ${profile.learningBehavior.procrastinationTendencies === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px',
                    borderLeft: profile.learningBehavior.procrastinationTendencies === option.value ? `4px solid ${option.color}` : '4px solid transparent'
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>{option.description}</div>
                </button>
              ))}
            </div>
            {!profile.learningBehavior.procrastinationTendencies && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your procrastination tendency
              </p>
            )}
          </div>

          {/* Motivational Triggers */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What motivates you to learn? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {motivationalTriggers.map((trigger) => (
                <button
                  key={trigger.id}
                  onClick={() => toggleMotivationalTrigger(trigger.id)}
                  className={`option-btn ${profile.learningBehavior.motivationalTriggers?.includes(trigger.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '16px' }}>{trigger.icon}</span>
                  <span style={{ fontWeight: '600' }}>{trigger.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{trigger.description}</span>
                </button>
              ))}
            </div>
            {profile.learningBehavior.motivationalTriggers?.length === 0 && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select at least one motivational trigger
              </p>
            )}
          </div>

          {/* Feedback Frequency */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How often do you prefer to receive feedback?
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {feedbackFrequencyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateLearningBehavior('preferredFeedbackFrequency', option.value)}
                  className={`option-btn ${profile.learningBehavior.preferredFeedbackFrequency === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{option.icon}</span>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                      <div style={{ fontSize: '12px', opacity: 0.7 }}>{option.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {!profile.learningBehavior.preferredFeedbackFrequency && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your feedback frequency preference
              </p>
            )}
          </div>

          {/* Error Tolerance */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How do you handle making mistakes while learning?
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {errorToleranceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateLearningBehavior('errorToleranceLevel', option.value)}
                  className={`option-btn ${profile.learningBehavior.errorToleranceLevel === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px',
                    borderLeft: profile.learningBehavior.errorToleranceLevel === option.value ? `4px solid ${option.color}` : '4px solid transparent'
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>{option.description}</div>
                </button>
              ))}
            </div>
            {!profile.learningBehavior.errorToleranceLevel && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your error tolerance level
              </p>
            )}
          </div>

          {/* Behavioral Insights */}
          {profile.learningBehavior.studyHabits?.length > 0 && profile.learningBehavior.motivationalTriggers?.length > 0 && (
            <div style={{ 
              marginTop: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              borderRadius: '12px', 
              padding: '16px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🧠 Behavioral Analysis
              </h4>
              <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Learning Profile:</strong> {
                    profile.learningBehavior.studyHabits.includes('short_bursts') ? 'Micro-Learning Optimized' :
                    profile.learningBehavior.studyHabits.includes('long_sessions') ? 'Deep Focus Learner' :
                    'Flexible Learning Style'
                  }
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Motivation Strategy:</strong> {
                    profile.learningBehavior.motivationalTriggers.includes('competition') ? 'Competition-driven approach' :
                    profile.learningBehavior.motivationalTriggers.includes('progress_tracking') ? 'Progress-focused methodology' :
                    profile.learningBehavior.motivationalTriggers.includes('rewards') ? 'Achievement-based system' :
                    'Personalized motivation mix'
                  }
                </p>
              </div>
            </div>
          )}
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
            onClick={validateAndNext}
            disabled={!profile.learningBehavior.studyHabits?.length || 
                     !profile.learningBehavior.procrastinationTendencies ||
                     !profile.learningBehavior.motivationalTriggers?.length ||
                     !profile.learningBehavior.preferredFeedbackFrequency ||
                     !profile.learningBehavior.errorToleranceLevel}
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