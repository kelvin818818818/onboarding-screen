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
import { CompletionStep } from './steps/CompletionStep';

const TOTAL_STEPS = 12;

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    // Basic Information
    name: '',
    age: '',
    email: '',
    location: '',
    occupation: '',
    educationLevel: '',
    nativeLanguage: '',
    
    // Language Background
    currentLevel: 'beginner',
    previousExperience: [],
    languageExposure: '',
    confidenceLevel: 1,
    specificChallenges: [],
    
    // Detailed Skill Assessment
    skillLevels: {
      speaking: 1,
      listening: 1,
      reading: 1,
      writing: 1,
      grammar: 1,
      vocabulary: 1,
      pronunciation: 1,
      comprehension: 1,
    },
    
    // Learning Goals & Objectives
    primaryGoals: [],
    specificObjectives: [],
    targetProficiency: '',
    timeframe: '',
    urgency: '',
    successMetrics: [],
    
    // Learning Preferences
    learningStyles: [],
    preferredActivities: [],
    contentTypes: [],
    difficultyPreference: '',
    feedbackStyle: '',
    
    // Schedule & Commitment
    availableTime: '',
    preferredSchedule: [],
    studyDuration: '',
    consistencyLevel: '',
    reminderPreferences: [],
    
    // Interests & Context
    interests: [],
    topics: [],
    culturalPreferences: [],
    realWorldApplications: [],
    
    // Motivation & Psychology
    motivation: [],
    learningBarriers: [],
    previousFailures: [],
    supportSystem: [],
    
    // Technology & Accessibility
    devicePreferences: [],
    internetConnection: '',
    accessibilityNeeds: [],
    techComfort: 5,
    
    // Advanced Personalization
    adaptiveSettings: {
      autoAdjustDifficulty: true,
      personalizedRecommendations: true,
      gamificationLevel: 'moderate',
      socialLearning: true,
      aiTutorPersonality: 'encouraging',
      contentPersonalization: 'adaptive',
    },
    
    // Progress Tracking
    completionPercentage: 0,
    onboardingStep: 1,
    profileCompleteness: 0,
    learningPathGenerated: false,
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
    const fields = [
      profile.name, profile.age, profile.currentLevel,
      profile.primaryGoals.length > 0,
      profile.learningStyles.length > 0,
      profile.availableTime,
      profile.motivation.length > 0
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
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
      learningPathGenerated: true
    });
    console.log('Comprehensive onboarding completed:', profile);
    alert('🎉 Your personalized English learning journey is ready! We\'ve created a custom learning path based on your detailed profile.');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-pink-300/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
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
    </div>
  );
};