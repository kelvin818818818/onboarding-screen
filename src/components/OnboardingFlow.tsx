import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types/onboarding';
import { ProgressBar } from './ProgressBar';
import { WelcomeStep } from './steps/WelcomeStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { SkillLevelStep } from './steps/SkillLevelStep';
import { GoalsStep } from './steps/GoalsStep';
import { LearningStyleStep } from './steps/LearningStyleStep';
import { TimeCommitmentStep } from './steps/TimeCommitmentStep';
import { InterestsStep } from './steps/InterestsStep';
import { SkillFocusStep } from './steps/SkillFocusStep';
import { MotivationStep } from './steps/MotivationStep';
import { CompletionStep } from './steps/CompletionStep';

const TOTAL_STEPS = 10;

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    // Basic Information
    name: '',
    age: '',
    nativeLanguage: '',
    currentLocation: '',
    
    // Skill Assessment
    overallLevel: 'beginner',
    skillLevels: {
      speaking: 1,
      listening: 1,
      reading: 1,
      writing: 1,
      grammar: 1,
      vocabulary: 1,
    },
    
    // Learning Goals & Motivation
    primaryGoals: [],
    specificObjectives: [],
    timeframe: '',
    motivation: [],
    
    // Learning Preferences
    learningStyles: [],
    preferredActivities: [],
    contentTypes: [],
    difficultyPreference: '',
    
    // Schedule & Commitment
    availableTime: '',
    preferredSchedule: [],
    studyDuration: '',
    reminderPreferences: [],
    
    // Interests & Personalization
    interests: [],
    topics: [],
    culturalPreferences: [],
    
    // Adaptive Features
    adaptiveSettings: {
      autoAdjustDifficulty: true,
      personalizedRecommendations: true,
      gamificationLevel: 'moderate',
      feedbackStyle: 'encouraging',
    },
    
    // Progress Tracking
    completionPercentage: 0,
    onboardingStep: 1,
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
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
      onboardingStep: TOTAL_STEPS 
    });
    console.log('Onboarding completed with profile:', profile);
    // Here you would typically save the profile and redirect to the main app
    alert('🎉 Onboarding completed! Your personalized learning journey begins now.');
  };

  const renderStep = () => {
    const stepProps = {
      profile,
      onUpdate: updateProfile,
      onNext: nextStep,
      onBack: prevStep,
    };

    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return <BasicInfoStep {...stepProps} />;
      case 3:
        return <SkillLevelStep {...stepProps} />;
      case 4:
        return <GoalsStep {...stepProps} />;
      case 5:
        return <LearningStyleStep {...stepProps} />;
      case 6:
        return <TimeCommitmentStep {...stepProps} />;
      case 7:
        return <InterestsStep {...stepProps} />;
      case 8:
        return <SkillFocusStep {...stepProps} />;
      case 9:
        return <MotivationStep {...stepProps} />;
      case 10:
        return <CompletionStep 
          profile={profile} 
          onComplete={completeOnboarding} 
          onBack={prevStep} 
        />;
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};