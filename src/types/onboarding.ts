export interface UserProfile {
  // Basic Information
  name: string;
  age: string;
  email: string;
  location: string;
  occupation: string;
  educationLevel: string;
  nativeLanguage: string;
  
  // Language Background
  currentLevel: string;
  previousExperience: string[];
  languageExposure: string;
  confidenceLevel: number;
  specificChallenges: string[];
  
  // Detailed Skill Assessment
  skillLevels: {
    speaking: number;
    listening: number;
    reading: number;
    writing: number;
    grammar: number;
    vocabulary: number;
    pronunciation: number;
    comprehension: number;
  };
  
  // Learning Goals & Objectives
  primaryGoals: string[];
  specificObjectives: string[];
  targetProficiency: string;
  timeframe: string;
  urgency: string;
  successMetrics: string[];
  
  // Learning Preferences
  learningStyles: string[];
  preferredActivities: string[];
  contentTypes: string[];
  difficultyPreference: string;
  feedbackStyle: string;
  
  // Schedule & Commitment
  availableTime: string;
  preferredSchedule: string[];
  studyDuration: string;
  consistencyLevel: string;
  reminderPreferences: string[];
  
  // Interests & Context
  interests: string[];
  topics: string[];
  culturalPreferences: string[];
  realWorldApplications: string[];
  
  // Motivation & Psychology
  motivation: string[];
  learningBarriers: string[];
  previousFailures: string[];
  supportSystem: string[];
  
  // Technology & Accessibility
  devicePreferences: string[];
  internetConnection: string;
  accessibilityNeeds: string[];
  techComfort: number;
  
  // Advanced Personalization
  adaptiveSettings: {
    autoAdjustDifficulty: boolean;
    personalizedRecommendations: boolean;
    gamificationLevel: string;
    socialLearning: boolean;
    aiTutorPersonality: string;
    contentPersonalization: string;
  };
  
  // Progress Tracking
  completionPercentage: number;
  onboardingStep: number;
  profileCompleteness: number;
  learningPathGenerated: boolean;
}

export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  component: React.ComponentType<any>;
  estimatedTime: string;
  importance: 'critical' | 'important' | 'optional';
}

export interface OptionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color?: string;
  category?: string;
  difficulty?: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  modules: string[];
  skills: string[];
  outcomes: string[];
}