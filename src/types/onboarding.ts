export interface UserProfile {
  // Basic Information
  name: string;
  email: string;
  age: string;
  location: string;
  occupation: string;
  educationLevel: string;
  nativeLanguage: string;
  spokenLanguages: string[];
  
  // Detailed Language Background
  currentLevel: string;
  previousExperience: string[];
  languageExposure: string;
  confidenceLevel: number;
  specificChallenges: string[];
  learningHistory: {
    previousCourses: string[];
    certifications: string[];
    testScores: { [key: string]: number };
    studyAbroad: boolean;
    immersionExperience: string[];
  };
  
  // Comprehensive Skill Assessment
  skillLevels: {
    speaking: number;
    listening: number;
    reading: number;
    writing: number;
    grammar: number;
    vocabulary: number;
    pronunciation: number;
    comprehension: number;
    businessEnglish: number;
    academicEnglish: number;
    conversationalFluency: number;
    culturalAwareness: number;
  };
  
  // Detailed Learning Goals & Objectives
  primaryGoals: string[];
  specificObjectives: string[];
  targetProficiency: string;
  timeframe: string;
  urgency: string;
  successMetrics: string[];
  careerGoals: string[];
  academicGoals: string[];
  personalGoals: string[];
  
  // Advanced Learning Preferences
  learningStyles: string[];
  preferredActivities: string[];
  contentTypes: string[];
  difficultyPreference: string;
  feedbackStyle: string;
  assessmentPreferences: string[];
  interactionStyles: string[];
  
  // Comprehensive Schedule & Commitment
  availableTime: string;
  preferredSchedule: string[];
  studyDuration: string;
  consistencyLevel: string;
  reminderPreferences: string[];
  timeZone: string;
  flexibilityNeeds: string[];
  
  // Rich Interests & Context
  interests: string[];
  topics: string[];
  culturalPreferences: string[];
  realWorldApplications: string[];
  industryFocus: string[];
  hobbies: string[];
  mediaPreferences: string[];
  
  // Deep Motivation & Psychology
  motivation: string[];
  learningBarriers: string[];
  previousFailures: string[];
  supportSystem: string[];
  stressFactors: string[];
  confidenceBuilders: string[];
  
  // Advanced Technology & Accessibility
  devicePreferences: string[];
  internetConnection: string;
  accessibilityNeeds: string[];
  techComfort: number;
  platformExperience: string[];
  softwarePreferences: string[];
  
  // Sophisticated Personalization
  adaptiveSettings: {
    autoAdjustDifficulty: boolean;
    personalizedRecommendations: boolean;
    gamificationLevel: string;
    socialLearning: boolean;
    aiTutorPersonality: string;
    contentPersonalization: string;
    learningPathType: string;
    assessmentFrequency: string;
    feedbackTiming: string;
    progressVisualization: string;
  };
  
  // Learning Analytics & Tracking
  completionPercentage: number;
  onboardingStep: number;
  profileCompleteness: number;
  learningPathGenerated: boolean;
  skillGaps: string[];
  strengthAreas: string[];
  recommendedCourses: string[];
  estimatedTimeToGoal: string;
  
  // Certification & Achievement Tracking
  targetCertifications: string[];
  badgePreferences: string[];
  achievementGoals: string[];
  competencyFramework: string;
  
  // Social & Collaborative Learning
  collaborationPreferences: string[];
  mentorshipInterest: boolean;
  peerLearningStyle: string[];
  communityParticipation: string[];
  
  // Assessment & Evaluation
  initialAssessmentScore: number;
  diagnosticResults: { [key: string]: number };
  learningStyleAssessment: string[];
  personalityType: string;
  cognitivePreferences: string[];

  // Advanced Profiling Data
  learningContext: {
    workEnvironment: string;
    dailyEnglishUsage: string;
    communicationNeeds: string[];
    professionalRequirements: string[];
    personalCircumstances: string[];
  };

  // Detailed Preferences
  contentPreferences: {
    topicAreas: string[];
    difficultyProgression: string;
    contentFormat: string[];
    interactivityLevel: string;
    realWorldRelevance: string;
  };

  // Behavioral Patterns
  learningBehavior: {
    studyHabits: string[];
    procrastinationTendencies: string;
    motivationalTriggers: string[];
    preferredFeedbackFrequency: string;
    errorToleranceLevel: string;
  };

  // Cognitive Profile
  cognitiveProfile: {
    memoryStrength: string[];
    processingSpeed: string;
    attentionSpan: string;
    learningDisabilities: string[];
    cognitiveLoadPreference: string;
  };
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  modules: CourseModule[];
  skills: string[];
  outcomes: string[];
  prerequisites: string[];
  certifications: string[];
  badges: Badge[];
  estimatedHours: number;
  completionRate: number;
  rating: number;
  reviews: number;
  thumbnail: string;
  category: string;
  level: string;
  instructor: string;
  price: number;
  enrolledStudents: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'assessment' | 'practice' | 'project' | 'live_session' | 'quiz' | 'reading';
  duration: string;
  difficulty: number;
  skills: string[];
  prerequisites: string[];
  resources: Resource[];
  activities: Activity[];
  assessments: Assessment[];
  completionCriteria: string[];
  learningObjectives: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  points: number;
  category: string;
  earnedDate?: string;
  progress: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'interactive' | 'quiz' | 'game' | 'article' | 'infographic';
  url: string;
  duration?: string;
  difficulty: number;
  tags: string[];
  description: string;
  thumbnail?: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'speaking' | 'listening' | 'reading' | 'writing' | 'grammar' | 'vocabulary' | 'pronunciation' | 'conversation';
  description: string;
  estimatedTime: string;
  difficulty: number;
  skills: string[];
  interactive: boolean;
  aiPowered: boolean;
  collaborativeOptions: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'speaking' | 'writing' | 'project' | 'peer-review' | 'adaptive' | 'diagnostic';
  questions: number;
  timeLimit: string;
  passingScore: number;
  retakePolicy: string;
  weight: number;
  adaptiveScoring: boolean;
  realTimefeedback: boolean;
}

export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  component: React.ComponentType<any>;
  estimatedTime: string;
  importance: 'critical' | 'important' | 'optional';
  category: 'basic' | 'assessment' | 'preferences' | 'goals' | 'personalization' | 'advanced';
  completionCriteria: string[];
  dependencies: number[];
  dataCollected: string[];
  aiProcessing: boolean;
}

export interface PersonalizationEngine {
  contextData: {
    userBehavior: any[];
    performanceMetrics: any[];
    engagementPatterns: any[];
    learningVelocity: number;
  };
  adaptiveAlgorithms: {
    contentRecommendation: boolean;
    difficultyAdjustment: boolean;
    pathOptimization: boolean;
    scheduleAdaptation: boolean;
  };
  realTimeProcessing: {
    responseAnalysis: boolean;
    emotionalStateDetection: boolean;
    cognitiveLoadMonitoring: boolean;
    adaptiveIntervention: boolean;
  };
}