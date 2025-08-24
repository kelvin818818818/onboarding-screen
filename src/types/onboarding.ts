export interface UserProfile {
  // Basic Information
  name: string;
  age: string;
  nativeLanguage: string;
  currentLocation: string;
  
  // Skill Assessment
  overallLevel: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficient';
  skillLevels: {
    speaking: number;
    listening: number;
    reading: number;
    writing: number;
    grammar: number;
    vocabulary: number;
  };
  
  // Learning Goals & Motivation
  primaryGoals: string[];
  specificObjectives: string[];
  timeframe: string;
  motivation: string[];
  
  // Learning Preferences
  learningStyles: string[];
  preferredActivities: string[];
  contentTypes: string[];
  difficultyPreference: string;
  
  // Schedule & Commitment
  availableTime: string;
  preferredSchedule: string[];
  studyDuration: string;
  reminderPreferences: string[];
  
  // Interests & Personalization
  interests: string[];
  topics: string[];
  culturalPreferences: string[];
  
  // Adaptive Features
  adaptiveSettings: {
    autoAdjustDifficulty: boolean;
    personalizedRecommendations: boolean;
    gamificationLevel: string;
    feedbackStyle: string;
  };
  
  // Progress Tracking
  completionPercentage: number;
  onboardingStep: number;
}

export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  component: string;
  isCompleted: boolean;
  isRequired: boolean;
}

export interface SkillAssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  skill: keyof UserProfile['skillLevels'];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LearningPathRecommendation {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  skills: string[];
  matchPercentage: number;
}