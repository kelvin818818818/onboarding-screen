import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface AdaptivePreferencesStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  aiProcessing?: boolean;
}

export const AdaptivePreferencesStep: React.FC<AdaptivePreferencesStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  aiProcessing
}) => {
  const topicAreas = [
    { id: 'business_finance', label: 'Business & Finance', description: 'Corporate communication, financial terms', icon: '💼' },
    { id: 'technology', label: 'Technology & Innovation', description: 'Tech terminology, digital communication', icon: '💻' },
    { id: 'healthcare', label: 'Healthcare & Medicine', description: 'Medical terminology, patient communication', icon: '🏥' },
    { id: 'education', label: 'Education & Academia', description: 'Academic writing, research communication', icon: '🎓' },
    { id: 'travel_tourism', label: 'Travel & Tourism', description: 'Travel vocabulary, cultural communication', icon: '✈️' },
    { id: 'arts_culture', label: 'Arts & Culture', description: 'Creative expression, cultural discussions', icon: '🎨' },
    { id: 'science_research', label: 'Science & Research', description: 'Scientific terminology, research methods', icon: '🔬' },
    { id: 'sports_fitness', label: 'Sports & Fitness', description: 'Athletic terminology, health discussions', icon: '⚽' },
    { id: 'food_cooking', label: 'Food & Cooking', description: 'Culinary vocabulary, restaurant communication', icon: '🍳' },
    { id: 'environment', label: 'Environment & Sustainability', description: 'Environmental topics, green technology', icon: '🌱' },
    { id: 'politics_society', label: 'Politics & Society', description: 'Current events, social discussions', icon: '🏛️' },
    { id: 'entertainment', label: 'Entertainment & Media', description: 'Movies, music, pop culture', icon: '🎬' }
  ];

  const difficultyProgressionOptions = [
    { value: 'very_gradual', label: 'Very Gradual', description: 'Extremely slow progression, lots of repetition', icon: '🐌' },
    { value: 'gradual', label: 'Gradual', description: 'Steady, comfortable progression', icon: '📈' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced progression with some challenge', icon: '⚖️' },
    { value: 'accelerated', label: 'Accelerated', description: 'Faster progression, more challenging', icon: '🚀' },
    { value: 'adaptive', label: 'AI-Adaptive', description: 'Let AI determine optimal progression', icon: '🤖' }
  ];

  const contentFormats = [
    { id: 'video_lessons', label: 'Video Lessons', description: 'Structured video content with subtitles', icon: '📹' },
    { id: 'interactive_exercises', label: 'Interactive Exercises', description: 'Hands-on practice activities', icon: '🎮' },
    { id: 'audio_content', label: 'Audio Content', description: 'Podcasts, listening exercises', icon: '🎧' },
    { id: 'reading_materials', label: 'Reading Materials', description: 'Articles, stories, texts', icon: '📚' },
    { id: 'live_sessions', label: 'Live Sessions', description: 'Real-time classes with instructors', icon: '👨‍🏫' },
    { id: 'peer_interaction', label: 'Peer Interaction', description: 'Group activities and discussions', icon: '👥' },
    { id: 'ai_conversations', label: 'AI Conversations', description: 'Practice with AI tutors', icon: '🤖' },
    { id: 'gamified_content', label: 'Gamified Content', description: 'Learning through games and challenges', icon: '🎯' },
    { id: 'real_world_scenarios', label: 'Real-World Scenarios', description: 'Practical situation practice', icon: '🌍' },
    { id: 'assessment_quizzes', label: 'Assessment Quizzes', description: 'Regular testing and evaluation', icon: '📝' }
  ];

  const interactivityLevels = [
    { value: 'passive', label: 'Passive Learning', description: 'Mostly consuming content (reading, watching)', icon: '👁️' },
    { value: 'low', label: 'Low Interactivity', description: 'Some exercises and simple interactions', icon: '👆' },
    { value: 'moderate', label: 'Moderate Interactivity', description: 'Regular exercises and feedback', icon: '✋' },
    { value: 'high', label: 'High Interactivity', description: 'Frequent interactions and practice', icon: '🙌' },
    { value: 'maximum', label: 'Maximum Interactivity', description: 'Constant engagement and participation', icon: '🎪' }
  ];

  const realWorldRelevanceOptions = [
    { value: 'academic', label: 'Academic Focus', description: 'Theoretical knowledge and formal language', icon: '🎓' },
    { value: 'practical', label: 'Practical Focus', description: 'Real-world application and everyday use', icon: '🛠️' },
    { value: 'professional', label: 'Professional Focus', description: 'Workplace and career-oriented content', icon: '💼' },
    { value: 'personal', label: 'Personal Focus', description: 'Daily life and personal interests', icon: '🏠' },
    { value: 'mixed', label: 'Mixed Approach', description: 'Combination of all contexts', icon: '🎭' }
  ];

  const toggleTopicArea = (topicId: string) => {
    const current = profile.contentPreferences.topicAreas || [];
    const updated = current.includes(topicId)
      ? current.filter(id => id !== topicId)
      : [...current, topicId];
    
    onUpdate({
      contentPreferences: {
        ...profile.contentPreferences,
        topicAreas: updated
      }
    });
  };

  const toggleContentFormat = (formatId: string) => {
    const current = profile.contentPreferences.contentFormat || [];
    const updated = current.includes(formatId)
      ? current.filter(id => id !== formatId)
      : [...current, formatId];
    
    onUpdate({
      contentPreferences: {
        ...profile.contentPreferences,
        contentFormat: updated
      }
    });
  };

  const updateContentPreference = (key: keyof UserProfile['contentPreferences'], value: any) => {
    onUpdate({
      contentPreferences: {
        ...profile.contentPreferences,
        [key]: value
      }
    });
  };

  const validateAndNext = () => {
    if (!profile.contentPreferences.topicAreas?.length || 
        !profile.contentPreferences.difficultyProgression ||
        !profile.contentPreferences.contentFormat?.length ||
        !profile.contentPreferences.interactivityLevel ||
        !profile.contentPreferences.realWorldRelevance) {
      return;
    }
    onNext();
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
          <div className="character-main">⚙️</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            🎯
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            📊
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ x: [-5, 5, -5], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🤖
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Adaptive Content Preferences</h2>
          <p className="card-subtitle">Fine-tune your personalized learning experience</p>
          {aiProcessing && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-purple-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
              <span className="text-sm">Optimizing content preferences...</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Topic Areas */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Which topic areas interest you most? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {topicAreas.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopicArea(topic.id)}
                  className={`option-btn ${profile.contentPreferences.topicAreas?.includes(topic.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '10px', 
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{topic.icon}</span>
                  <span style={{ fontWeight: '600' }}>{topic.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '9px' }}>{topic.description}</span>
                </button>
              ))}
            </div>
            {profile.contentPreferences.topicAreas?.length === 0 && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select at least one topic area
              </p>
            )}
          </div>

          {/* Difficulty Progression */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How should difficulty progress?
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {difficultyProgressionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateContentPreference('difficultyProgression', option.value)}
                  className={`option-btn ${profile.contentPreferences.difficultyProgression === option.value ? 'selected' : ''}`}
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
            {!profile.contentPreferences.difficultyProgression && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select a difficulty progression style
              </p>
            )}
          </div>

          {/* Content Formats */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Preferred content formats (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {contentFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => toggleContentFormat(format.id)}
                  className={`option-btn ${profile.contentPreferences.contentFormat?.includes(format.id) ? 'selected' : ''}`}
                  style={{ 
                    fontSize: '10px', 
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{format.icon}</span>
                  <span style={{ fontWeight: '600' }}>{format.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '9px' }}>{format.description}</span>
                </button>
              ))}
            </div>
            {profile.contentPreferences.contentFormat?.length === 0 && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select at least one content format
              </p>
            )}
          </div>

          {/* Interactivity Level */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How interactive should your learning be?
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {interactivityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => updateContentPreference('interactivityLevel', level.value)}
                  className={`option-btn ${profile.contentPreferences.interactivityLevel === level.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{level.icon}</span>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>{level.label}</div>
                      <div style={{ fontSize: '12px', opacity: 0.7 }}>{level.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {!profile.contentPreferences.interactivityLevel && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select an interactivity level
              </p>
            )}
          </div>

          {/* Real-World Relevance */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What type of real-world relevance do you prefer?
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {realWorldRelevanceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateContentPreference('realWorldRelevance', option.value)}
                  className={`option-btn ${profile.contentPreferences.realWorldRelevance === option.value ? 'selected' : ''}`}
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
            {!profile.contentPreferences.realWorldRelevance && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select a real-world relevance preference
              </p>
            )}
          </div>

          {/* Adaptive Learning Preview */}
          {profile.contentPreferences.topicAreas?.length > 0 && profile.contentPreferences.contentFormat?.length > 0 && (
            <div style={{ 
              marginTop: '20px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
              borderRadius: '12px', 
              padding: '16px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🤖 Adaptive Learning Preview
              </h4>
              <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Content Focus:</strong> {profile.contentPreferences.topicAreas.slice(0, 2).join(', ')}
                  {profile.contentPreferences.topicAreas.length > 2 && ` +${profile.contentPreferences.topicAreas.length - 2} more`}
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Learning Style:</strong> {
                    profile.contentPreferences.interactivityLevel === 'maximum' ? 'Highly Interactive & Engaging' :
                    profile.contentPreferences.interactivityLevel === 'high' ? 'Interactive with Regular Practice' :
                    profile.contentPreferences.interactivityLevel === 'moderate' ? 'Balanced Learning Approach' :
                    'Content-Focused Learning'
                  }
                </p>
                <p style={{ margin: '0' }}>
                  <strong>AI Optimization:</strong> {
                    profile.contentPreferences.difficultyProgression === 'adaptive' ? 'Full AI adaptation based on performance' :
                    'Personalized progression with AI insights'
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
            disabled={!profile.contentPreferences.topicAreas?.length || 
                     !profile.contentPreferences.difficultyProgression ||
                     !profile.contentPreferences.contentFormat?.length ||
                     !profile.contentPreferences.interactivityLevel ||
                     !profile.contentPreferences.realWorldRelevance}
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