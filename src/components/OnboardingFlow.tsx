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
      {/* Professional Navigation Bar */}
      <div className="professional-nav">
        <div className="nav-brand">
          <div className="nav-brand-icon">
            🎓
          </div>
          EnglishMaster Pro
        </div>
        
        <div className="nav-menu">
          <a href="#" className="nav-item active">
            <BookOpen size={16} />
            Onboarding
          </a>
          <a href="#" className="nav-item">
            <Target size={16} />
            Courses
          </a>
          <a href="#" className="nav-item">
            <BarChart3 size={16} />
            Progress
          </a>
          <a href="#" className="nav-item">
            <Users size={16} />
            Community
          </a>
        </div>
        
        <div className="nav-profile">
          <div className="profile-info">
            <div className="profile-name">{profile.name || 'New Learner'}</div>
            <div className="profile-level">
              {profile.currentLevel?.charAt(0).toUpperCase() + profile.currentLevel?.slice(1)} Level
            </div>
          </div>
          <div className="profile-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Professional Progress Section */}
        <div className="progress-section">
          <div className="progress-header">
            <div className="progress-title">Learning Journey Setup</div>
            <div className="progress-percentage">{Math.round((currentStep / TOTAL_STEPS) * 100)}%</div>
          </div>
          
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          
          <div className="progress-categories">
            <div className={`progress-category ${currentStep <= 4 ? 'active' : ''}`}>
              <BookOpen size={16} />
              <span>Basic Info</span>
            </div>
            <div className={`progress-category ${currentStep > 4 && currentStep <= 8 ? 'active' : ''}`}>
              <Brain size={16} />
              <span>Assessment</span>
            </div>
            <div className={`progress-category ${currentStep > 8 && currentStep <= 12 ? 'active' : ''}`}>
              <Heart size={16} />
              <span>Preferences</span>
            </div>
            <div className={`progress-category ${currentStep > 12 && currentStep <= 16 ? 'active' : ''}`}>
              <Zap size={16} />
              <span>Advanced</span>
            </div>
            <div className={`progress-category ${currentStep > 16 ? 'active' : ''}`}>
              <Award size={16} />
              <span>Completion</span>
            </div>
          </div>
        </div>

        {/* AI Processing Indicator */}
        {aiProcessing && (
          <div className="ai-processing">
            <div className="ai-processing-content">
              <div className="ai-spinner"></div>
              <div className="ai-processing-text">
                <div className="ai-processing-title">AI Processing Your Profile</div>
                <div className="ai-processing-subtitle">
                  Analyzing learning patterns and generating personalized recommendations...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Dashboard */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{profile.profileCompleteness}%</div>
            <div className="stat-label">Profile Complete</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{profile.primaryGoals?.length || 0}</div>
            <div className="stat-label">Learning Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{profile.availableTime || 'TBD'}</div>
            <div className="stat-label">Daily Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{profile.targetCertifications?.length || 0}</div>
            <div className="stat-label">Target Certs</div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="professional-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Adaptive Recommendations Panel */}
        {adaptiveRecommendations.length > 0 && (
          <motion.div
            className="professional-card mt-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="text-purple-600" size={24} />
                AI Recommendations
              </h3>
              <div className="course-grid">
                {adaptiveRecommendations.map((rec, index) => (
                  <div key={index} className="course-card">
                    <div className="course-thumbnail">
                      🤖
                    </div>
                    <div className="course-content">
                      <div className="course-title">{rec}</div>
                      <div className="course-description">
                        Personalized recommendation based on your learning profile and preferences.
                      </div>
                      <div className="course-meta">
                        <span>AI Generated</span>
                        <div className="course-progress">
                          <div className="course-progress-bar">
                            <div className="course-progress-fill" style={{ width: '0%' }}></div>
                          </div>
                          <span>0%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};