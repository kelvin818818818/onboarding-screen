import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface LearningGoalsStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const LearningGoalsStep: React.FC<LearningGoalsStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const primaryGoals = [
    { id: 'conversation', label: 'Daily Conversation', icon: '💬', description: 'Speak confidently in everyday situations' },
    { id: 'business', label: 'Business English', icon: '💼', description: 'Professional communication and presentations' },
    { id: 'academic', label: 'Academic Studies', icon: '🎓', description: 'University, research, or academic writing' },
    { id: 'travel', label: 'Travel & Tourism', icon: '✈️', description: 'Navigate and communicate while traveling' },
    { id: 'immigration', label: 'Immigration/Citizenship', icon: '🏠', description: 'Official tests and documentation' },
    { id: 'career', label: 'Career Advancement', icon: '📈', description: 'Job interviews and workplace success' },
    { id: 'culture', label: 'Cultural Understanding', icon: '🌍', description: 'Connect with English-speaking cultures' },
    { id: 'entertainment', label: 'Media & Entertainment', icon: '🎬', description: 'Enjoy movies, books, and shows' }
  ];

  const specificObjectives = [
    { id: 'ielts', label: 'IELTS Preparation', category: 'test' },
    { id: 'toefl', label: 'TOEFL Preparation', category: 'test' },
    { id: 'cambridge', label: 'Cambridge Exams', category: 'test' },
    { id: 'job_interview', label: 'Job Interviews', category: 'career' },
    { id: 'presentations', label: 'Public Speaking', category: 'business' },
    { id: 'writing', label: 'Academic Writing', category: 'academic' },
    { id: 'pronunciation', label: 'Accent Reduction', category: 'speaking' },
    { id: 'vocabulary', label: 'Vocabulary Building', category: 'general' }
  ];

  const timeframes = [
    { value: '1-3months', label: '1-3 Months', description: 'Intensive short-term goal' },
    { value: '3-6months', label: '3-6 Months', description: 'Focused improvement' },
    { value: '6-12months', label: '6-12 Months', description: 'Comprehensive development' },
    { value: '1-2years', label: '1-2 Years', description: 'Long-term mastery' },
    { value: 'ongoing', label: 'Ongoing', description: 'Continuous improvement' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'Learning for personal interest', color: '#22c55e' },
    { value: 'medium', label: 'Medium Priority', description: 'Important for future plans', color: '#eab308' },
    { value: 'high', label: 'High Priority', description: 'Need results soon', color: '#f97316' },
    { value: 'urgent', label: 'Urgent', description: 'Critical for immediate needs', color: '#ef4444' }
  ];

  const successMetrics = [
    { id: 'fluency', label: 'Speaking Fluency', icon: '🗣️' },
    { id: 'test_scores', label: 'Test Scores', icon: '📊' },
    { id: 'confidence', label: 'Confidence Level', icon: '💪' },
    { id: 'comprehension', label: 'Understanding', icon: '🧠' },
    { id: 'vocabulary_size', label: 'Vocabulary Size', icon: '📚' },
    { id: 'real_world', label: 'Real-world Usage', icon: '🌍' }
  ];

  const toggleGoal = (goalId: string) => {
    const current = profile.primaryGoals || [];
    const updated = current.includes(goalId)
      ? current.filter(id => id !== goalId)
      : [...current, goalId];
    onUpdate({ primaryGoals: updated });
  };

  const toggleObjective = (objectiveId: string) => {
    const current = profile.specificObjectives || [];
    const updated = current.includes(objectiveId)
      ? current.filter(id => id !== objectiveId)
      : [...current, objectiveId];
    onUpdate({ specificObjectives: updated });
  };

  const toggleSuccessMetric = (metricId: string) => {
    const current = profile.successMetrics || [];
    const updated = current.includes(metricId)
      ? current.filter(id => id !== metricId)
      : [...current, metricId];
    onUpdate({ successMetrics: updated });
  };

  return (
    <div className="card-content">
      <button 
        className="skip-btn" 
        onClick={onNext}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: '#6b7280',
          fontSize: '0.875rem',
          cursor: 'pointer',
          zIndex: 10,
          padding: '0.5rem',
          borderRadius: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f3f4f6';
          e.currentTarget.style.color = '#374151';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.color = '#6b7280';
        }}
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
          <div className="character-main">🎯</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            🚀
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            💪
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Your Learning Goals</h2>
          <p className="card-subtitle">Define what success looks like for you</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Primary Goals */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              What are your main goals? (Select multiple)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {primaryGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`option-btn ${profile.primaryGoals?.includes(goal.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '16px' }}>{goal.icon}</span>
                  <span style={{ fontWeight: '600' }}>{goal.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specific Objectives */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              Any specific objectives? (Optional)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {specificObjectives.map((objective) => (
                <button
                  key={objective.id}
                  onClick={() => toggleObjective(objective.id)}
                  className={`option-btn ${profile.specificObjectives?.includes(objective.id) ? 'selected' : ''}`}
                  style={{ fontSize: '12px', padding: '8px 6px' }}
                >
                  {objective.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              What's your timeframe?
            </p>
            <div style={{ display: 'grid', gap: '6px' }}>
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => onUpdate({ timeframe: timeframe.value })}
                  className={`option-btn ${profile.timeframe === timeframe.value ? 'selected' : ''}`}
                  style={{ textAlign: 'left', padding: '10px 12px' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{timeframe.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{timeframe.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How urgent is this for you?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {urgencyLevels.map((urgency) => (
                <button
                  key={urgency.value}
                  onClick={() => onUpdate({ urgency: urgency.value })}
                  className={`option-btn ${profile.urgency === urgency.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'center', 
                    padding: '10px 8px',
                    borderColor: profile.urgency === urgency.value ? urgency.color : undefined
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px', fontSize: '12px' }}>{urgency.label}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7 }}>{urgency.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
              How will you measure success? (Optional)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {successMetrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => toggleSuccessMetric(metric.id)}
                  className={`option-btn ${profile.successMetrics?.includes(metric.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '10px', 
                    padding: '8px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{metric.icon}</span>
                  <span>{metric.label}</span>
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
            disabled={!profile.primaryGoals?.length || !profile.timeframe}
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