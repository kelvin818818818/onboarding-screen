import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types/onboarding';
import { WelcomeStep } from './steps/WelcomeStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { SkillLevelStep } from './steps/SkillLevelStep';
import { GoalsStep } from './steps/GoalsStep';
import { CompletionStep } from './steps/CompletionStep';

const TOTAL_STEPS = 5;

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    nativeLanguage: '',
    currentLocation: '',
    overallLevel: 'beginner',
    skillLevels: {
      speaking: 1,
      listening: 1,
      reading: 1,
      writing: 1,
      grammar: 1,
      vocabulary: 1,
    },
    primaryGoals: [],
    specificObjectives: [],
    timeframe: '',
    motivation: [],
    learningStyles: [],
    preferredActivities: [],
    contentTypes: [],
    difficultyPreference: '',
    availableTime: '',
    preferredSchedule: [],
    studyDuration: '',
    reminderPreferences: [],
    interests: [],
    topics: [],
    culturalPreferences: [],
    adaptiveSettings: {
      autoAdjustDifficulty: true,
      personalizedRecommendations: true,
      gamificationLevel: 'moderate',
      feedbackStyle: 'encouraging',
    },
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
    alert('🎉 Welcome to EnglishMaster! Your personalized learning journey begins now.');
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
        return <SkillLevelStep {...stepProps} />;
      case 4:
        return <GoalsStep {...stepProps} />;
      case 5:
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-4">
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