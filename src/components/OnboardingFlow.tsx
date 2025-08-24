import React, { useState } from 'react';
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
import { CompletionStep } from './steps/CompletionStep';

const TOTAL_STEPS = 15;

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
  });

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
      profile.devicePreferences.length > 0, profile.targetCertifications.length > 0
    ];
    const completed = criticalFields.filter(Boolean).length;
    return Math.round((completed / criticalFields.length) * 100);
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      updateProfile({ onboardingStep: currentStep + 1 });
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
    alert('🎉 Your comprehensive English learning profile is complete! We\'ve generated a personalized learning ecosystem tailored specifically for you.');
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
    };

    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} currentStep={currentStep} totalSteps={TOTAL_STEPS} />;
      case 2:
        return <BasicInfoStep {...stepProps} />;
      case 3:
        return <LanguageBackgroundStep {...stepProps} />;
      case 4:
        return <SkillAssessmentStep {...stepProps} />;
      case 5:
        return <LearningGoalsStep {...stepProps} />;
      case 6:
        return <LearningStyleStep {...stepProps} />;
      case 7:
        return <TimeCommitmentStep {...stepProps} />;
      case 8:
        return <InterestsStep {...stepProps} />;
      case 9:
        return <MotivationStep {...stepProps} />;
      case 10:
        return <TechnologyStep {...stepProps} />;
      case 11:
        return <PersonalizationStep {...stepProps} />;
      case 12:
        return <AssessmentStep {...stepProps} />;
      case 13:
        return <CertificationStep {...stepProps} />;
      case 14:
        return <SocialLearningStep {...stepProps} />;
      case 15:
        return <CompletionStep 
          profile={profile} 
          onComplete={completeOnboarding} 
          onBack={prevStep}
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
        />;
      default:
        return <WelcomeStep onNext={nextStep} currentStep={currentStep} totalSteps={TOTAL_STEPS} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-pink-300/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric Patterns */}
        <div className="absolute top-10 right-10 w-16 h-16 border-2 border-white/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-10 left-10 w-12 h-12 border-2 border-white/30 rotate-12 animate-bounce" />
        
        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 right-1/4 text-2xl"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 text-2xl"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎓
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
          <div className="flex items-center space-x-3">
            <div className="text-white text-sm font-medium">
              Step {currentStep} of {TOTAL_STEPS}
            </div>
            <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-white text-sm font-medium">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Phone mockup container */}
      <div className="phone-mockup relative z-10">
        <div className="phone-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Action Button */}
      {currentStep > 1 && (
        <motion.button
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white text-xl z-30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentStep(1)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          🏠
        </motion.button>
      )}
    </div>
  );
};