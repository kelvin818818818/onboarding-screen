import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types/onboarding';
import { Search, Bell, Settings, User, BookOpen, Target, Clock, Heart, Brain, Users, Award, Zap, BarChart3 } from 'lucide-react';
import { WelcomeStep } from './steps/WelcomeStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { LanguageBackgroundStep } from './steps/LanguageBackgroundStep';
import { SkillAssessmentStep } from './steps/SkillAssessmentStep';
import { LearningGoalsStep } from './steps/LearningGoalsStep';
import { LearningStyleStep } from './steps/LearningStyleStep';
import { TimeCommitmentStep } from './steps/TimeCommitmentStep';
import { InterestsStep } from './steps/InterestsStep';
import { MotivationStep } from './steps/MotivationStep';
import { TechnologyStep } from './steps/TechnologyStep';
import { PersonalizationStep } from './steps/PersonalizationStep';
import { AssessmentStep } from './steps/AssessmentStep';
import { CertificationStep } from './steps/CertificationStep';
import { SocialLearningStep } from './steps/SocialLearningStep';
import { CognitiveProfileStep } from './steps/CognitiveProfileStep';
import { BehavioralAnalysisStep } from './steps/BehavioralAnalysisStep';
import { ContextualAnalysisStep } from './steps/ContextualAnalysisStep';
import { AdaptivePreferencesStep } from './steps/AdaptivePreferencesStep';
import { CompletionStep } from './steps/CompletionStep';
import { DashboardPreview } from './steps/DashboardPreview';

