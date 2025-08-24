import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface AssessmentStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const AssessmentStep: React.FC<AssessmentStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const diagnosticQuestions = [
    {
      id: 1,
      type: 'grammar',
      question: 'Choose the correct sentence:',
      options: [
        'I have been living here since five years.',
        'I have been living here for five years.',
        'I am living here since five years.',
        'I live here since five years.'
      ],
      correct: 1,
      skill: 'grammar'
    },
    {
      id: 2,
      type: 'vocabulary',
      question: 'What does "procrastinate" mean?',
      options: [
        'To work very quickly',
        'To delay or postpone tasks',
        'To organize efficiently',
        'To complete ahead of schedule'
      ],
      correct: 1,
      skill: 'vocabulary'
    },
    {
      id: 3,
      type: 'reading',
      question: 'Based on the context: "The weather was inclement, so we decided to stay indoors." What does "inclement" mean?',
      options: [
        'Beautiful and sunny',
        'Harsh or severe',
        'Mild and pleasant',
        'Unpredictable'
      ],
      correct: 1,
      skill: 'comprehension'
    },
    {
      id: 4,
      type: 'grammar',
      question: 'Which sentence uses the subjunctive mood correctly?',
      options: [
        'If I was rich, I would travel the world.',
        'If I were rich, I would travel the world.',
        'If I am rich, I would travel the world.',
        'If I will be rich, I would travel the world.'
      ],
      correct: 1,
      skill: 'grammar'
    },
    {
      id: 5,
      type: 'business',
      question: 'In a business context, what does "leverage" typically mean?',
      options: [
        'To lift something heavy',
        'To use something to maximum advantage',
        'To negotiate a contract',
        'To measure performance'
      ],
      correct: 1,
      skill: 'businessEnglish'
    }
  ];

  const assessmentPreferences = [
    { id: 'frequent', label: 'Frequent Mini-Assessments', description: 'Short quizzes after each lesson', icon: '⚡' },
    { id: 'weekly', label: 'Weekly Comprehensive Tests', description: 'Detailed assessments covering multiple skills', icon: '📊' },
    { id: 'milestone', label: 'Milestone Evaluations', description: 'Major assessments at key learning points', icon: '🎯' },
    { id: 'adaptive', label: 'Adaptive Testing', description: 'AI-powered assessments that adjust to your level', icon: '🤖' },
    { id: 'peer', label: 'Peer Assessments', description: 'Evaluate and be evaluated by other learners', icon: '👥' },
    { id: 'self', label: 'Self-Assessment Tools', description: 'Reflect on your own progress and understanding', icon: '🪞' }
  ];

  const feedbackPreferences = [
    { id: 'immediate', label: 'Immediate Feedback', description: 'Get corrections and explanations right away', icon: '⚡' },
    { id: 'detailed', label: 'Detailed Analysis', description: 'Comprehensive breakdown of strengths and weaknesses', icon: '📋' },
    { id: 'encouraging', label: 'Encouraging Tone', description: 'Positive, motivational feedback style', icon: '🌟' },
    { id: 'constructive', label: 'Constructive Criticism', description: 'Direct, actionable improvement suggestions', icon: '🔧' },
    { id: 'comparative', label: 'Progress Comparison', description: 'See how you\'re improving over time', icon: '📈' },
    { id: 'gamified', label: 'Gamified Feedback', description: 'Points, badges, and achievement-based feedback', icon: '🏆' }
  ];

  const learningStyleQuestions = [
    {
      question: 'When learning new vocabulary, you prefer to:',
      options: [
        'See words in context with visual examples',
        'Hear pronunciation and use in conversations',
        'Write words multiple times and create flashcards',
        'Practice using words in real situations'
      ],
      styles: ['visual', 'auditory', 'kinesthetic', 'practical']
    },
    {
      question: 'For grammar rules, you learn best by:',
      options: [
        'Studying charts and visual explanations',
        'Listening to explanations and examples',
        'Doing lots of practice exercises',
        'Using grammar in real conversations'
      ],
      styles: ['visual', 'auditory', 'kinesthetic', 'practical']
    },
    {
      question: 'When you make mistakes, you prefer:',
      options: [
        'Immediate correction with explanation',
        'Gentle guidance to self-correct',
        'Detailed analysis after completion',
        'Peer feedback and discussion'
      ],
      styles: ['direct', 'supportive', 'analytical', 'collaborative']
    }
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex.toString()
    }));
  };

  const calculateDiagnosticScore = () => {
    let totalScore = 0;
    let skillScores: { [key: string]: number } = {};
    
    diagnosticQuestions.forEach((question, index) => {
      const userAnswer = parseInt(answers[index] || '0');
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) {
        totalScore += 20; // Each question worth 20 points
        skillScores[question.skill] = (skillScores[question.skill] || 0) + 1;
      }
    });

    return { totalScore, skillScores };
  };

  const toggleAssessmentPreference = (prefId: string) => {
    const current = profile.assessmentPreferences || [];
    const updated = current.includes(prefId)
      ? current.filter(id => id !== prefId)
      : [...current, prefId];
    onUpdate({ assessmentPreferences: updated });
  };

  const handleNext = () => {
    const { totalScore, skillScores } = calculateDiagnosticScore();
    
    // Update skill levels based on diagnostic results
    const updatedSkillLevels = { ...profile.skillLevels };
    Object.entries(skillScores).forEach(([skill, score]) => {
      updatedSkillLevels[skill as keyof typeof updatedSkillLevels] = Math.min(10, score * 2 + 3);
    });

    onUpdate({
      initialAssessmentScore: totalScore,
      diagnosticResults: skillScores,
      skillLevels: updatedSkillLevels
    });
    
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
          <div className="character-main">🧠</div>
          <motion.div
            className="floating-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            📊
          </motion.div>
          <motion.div
            className="floating-element"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
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
          <h2 className="card-title">Diagnostic Assessment</h2>
          <p className="card-subtitle">Let's evaluate your current English proficiency</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          {/* Diagnostic Questions */}
          {currentQuestion < diagnosticQuestions.length && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '12px', 
                padding: '16px', 
                marginBottom: '16px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#6366f1' }}>
                    Question {currentQuestion + 1} of {diagnosticQuestions.length}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    background: '#6366f1', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '6px' 
                  }}>
                    {diagnosticQuestions[currentQuestion].skill}
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  {diagnosticQuestions[currentQuestion].question}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {diagnosticQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQuestion, index)}
                      className={`option-btn ${answers[currentQuestion] === index.toString() ? 'selected' : ''}`}
                      style={{ textAlign: 'left', padding: '12px 16px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: answers[currentQuestion] === index.toString() ? '#6366f1' : '#e5e7eb',
                          color: answers[currentQuestion] === index.toString() ? 'white' : '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginRight: '12px'
                        }}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="back-btn"
                  style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentQuestion < diagnosticQuestions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    }
                  }}
                  disabled={!answers[currentQuestion]}
                  className="primary-btn"
                  style={{ 
                    opacity: !answers[currentQuestion] ? 0.5 : 1,
                    marginBottom: 0,
                    minWidth: '100px'
                  }}
                >
                  {currentQuestion === diagnosticQuestions.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          )}

          {/* Assessment Preferences */}
          {currentQuestion >= diagnosticQuestions.length && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
                  How would you like to be assessed? (Select multiple)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {assessmentPreferences.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => toggleAssessmentPreference(pref.id)}
                      className={`option-btn ${profile.assessmentPreferences?.includes(pref.id) ? 'selected' : ''}`}
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
                      <span style={{ fontSize: '16px' }}>{pref.icon}</span>
                      <span style={{ fontWeight: '600' }}>{pref.label}</span>
                      <span style={{ opacity: 0.7, fontSize: '10px' }}>{pref.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
                  Feedback Preferences (Select multiple)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {feedbackPreferences.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => {
                        const current = profile.interactionStyles || [];
                        const updated = current.includes(pref.id)
                          ? current.filter(id => id !== pref.id)
                          : [...current, pref.id];
                        onUpdate({ interactionStyles: updated });
                      }}
                      className={`option-btn ${profile.interactionStyles?.includes(pref.id) ? 'selected' : ''}`}
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
                      <span style={{ fontSize: '16px' }}>{pref.icon}</span>
                      <span style={{ fontWeight: '600' }}>{pref.label}</span>
                      <span style={{ opacity: 0.7, fontSize: '10px' }}>{pref.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Assessment Results Preview */}
              {Object.keys(answers).length === diagnosticQuestions.length && (
                <div style={{ 
                  background: '#f0f9ff', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  marginBottom: '20px',
                  border: '2px solid #0ea5e9'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#0369a1' }}>
                    📊 Assessment Preview
                  </h4>
                  <div style={{ fontSize: '12px', color: '#0369a1' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                      <strong>Estimated Score:</strong> {calculateDiagnosticScore().totalScore}/100
                    </p>
                    <p style={{ margin: '0' }}>
                      Your personalized learning path will be generated based on these results.
                    </p>
                  </div>
                </div>
              )}
            </>
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
            onClick={handleNext}
            disabled={currentQuestion < diagnosticQuestions.length || !profile.assessmentPreferences?.length}
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