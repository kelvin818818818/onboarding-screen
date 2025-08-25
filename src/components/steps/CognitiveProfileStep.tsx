import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface CognitiveProfileStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  aiProcessing?: boolean;
}

export const CognitiveProfileStep: React.FC<CognitiveProfileStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  aiProcessing
}) => {
  const memoryStrengths = [
    { id: 'visual_memory', label: 'Visual Memory', description: 'Remember images, charts, and visual patterns', icon: '👁️' },
    { id: 'auditory_memory', label: 'Auditory Memory', description: 'Remember sounds, music, and spoken information', icon: '👂' },
    { id: 'kinesthetic_memory', label: 'Kinesthetic Memory', description: 'Remember through movement and touch', icon: '✋' },
    { id: 'verbal_memory', label: 'Verbal Memory', description: 'Remember words, names, and linguistic information', icon: '💬' },
    { id: 'spatial_memory', label: 'Spatial Memory', description: 'Remember locations and spatial relationships', icon: '🗺️' },
    { id: 'sequential_memory', label: 'Sequential Memory', description: 'Remember order and sequences', icon: '🔢' }
  ];

  const processingSpeedOptions = [
    { value: 'very_fast', label: 'Very Fast', description: 'I process information quickly and prefer rapid pace', color: '#10b981' },
    { value: 'fast', label: 'Fast', description: 'I like a good pace but not overwhelming', color: '#22c55e' },
    { value: 'moderate', label: 'Moderate', description: 'I prefer a balanced, steady pace', color: '#eab308' },
    { value: 'slow', label: 'Deliberate', description: 'I like to take time to process thoroughly', color: '#f97316' },
    { value: 'very_slow', label: 'Very Deliberate', description: 'I need extra time to process information', color: '#ef4444' }
  ];

  const attentionSpanOptions = [
    { value: 'very_short', label: '5-10 minutes', description: 'Short bursts work best for me' },
    { value: 'short', label: '10-20 minutes', description: 'I prefer brief, focused sessions' },
    { value: 'moderate', label: '20-45 minutes', description: 'Standard lesson length is good' },
    { value: 'long', label: '45-90 minutes', description: 'I can focus for extended periods' },
    { value: 'very_long', label: '90+ minutes', description: 'I enjoy deep, immersive sessions' }
  ];

  const learningDisabilities = [
    { id: 'dyslexia', label: 'Dyslexia', description: 'Difficulty with reading and word recognition', icon: '📖' },
    { id: 'adhd', label: 'ADHD', description: 'Attention and focus challenges', icon: '🎯' },
    { id: 'auditory_processing', label: 'Auditory Processing', description: 'Difficulty processing spoken information', icon: '👂' },
    { id: 'visual_processing', label: 'Visual Processing', description: 'Difficulty processing visual information', icon: '👁️' },
    { id: 'working_memory', label: 'Working Memory Issues', description: 'Difficulty holding information in mind', icon: '🧠' },
    { id: 'none', label: 'None', description: 'No known learning disabilities', icon: '✅' }
  ];

  const cognitiveLoadOptions = [
    { value: 'minimal', label: 'Minimal Load', description: 'Simple, one-concept-at-a-time approach', icon: '🎯' },
    { value: 'light', label: 'Light Load', description: 'Few concepts with clear connections', icon: '🔗' },
    { value: 'moderate', label: 'Moderate Load', description: 'Balanced complexity with good structure', icon: '⚖️' },
    { value: 'heavy', label: 'Heavy Load', description: 'Complex, multi-layered information', icon: '🧩' },
    { value: 'maximum', label: 'Maximum Load', description: 'Dense, interconnected concepts', icon: '🌐' }
  ];

  const toggleMemoryStrength = (strengthId: string) => {
    const current = profile.cognitiveProfile.memoryStrength || [];
    const updated = current.includes(strengthId)
      ? current.filter(id => id !== strengthId)
      : [...current, strengthId];
    
    onUpdate({
      cognitiveProfile: {
        ...profile.cognitiveProfile,
        memoryStrength: updated
      }
    });
  };

  const toggleLearningDisability = (disabilityId: string) => {
    const current = profile.cognitiveProfile.learningDisabilities || [];
    let updated;
    
    if (disabilityId === 'none') {
      updated = current.includes('none') ? [] : ['none'];
    } else {
      updated = current.includes(disabilityId)
        ? current.filter(id => id !== disabilityId)
        : [...current.filter(id => id !== 'none'), disabilityId];
    }
    
    onUpdate({
      cognitiveProfile: {
        ...profile.cognitiveProfile,
        learningDisabilities: updated
      }
    });
  };

  const updateCognitiveProfile = (key: keyof UserProfile['cognitiveProfile'], value: any) => {
    onUpdate({
      cognitiveProfile: {
        ...profile.cognitiveProfile,
        [key]: value
      }
    });
  };

  const validateAndNext = () => {
    if (!profile.cognitiveProfile.memoryStrength?.length || 
        !profile.cognitiveProfile.processingSpeed || 
        !profile.cognitiveProfile.attentionSpan ||
        !profile.cognitiveProfile.cognitiveLoadPreference) {
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
          <div className="character-main">🧠</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            💡
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ x: [-5, 5, -5] }}
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
          <h2 className="card-title">Cognitive Profile Assessment</h2>
          <p className="card-subtitle">Help us understand how your mind processes information</p>
          {aiProcessing && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-purple-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
              <span className="text-sm">AI analyzing your cognitive patterns...</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Memory Strengths */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What types of memory work best for you? (Select multiple)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {memoryStrengths.map((strength) => (
                <button
                  key={strength.id}
                  onClick={() => toggleMemoryStrength(strength.id)}
                  className={`option-btn ${profile.cognitiveProfile.memoryStrength?.includes(strength.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '18px' }}>{strength.icon}</span>
                  <span style={{ fontWeight: '600' }}>{strength.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{strength.description}</span>
                </button>
              ))}
            </div>
            {profile.cognitiveProfile.memoryStrength?.length === 0 && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select at least one memory strength
              </p>
            )}
          </div>

          {/* Processing Speed */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              What's your preferred information processing speed?
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {processingSpeedOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateCognitiveProfile('processingSpeed', option.value)}
                  className={`option-btn ${profile.cognitiveProfile.processingSpeed === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px',
                    borderLeft: profile.cognitiveProfile.processingSpeed === option.value ? `4px solid ${option.color}` : '4px solid transparent'
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>{option.description}</div>
                </button>
              ))}
            </div>
            {!profile.cognitiveProfile.processingSpeed && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your processing speed preference
              </p>
            )}
          </div>

          {/* Attention Span */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How long can you typically focus on learning?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {attentionSpanOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateCognitiveProfile('attentionSpan', option.value)}
                  className={`option-btn ${profile.cognitiveProfile.attentionSpan === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'center', 
                    padding: '12px 8px'
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{option.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{option.description}</div>
                </button>
              ))}
            </div>
            {!profile.cognitiveProfile.attentionSpan && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your attention span
              </p>
            )}
          </div>

          {/* Learning Disabilities */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Do you have any learning differences we should know about?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {learningDisabilities.map((disability) => (
                <button
                  key={disability.id}
                  onClick={() => toggleLearningDisability(disability.id)}
                  className={`option-btn ${profile.cognitiveProfile.learningDisabilities?.includes(disability.id) ? 'selected' : ''}`}
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
                  <span style={{ fontSize: '16px' }}>{disability.icon}</span>
                  <span style={{ fontWeight: '600' }}>{disability.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '10px' }}>{disability.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cognitive Load Preference */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              How much complexity do you prefer in learning materials?
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {cognitiveLoadOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateCognitiveProfile('cognitiveLoadPreference', option.value)}
                  className={`option-btn ${profile.cognitiveProfile.cognitiveLoadPreference === option.value ? 'selected' : ''}`}
                  style={{ 
                    textAlign: 'left', 
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{option.icon}</span>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>{option.label}</div>
                      <div style={{ fontSize: '12px', opacity: 0.7 }}>{option.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {!profile.cognitiveProfile.cognitiveLoadPreference && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
                Please select your cognitive load preference
              </p>
            )}
          </div>

          {/* AI Insights */}
          {profile.cognitiveProfile.memoryStrength?.length > 0 && (
            <div style={{ 
              marginTop: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              borderRadius: '12px', 
              padding: '16px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🤖 AI Cognitive Analysis
              </h4>
              <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Detected Learning Style:</strong> {
                    profile.cognitiveProfile.memoryStrength.includes('visual_memory') ? 'Visual-Spatial Learner' :
                    profile.cognitiveProfile.memoryStrength.includes('auditory_memory') ? 'Auditory Learner' :
                    profile.cognitiveProfile.memoryStrength.includes('kinesthetic_memory') ? 'Kinesthetic Learner' :
                    'Multi-Modal Learner'
                  }
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Recommended Approach:</strong> {
                    profile.cognitiveProfile.processingSpeed === 'very_fast' ? 'Fast-paced, challenge-based learning' :
                    profile.cognitiveProfile.processingSpeed === 'very_slow' ? 'Gentle, step-by-step progression' :
                    'Balanced pacing with adaptive difficulty'
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
            disabled={!profile.cognitiveProfile.memoryStrength?.length || 
                     !profile.cognitiveProfile.processingSpeed || 
                     !profile.cognitiveProfile.attentionSpan ||
                     !profile.cognitiveProfile.cognitiveLoadPreference}
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