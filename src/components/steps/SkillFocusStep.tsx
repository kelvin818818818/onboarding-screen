import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Headphones, BookOpen, PenTool, Zap, Settings } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';
import { OptionCard } from '../OptionCard';

interface SkillFocusStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SkillFocusStep: React.FC<SkillFocusStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const skillFocusAreas = [
    {
      id: 'speaking',
      icon: MessageCircle,
      title: 'Speaking',
      description: 'Pronunciation, fluency, conversation skills'
    },
    {
      id: 'listening',
      icon: Headphones,
      title: 'Listening',
      description: 'Understanding accents, audio comprehension'
    },
    {
      id: 'reading',
      icon: BookOpen,
      title: 'Reading',
      description: 'Comprehension, speed, vocabulary building'
    },
    {
      id: 'writing',
      icon: PenTool,
      title: 'Writing',
      description: 'Grammar, structure, creative expression'
    }
  ];

  const adaptiveSettings = [
    {
      key: 'autoAdjustDifficulty' as const,
      title: 'Auto-adjust Difficulty',
      description: 'Automatically adapt content difficulty based on your performance',
      icon: Zap
    },
    {
      key: 'personalizedRecommendations' as const,
      title: 'Personalized Recommendations',
      description: 'Get content suggestions based on your progress and interests',
      icon: Settings
    }
  ];

  const gamificationLevels = [
    { value: 'minimal', label: 'Minimal', description: 'Just basic progress tracking' },
    { value: 'moderate', label: 'Moderate', description: 'Points, badges, and streaks' },
    { value: 'high', label: 'High', description: 'Full gamification with levels and rewards' }
  ];

  const feedbackStyles = [
    { value: 'encouraging', label: 'Encouraging', description: 'Positive and motivational feedback' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations and tips' },
    { value: 'concise', label: 'Concise', description: 'Brief and to-the-point feedback' },
    { value: 'adaptive', label: 'Adaptive', description: 'Feedback style adapts to your needs' }
  ];

  const togglePreferredActivity = (activityId: string) => {
    const currentActivities = profile.preferredActivities || [];
    const updatedActivities = currentActivities.includes(activityId)
      ? currentActivities.filter(id => id !== activityId)
      : [...currentActivities, activityId];
    
    onUpdate({ preferredActivities: updatedActivities });
  };

  const toggleAdaptiveSetting = (settingKey: keyof UserProfile['adaptiveSettings']) => {
    const currentSettings = profile.adaptiveSettings || {
      autoAdjustDifficulty: false,
      personalizedRecommendations: false,
      gamificationLevel: 'moderate',
      feedbackStyle: 'encouraging'
    };
    
    onUpdate({
      adaptiveSettings: {
        ...currentSettings,
        [settingKey]: !currentSettings[settingKey]
      }
    });
  };

  const updateAdaptiveSetting = (settingKey: keyof UserProfile['adaptiveSettings'], value: any) => {
    const currentSettings = profile.adaptiveSettings || {
      autoAdjustDifficulty: false,
      personalizedRecommendations: false,
      gamificationLevel: 'moderate',
      feedbackStyle: 'encouraging'
    };
    
    onUpdate({
      adaptiveSettings: {
        ...currentSettings,
        [settingKey]: value
      }
    });
  };

  const validateAndNext = () => {
    if (!profile.preferredActivities?.length) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
          <Zap size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Focus Areas & Preferences</h2>
        <p className="text-white/70">Customize your learning experience</p>
      </motion.div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Skill Focus Areas */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Which skills need the most attention? (Select multiple)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {skillFocusAreas.map((skill) => (
              <OptionCard
                key={skill.id}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                isSelected={profile.preferredActivities?.includes(skill.id) || false}
                onClick={() => togglePreferredActivity(skill.id)}
              />
            ))}
          </div>
          {profile.preferredActivities?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select at least one skill area
            </p>
          )}
        </div>

        {/* Adaptive Settings */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Adaptive Learning Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {adaptiveSettings.map((setting) => (
              <motion.div
                key={setting.key}
                className={`glass rounded-xl p-6 border-2 transition-all duration-300 ${
                  profile.adaptiveSettings?.[setting.key]
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl'
                    : 'border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    profile.adaptiveSettings?.[setting.key]
                      ? 'bg-primary-400 text-white'
                      : 'bg-white/20 text-white'
                  }`}>
                    <setting.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{setting.title}</h4>
                      <button
                        onClick={() => toggleAdaptiveSetting(setting.key)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          profile.adaptiveSettings?.[setting.key]
                            ? 'bg-primary-400'
                            : 'bg-white/30'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                          profile.adaptiveSettings?.[setting.key]
                            ? 'translate-x-6'
                            : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <p className="text-white/70 text-sm">{setting.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gamification Level */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            How much gamification do you want?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {gamificationLevels.map((level) => (
              <motion.button
                key={level.value}
                onClick={() => updateAdaptiveSetting('gamificationLevel', level.value)}
                className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  profile.adaptiveSettings?.gamificationLevel === level.value
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="text-white font-semibold mb-1">{level.label}</h4>
                <p className="text-white/70 text-sm">{level.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feedback Style */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Preferred feedback style?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {feedbackStyles.map((style) => (
              <motion.button
                key={style.value}
                onClick={() => updateAdaptiveSetting('feedbackStyle', style.value)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  profile.adaptiveSettings?.feedbackStyle === style.value
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="text-white font-semibold mb-1">{style.label}</h4>
                <p className="text-white/70 text-sm">{style.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-between max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={onBack}
          className="btn-secondary px-6 py-3"
        >
          Back
        </button>
        <button
          onClick={validateAndNext}
          disabled={!profile.preferredActivities?.length}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};