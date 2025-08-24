import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types/onboarding';
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
      {/* Advanced Dashboard Container */}
      <div className="dashboard-container">
        {/* Top Navigation Bar */}
        <div className="dashboard-nav">
          <div className="nav-brand">🎓 EnglishMaster Pro</div>
          <div className="nav-menu">
            <a href="#" className="nav-item active">Onboarding</a>
            <a href="#" className="nav-item">Courses</a>
            <a href="#" className="nav-item">Progress</a>
            <a href="#" className="nav-item">Community</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white text-sm">
              Profile: {profile.profileCompleteness}% Complete
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${profile.profileCompleteness}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Advanced Progress Tracking */}
        <div className="learning-card mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Learning Journey Setup</h2>
              <div className="text-sm text-gray-600">
                Step {currentStep} of {TOTAL_STEPS}
              </div>
            </div>
            
            {/* Complex Progress Visualization */}
            <div className="progress-container">
              <div className="flex justify-between text-sm text-white/80 mb-2">
                <span>Progress</span>
                <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {/* Step Categories */}
              <div className="flex justify-between mt-4 text-xs text-white/60">
                <span className={currentStep <= 4 ? 'text-white font-semibold' : ''}>Basic Info</span>
                <span className={currentStep > 4 && currentStep <= 8 ? 'text-white font-semibold' : ''}>Assessment</span>
                <span className={currentStep > 8 && currentStep <= 12 ? 'text-white font-semibold' : ''}>Preferences</span>
                <span className={currentStep > 12 && currentStep <= 16 ? 'text-white font-semibold' : ''}>Advanced</span>
                <span className={currentStep > 16 ? 'text-white font-semibold' : ''}>Completion</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Processing Indicator */}
        {aiProcessing && (
          <motion.div
            className="learning-card mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                <div>
                  <div className="font-semibold">AI Processing Your Profile</div>
                  <div className="text-sm opacity-90">Analyzing learning patterns and generating personalized recommendations...</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="learning-card">
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

        {/* Advanced Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
              >
                ← Previous
              </motion.button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(10, TOTAL_STEPS) }, (_, index) => {
              const stepIndex = Math.max(0, currentStep - 5) + index;
              return (
                <div
                  key={stepIndex}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    stepIndex + 1 === currentStep
                      ? 'bg-blue-400 w-8'
                      : stepIndex + 1 < currentStep
                      ? 'bg-green-400'
                      : 'bg-white/30'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {currentStep < TOTAL_STEPS && (
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
              >
                Continue →
              </motion.button>
            )}
          </div>
        </div>

        {/* Adaptive Recommendations Panel */}
        {adaptiveRecommendations.length > 0 && (
          <motion.div
            className="learning-card mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🤖 AI Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adaptiveRecommendations.map((rec, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                    <div className="font-semibold text-gray-800 mb-1">{rec}</div>
                    <div className="text-sm text-gray-600">Personalized based on your profile</div>
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