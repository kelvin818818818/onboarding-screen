export interface UserProfile {
  name: string;
  age: string;
  currentLevel: string;
  learningGoals: string[];
  learningStyle: string;
  timeCommitment: string;
  interests: string[];
  preferredSkills: string[];
  motivations: string[];
  studyTime: string;
  nativeLanguage: string;
}

export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  component: React.ComponentType<any>;
}

export interface OptionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color?: string;
}