const TOTAL_STEPS = 20;

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    // Basic Information
    name: '',
    email: '',
    age: '',
    location: '',
    occupation: '',
    educationLevel: '',
    nativeLanguage: '',
    spokenLanguages: [],
    
    // Detailed Language Background
    currentLevel: 'beginner',
    previousExperience: [],
    languageExposure: '',
    confidenceLevel: 1,
    specificChallenges: [],
    learningHistory: {
      previousCourses: [],
      certifications: [],
      testScores: {},
      studyAbroad: false,
      immersionExperience: [],
    },
    
    // Comprehensive Skill Assessment
    skillLevels: {
      speaking: 1,
      listening: 1,
      reading: 1,
      writing: 1,
      grammar: 1,
      vocabulary: 1,
      pronunciation: 1,
      comprehension: 1,
      businessEnglish: 1,
      academicEnglish: 1,
      conversationalFluency: 1,
      culturalAwareness: 1,
    },
    
    // Detailed Learning Goals & Objectives
    primaryGoals: [],
    specificObjectives: [],
    targetProficiency: '',
    timeframe: '',
    urgency: '',
    successMetrics: [],
    careerGoals: [],
    academicGoals: [],
    personalGoals: [],
    
    // Advanced Learning Preferences
    learningStyles: [],
    preferredActivities: [],
    contentTypes: [],
    difficultyPreference: '',
    feedbackStyle: '',
    assessmentPreferences: [],
    interactionStyles: [],
    
    // Comprehensive Schedule & Commitment
    availableTime: '',
    preferredSchedule: [],
    studyDuration: '',
    consistencyLevel: '',
    reminderPreferences: [],
    timeZone: '',
    flexibilityNeeds: [],
    
    // Rich Interests & Context
    interests: [],
    topics: [],
    culturalPreferences: [],
    realWorldApplications: [],
    industryFocus: [],
    hobbies: [],
    mediaPreferences: [],
    
    // Deep Motivation & Psychology
    motivation: [],
    learningBarriers: [],
    previousFailures: [],
    supportSystem: [],
    stressFactors: [],
    confidenceBuilders: [],
    
    // Advanced Technology & Accessibility
    devicePreferences: [],
    internetConnection: '',
    accessibilityNeeds: [],
    techComfort: 5,
    platformExperience: [],
    softwarePreferences: [],
    
    // Sophisticated Personalization
    adaptiveSettings: {
      autoAdjustDifficulty: true,
      personalizedRecommendations: true,
      gamificationLevel: 'moderate',
      socialLearning: true,
      aiTutorPersonality: 'encouraging',
      contentPersonalization: 'adaptive',
      learningPathType: 'guided',
      assessmentFrequency: 'weekly',
      feedbackTiming: 'immediate',
      progressVisualization: 'detailed',
    },
    
    // Learning Analytics & Tracking
    completionPercentage: 0,
    onboardingStep: 1,
    profileCompleteness: 0,
    learningPathGenerated: false,
    skillGaps: [],
    strengthAreas: [],
    recommendedCourses: [],
    estimatedTimeToGoal: '',
    
    // Certification & Achievement Tracking
    targetCertifications: [],
    badgePreferences: [],
    achievementGoals: [],
    competencyFramework: '',
    
    // Social & Collaborative Learning
    collaborationPreferences: [],
    mentorshipInterest: false,
    peerLearningStyle: [],
    communityParticipation: [],
    
    // Assessment & Evaluation
    initialAssessmentScore: 0,
    diagnosticResults: {},
    learningStyleAssessment: [],
    personalityType: '',
    cognitivePreferences: [],

    // Advanced Profiling Data
    learningContext: {
      workEnvironment: '',
      dailyEnglishUsage: '',
      communicationNeeds: [],
      professionalRequirements: [],
      personalCircumstances: [],
    },

    // Detailed Preferences
    contentPreferences: {
      topicAreas: [],
      difficultyProgression: '',
      contentFormat: [],
      interactivityLevel: '',
      realWorldRelevance: '',
    },

    // Behavioral Patterns
    learningBehavior: {
      studyHabits: [],
      procrastinationTendencies: '',
      motivationalTriggers: [],
      preferredFeedbackFrequency: '',
      errorToleranceLevel: '',
    },

    // Cognitive Profile
    cognitiveProfile: {
      memoryStrength: [],
      processingSpeed: '',
      attentionSpan: '',
      learningDisabilities: [],
      cognitiveLoadPreference: '',
    },
  });

  const [aiProcessing, setAiProcessing] = useState(false);
  const [adaptiveRecommendations, setAdaptiveRecommendations] = useState<string[]>([]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      updated.completionPercentage = Math.round((currentStep / TOTAL_STEPS) * 100);
      updated.profileCompleteness = calculateProfileCompleteness(updated);
      return updated;
    });
  };

  const calculateProfileCompleteness = (profile: UserProfile): number => {
    const criticalFields = [
      profile.name, profile.email, profile.age, profile.currentLevel,
      profile.primaryGoals.length > 0, profile.learningStyles.length > 0,
      profile.availableTime, profile.motivation.length > 0,
      profile.devicePreferences.length > 0, profile.targetCertifications.length > 0,
      profile.learningContext.workEnvironment, profile.contentPreferences.topicAreas.length > 0,
      profile.learningBehavior.studyHabits.length > 0, profile.cognitiveProfile.memoryStrength.length > 0
    ];
    const completed = criticalFields.filter(Boolean).length;
    return Math.round((completed / criticalFields.length) * 100);
  };

  const processAIRecommendations = async (profile: UserProfile) => {
    setAiProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recommendations = generateAIRecommendations(profile);
    setAdaptiveRecommendations(recommendations);
    setAiProcessing(false);
  };

  const generateAIRecommendations = (profile: UserProfile): string[] => {
    const recommendations = [];
    
    if (profile.primaryGoals.includes('business')) {
      recommendations.push('Business English Mastery Program');
      recommendations.push('Professional Communication Workshop');
    }
    
    if (profile.skillLevels.speaking < 5) {
      recommendations.push('AI-Powered Speaking Coach');
      recommendations.push('Pronunciation Perfection Course');
    }
    
    if (profile.learningStyles.includes('visual')) {
      recommendations.push('Visual Learning Path with Infographics');
      recommendations.push('Interactive Video Lessons');
    }
    
    if (profile.adaptiveSettings.gamificationLevel === 'high') {
      recommendations.push('Gamified English Adventure');
      recommendations.push('Achievement-Based Learning Journey');
    }
    
    return recommendations;
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      updateProfile({ onboardingStep: currentStep + 1 });
      
      // Process AI recommendations at certain steps
      if ([5, 10, 15].includes(currentStep + 1)) {
        processAIRecommendations(profile);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      updateProfile({ onboardingStep: currentStep - 1 });
    }
  };

  const completeOnboarding = () => {
    updateProfile({ 
      completionPercentage: 100,
      onboardingStep: TOTAL_STEPS,
      learningPathGenerated: true,
      estimatedTimeToGoal: calculateEstimatedTime(profile),
      skillGaps: identifySkillGaps(profile),
      strengthAreas: identifyStrengths(profile),
      recommendedCourses: generateCourseRecommendations(profile)
    });
    console.log('Advanced onboarding completed:', profile);
  };

  const calculateEstimatedTime = (profile: UserProfile): string => {
    const currentLevel = profile.skillLevels.speaking || 1;
    const targetLevel = profile.targetProficiency === 'native' ? 10 : 
                      profile.targetProficiency === 'advanced' ? 8 : 
                      profile.targetProficiency === 'intermediate' ? 6 : 4;
    const levelDifference = Math.max(1, targetLevel - currentLevel);
    const weeklyHours = profile.availableTime === '2+hours' ? 14 : 
                       profile.availableTime === '1-2hours' ? 10 : 
                       profile.availableTime === '30-60min' ? 5 : 3;
    const estimatedWeeks = Math.ceil((levelDifference * 40) / weeklyHours);
    return estimatedWeeks > 52 ? `${Math.ceil(estimatedWeeks / 52)} years` : `${estimatedWeeks} weeks`;
  };

  const identifySkillGaps = (profile: UserProfile): string[] => {
    const skills = Object.entries(profile.skillLevels);
    return skills.filter(([_, level]) => level < 5).map(([skill, _]) => skill);
  };

  const identifyStrengths = (profile: UserProfile): string[] => {
    const skills = Object.entries(profile.skillLevels);
    return skills.filter(([_, level]) => level >= 7).map(([skill, _]) => skill);
  };

  const generateCourseRecommendations = (profile: UserProfile): string[] => {
    const recommendations = [];
    if (profile.primaryGoals.includes('business')) recommendations.push('Business English Mastery');
    if (profile.primaryGoals.includes('academic')) recommendations.push('Academic Writing Excellence');
    if (profile.primaryGoals.includes('conversation')) recommendations.push('Conversational Fluency Bootcamp');
    if (profile.skillLevels.pronunciation < 5) recommendations.push('Pronunciation Perfection');
    if (profile.skillLevels.grammar < 5) recommendations.push('Grammar Foundations');
    return recommendations;
  };

  const renderStep = () => {
    const stepProps = {
      profile,
      onUpdate: updateProfile,
      onNext: nextStep,
      onBack: prevStep,
      currentStep,
      totalSteps: TOTAL_STEPS,
      aiProcessing,
      adaptiveRecommendations,
    };

    switch (currentStep) {
      case 1: return <WelcomeStep onNext={nextStep} currentStep={currentStep} totalSteps={TOTAL_STEPS} />;
      case 2: return <BasicInfoStep {...stepProps} />;
      case 3: return <LanguageBackgroundStep {...stepProps} />;
      case 4: return <SkillAssessmentStep {...stepProps} />;
      case 5: return <LearningGoalsStep {...stepProps} />;
      case 6: return <LearningStyleStep {...stepProps} />;
      case 7: return <TimeCommitmentStep {...stepProps} />;
      case 8: return <InterestsStep {...stepProps} />;
      case 9: return <MotivationStep {...stepProps} />;
      case 10: return <TechnologyStep {...stepProps} />;
      case 11: return <PersonalizationStep {...stepProps} />;
      case 12: return <AssessmentStep {...stepProps} />;
      case 13: return <CertificationStep {...stepProps} />;
      case 14: return <SocialLearningStep {...stepProps} />;
      case 15: return <CognitiveProfileStep {...stepProps} />;
      case 16: return <BehavioralAnalysisStep {...stepProps} />;
      case 17: return <ContextualAnalysisStep {...stepProps} />;
      case 18: return <AdaptivePreferencesStep {...stepProps} />;
      case 19: return <DashboardPreview {...stepProps} />;
      case 20: return <CompletionStep 
        profile={profile} 
        onComplete={completeOnboarding} 
        onBack={prevStep}
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />;
      default: return <WelcomeStep onNext={nextStep} currentStep={currentStep} totalSteps={TOTAL_STEPS} />;
    }
  };

  return (
    <div className="learning-platform">
      <div className="dashboard-container">
        {/* Sidebar Navigation - Like Language Learning Dashboard */}
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-avatar">
              {profile.name ? profile.name.charAt(0).toUpperCase() : '👤'}
            </div>
            <div className="sidebar-user-info">
              <h3>{profile.name || "Emily's Profile"}</h3>
              <p>{profile.currentLevel?.charAt(0).toUpperCase() + profile.currentLevel?.slice(1) || 'Beginner'} Level</p>
            </div>
          </div>
          
          <nav>
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item">
                <a href="#" className="sidebar-nav-link active">
                  <span className="sidebar-nav-icon">📚</span>
                  Onboarding
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#" className="sidebar-nav-link">
                  <span className="sidebar-nav-icon">📖</span>
                  Study Plan
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#" className="sidebar-nav-link">
                  <span className="sidebar-nav-icon">📝</span>
                  Vocabulary
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#" className="sidebar-nav-link">
                  <span className="sidebar-nav-icon">🎯</span>
                  Goals
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a href="#" className="sidebar-nav-link">
                  <span className="sidebar-nav-icon">📊</span>
                  Resources
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Goal Section - Like Wordela */}
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span>🎯</span>
              <strong style={{ fontSize: '0.875rem', color: '#374151' }}>Goal</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
              Learn at least 5 language skills
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Language Learning Dashboard</h1>
              <p className="dashboard-subtitle">
                Welcome to your personalized <strong>Language Learning dashboard</strong> - your all-in-one space to track progress, organize resources, and stay motivated while mastering English.
              </p>
            </div>
            <div className="dashboard-actions">
              <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                View Profile
              </button>
            </div>
          </div>

          {/* Progress Overview - Like Wordela Progress */}
          <div className="progress-overview">
            <div className="progress-card">
              <div className="progress-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                🏆
              </div>
              <div className="progress-value">{profile.profileCompleteness}%</div>
              <div className="progress-label">Profile Complete</div>
            </div>
            <div className="progress-card">
              <div className="progress-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
                📚
              </div>
              <div className="progress-value">{currentStep}</div>
              <div className="progress-label">Current Step</div>
            </div>
            <div className="progress-card">
              <div className="progress-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
                ⏱️
              </div>
              <div className="progress-value">{profile.availableTime || '30min'}</div>
              <div className="progress-label">Daily Time</div>
            </div>
            <div className="progress-card">
              <div className="progress-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' }}>
                🎯
              </div>
              <div className="progress-value">{profile.primaryGoals?.length || 0}</div>
              <div className="progress-label">Learning Goals</div>
            </div>
          </div>

          {/* Quote Section */}
          <div style={{ 
            background: '#f8fafc', 
            border: '1px solid #e5e7eb', 
            borderLeft: '4px solid #667eea',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            margin: '2rem 0',
            fontStyle: 'italic',
            color: '#6b7280'
          }}>
            "Small consistent steps lead to massive language breakthroughs."
          </div>

          {/* Main Onboarding Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* AI Processing Indicator */}
          {aiProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                color: 'white',
                margin: '2rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  AI Processing Your Profile
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  Analyzing learning patterns and generating personalized recommendations...
                </div>
              </div>
            </motion.div>
          )}

          {/* Adaptive Recommendations */}
          {adaptiveRecommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '2rem' }}
            >
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#1f2937', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🤖 AI Recommendations
              </h3>
              <div className="language-grid">
                {adaptiveRecommendations.map((rec, index) => (
                  <div key={index} className="language-card">
                    <div 
                      className="language-image" 
                      style={{ 
                        background: `linear-gradient(135deg, ${
                          index % 3 === 0 ? '#667eea, #764ba2' :
                          index % 3 === 1 ? '#10b981, #059669' :
                          '#f59e0b, #d97706'
                        })`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: 'white'
                      }}
                    >
                      🤖
                    </div>
                    <div className="language-info">
                      <h4 className="language-name">{rec}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};