import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface ContextualAnalysisStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  aiProcessing?: boolean;
}

export const ContextualAnalysisStep: React.FC<ContextualAnalysisStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  aiProcessing
}) => {
  const workEnvironments = [
    { id: 'corporate', label: 'Corporate Office', description: 'Traditional business environment', icon: '🏢' },
    { id: 'startup', label: 'Startup/Tech', description: 'Fast-paced, innovative environment', icon: '🚀' },
    { id: 'remote', label: 'Remote Work', description: 'Working from home or distributed team', icon: '🏠' },
    { id: 'academic', label: 'Academic/Research', description: 'University or research institution', icon: '🎓' },
    { id: 'healthcare', label: 'Healthcare', description: 'Medical or healthcare setting', icon: '🏥' },
    { id: 'education', label: 'Education', description: 'Teaching or educational environment', icon: '📚' },
    { id: 'freelance', label: 'Freelance/Consulting', description: 'Independent contractor work', icon: '💼' },
    { id: 'retail', label: 'Retail/Service', description: 'Customer-facing service industry', icon: '🛍️' },
    { id: 'manufacturing', label: 'Manufacturing/Industrial', description: 'Production or industrial setting', icon: '🏭' },
    { id: 'non_profit', label: 'Non-Profit', description: 'NGO or charitable organization', icon: '❤️' },
    { id: 'government', label: 'Government', description: 'Public sector or government agency', icon: '🏛️' },
    { id: 'student', label: 'Student', description: 'Currently studying', icon: '📖' }
  ];

  const dailyUsageOptions = [
    { value: 'none', label: 'No Daily Use', description: 'I rarely use English in daily life', percentage: '0-5%' },
    { value: 'minimal', label: 'Minimal Use', description: 'Occasional English interactions', percentage: '5-20%' },
    { value: 'moderate', label: 'Moderate Use', description: 'Regular but not constant use', percentage: '20-50%' },
    { value: 'frequent', label: 'Frequent Use', description: 'English is part of my daily routine', percentage: '50-80%' },
    { value: 'constant', label: 'Constant Use', description: 'English dominates my daily communication', percentage: '80-100%' }
  ];

  const communicationNeeds = [
    { id: 'presentations', label: 'Presentations', description: 'Giving presentations to groups', icon: '📊' },
    { id: 'meetings', label: 'Meetings', description: 'Participating in business meetings', icon: '👥' },
    { id: 'emails', label: 'Email Communication', description: 'Professional email correspondence', icon: '📧' },
    { id: 'phone_calls', label: 'Phone/Video Calls', description: 'Remote communication', icon: '📞' },
    { id: 'client_interaction', label: 'Client Interaction', description: 'Direct customer/client communication', icon: '🤝' },
    { id: 'team_collaboration', label: 'Team Collaboration', description: 'Working with international teams', icon: '🌐' },
    { id: 'technical_writing', label: 'Technical Writing', description: 'Documentation and technical content', icon: '📝' },
    { id: 'social_networking', label: 'Professional Networking', description: 'Building professional relationships', icon: '🔗' },
    { id: 'training', label: 'Training/Teaching', description: 'Educating others in English', icon: '🎯' },
    { id: 'negotiations', label: 'Negotiations', description: 'Business negotiations and deals', icon: '💼' }
  ];

  const professionalRequirements = [
    { id: 'certification', label: 'English Certification Required', description: 'Job requires official English certification', icon: '🏆' },
    { id: 'promotion', label: 'Career Advancement', description: 'English needed for promotion opportunities', icon: '📈' },
    { id: 'international_travel', label: 'International Travel', description: 'Job involves traveling to English-speaking countries', icon: '✈️' },
    { id: 'global_team', label: 'Global Team Leadership', description: 'Managing international teams', icon: '🌍' },
    { id: 'client_facing', label: 'Client-Facing Role', description: 'Direct interaction with English-speaking clients', icon: '👔' },
    { id: 'content_creation', label: 'Content Creation', description: 'Creating content in English', icon: '✍️' },
    { id: 'conference_speaking', label: 'Conference Speaking', description: 'Speaking at international conferences', icon: '🎤' },
    { id: 'research_publication', label: 'Research Publication', description: 'Publishing research in English', icon: '📄' }
  ];

  const personalCircumstances = [
    { id: 'immigration', label: 'Immigration Plans', description: 'Planning to move to English-speaking country', icon: '🏠' },
    { id: 'family_abroad', label: 'Family Abroad', description: 'Family members in English-speaking countries', icon: '👨‍👩‍👧‍👦' },
    { id: 'spouse_english', label: 'English-Speaking Partner', description: 'Partner/spouse speaks English', icon: '💑' },
    { id: 'children_education', label: 'Children\'s Education', description: 'Helping children with English education', icon: '👶' },
    { id: 'travel_hobby', label: 'Travel Enthusiast', description: 'Love traveling to English-speaking destinations', icon: '🗺️' },
    { id: 'media_consumption', label: 'English Media', description: 'Enjoy English movies, books, podcasts', icon: '🎬' },
    { id: 'online_communities', label: 'Online Communities', description: 'Active in English-speaking online communities', icon: '💻' },
    { id: 'volunteer_work', label: 'Volunteer Work', description: 'Volunteering with English-speaking organizations', icon: '🤲' }
  ];

  const toggleCommunicationNeed = (needId: string) => {
    const current = profile.learningContext.communicationNeeds || [];
    const updated = current.includes(needId)
      ? current.filter(id => id !== needId)
      : [...current, needId];
    
    onUpdate({
      learningContext: {
        ...profile.learningContext,
        communicationNeeds: updated
      }
    });
  };

  const toggleProfessionalRequirement = (reqId: string) => {
    const current = profile.learningContext.professionalRequirements || [];
    const updated = current.includes(reqId)
      ? current.filter(id => id !== reqId)
      : [...current, reqId];
    
    onUpdate({
      learningContext: {
        ...profile.learningContext,
        professionalRequirements: updated
      }
    });
  };

  const togglePersonalCircumstance = (circId: string) => {
    const current = profile.learningContext.personalCircumstances || [];
    const updated = current.includes(circId)
      ? current.filter(id => id !== circId)
      : [...current, circId];
    
    onUpdate({
      learningContext: {
        ...profile.learningContext,
        personalCircumstances: updated
      }
    });
  };

  const updateLearningContext = (key: keyof UserProfile['learningContext'], value: any) => {
    onUpdate({
      learningContext: {
        ...profile.learningContext,
        [key]: value
      }
    });
  };

  const validateAndNext = () => {
    if (!profile.learningContext.workEnvironment || 
        !profile.learningContext.dailyEnglishUsage ||
        !profile.learningContext.communicationNeeds?.length) {
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
          <div className="character-main">🌍</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            🏢
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            💼
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ scale: [1, 1.1, 1], x: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎯
          </motion.div>
        </motion.div>

        <motion.div
          className="card-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="card-title">Contextual Learning Analysis</h2>
          <p className="card-subtitle">Understanding your real-world English usage context</p>
          {aiProcessing && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-green-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
              <span className="text-sm">Analyzing contextual requirements...</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Work Environment */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What's your work/study environment?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {workEnvironments.map((env) => (
                <button
                  key={env.id}
                  onClick={() => updateLearningContext('workEnvironment', env.id)}
                  className={`option-btn ${profile.learningContext.workEnvironment === env.id ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '16px' }}>{env.icon}</span>
                  <span style={{ fontWeight: '600' }}>{env.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{env.description}</span>
                </button>
              ))}
            </div>
            {!profile.learningContext.workEnvironment && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your work environment
              </p>
            )}
          </div>

          {/* Daily English Usage */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How much English do you use daily?
            </h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {dailyUsageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateLearningContext('dailyEnglishUsage', option.value)}
                  className={`option-btn ${profile.learningContext.dailyEnglishUsage === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                      <div style={{ fontSize: '12px', opacity: 0.7 }}>{option.description}</div>
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6366f1',
                      background: '#f0f9ff',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {option.percentage}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {!profile.learningContext.dailyEnglishUsage && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your daily English usage level
              </p>
            )}
          </div>

          {/* Communication Needs */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What communication skills do you need? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {communicationNeeds.map((need) => (
                <button
                  key={need.id}
                  onClick={() => toggleCommunicationNeed(need.id)}
                  className={`option-btn ${profile.learningContext.communicationNeeds?.includes(need.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '16px' }}>{need.icon}</span>
                  <span style={{ fontWeight: '600' }}>{need.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{need.description}</span>
                </button>
              ))}
            </div>
            {profile.learningContext.communicationNeeds?.length === 0 && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select at least one communication need
              </p>
            )}
          </div>

          {/* Professional Requirements */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Professional requirements (Optional)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {professionalRequirements.map((req) => (
                <button
                  key={req.id}
                  onClick={() => toggleProfessionalRequirement(req.id)}
                  className={`option-btn ${profile.learningContext.professionalRequirements?.includes(req.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '14px' }}>{req.icon}</span>
                  <span style={{ fontWeight: '600' }}>{req.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '9px' }}>{req.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Circumstances */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Personal circumstances (Optional)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {personalCircumstances.map((circ) => (
                <button
                  key={circ.id}
                  onClick={() => togglePersonalCircumstance(circ.id)}
                  className={`option-btn ${profile.learningContext.personalCircumstances?.includes(circ.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '14px' }}>{circ.icon}</span>
                  <span style={{ fontWeight: '600' }}>{circ.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '9px' }}>{circ.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Insights */}
          {profile.learningContext.workEnvironment && profile.learningContext.communicationNeeds?.length > 0 && (
            <div style={{ 
              marginTop: '20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              borderRadius: '12px', 
              padding: '16px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎯 Contextual Learning Plan
              </h4>
              <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Primary Focus:</strong> {
                    profile.learningContext.communicationNeeds.includes('presentations') ? 'Public Speaking & Presentations' :
                    profile.learningContext.communicationNeeds.includes('meetings') ? 'Business Meeting Communication' :
                    profile.learningContext.communicationNeeds.includes('client_interaction') ? 'Client Relations & Service' :
                    'Professional Communication Skills'
                  }
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Learning Priority:</strong> {
                    profile.learningContext.dailyEnglishUsage === 'constant' ? 'Advanced fluency and nuanced communication' :
                    profile.learningContext.dailyEnglishUsage === 'frequent' ? 'Professional proficiency development' :
                    profile.learningContext.dailyEnglishUsage === 'moderate' ? 'Practical communication skills' :
                    'Foundation building with real-world application'
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
            disabled={!profile.learningContext.workEnvironment || 
                     !profile.learningContext.dailyEnglishUsage ||
                     !profile.learningContext.communicationNeeds?.length}
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