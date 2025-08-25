import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Headphones, Hand, Users, BookOpen, Gamepad2, Video, MessageCircle } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';
import { OptionCard } from '../OptionCard';

interface LearningStyleStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LearningStyleStep: React.FC<LearningStyleStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const learningStyles = [
    {
      id: 'visual',
      icon: Eye,
      title: 'Visual Learner',
      description: 'Learn best with images, charts, and visual aids'
    },
    {
      id: 'auditory',
      icon: Headphones,
      title: 'Auditory Learner',
      description: 'Prefer listening to explanations and audio content'
    },
    {
      id: 'kinesthetic',
      icon: Hand,
      title: 'Hands-on Learner',
      description: 'Learn through practice and interactive activities'
    },
    {
      id: 'social',
      icon: Users,
      title: 'Social Learner',
      description: 'Enjoy group activities and peer interaction'
    }
  ];

  const contentTypes = [
    {
      id: 'videos',
      icon: Video,
      title: 'Video Lessons',
      description: 'Structured video content with subtitles'
    },
    {
      id: 'audio',
      icon: Headphones,
      title: 'Audio Content',
      description: 'Podcasts, music, and listening exercises'
    },
    {
      id: 'reading',
      icon: BookOpen,
      title: 'Reading Materials',
      description: 'Articles, stories, and text-based lessons'
    },
    {
      id: 'games',
      icon: Gamepad2,
      title: 'Interactive Games',
      description: 'Gamified learning and vocabulary games'
    },
    {
      id: 'conversation',
      icon: MessageCircle,
      title: 'Conversation Practice',
      description: 'Speaking exercises and dialogue practice'
    }
  ];

  const difficultyPreferences = [
    { value: 'gradual', label: 'Gradual Progression', description: 'Start easy and build up slowly' },
    { value: 'moderate', label: 'Moderate Challenge', description: 'Balanced difficulty with some challenge' },
    { value: 'challenging', label: 'High Challenge', description: 'Push me with difficult content' },
    { value: 'adaptive', label: 'Adaptive Difficulty', description: 'Adjust based on my performance' }
  ];

  const toggleLearningStyle = (styleId: string) => {
    const currentStyles = profile.learningStyles || [];
    const updatedStyles = currentStyles.includes(styleId)
      ? currentStyles.filter(id => id !== styleId)
      : [...currentStyles, styleId];
    
    onUpdate({ learningStyles: updatedStyles });
  };

  const toggleContentType = (typeId: string) => {
    const currentTypes = profile.contentTypes || [];
    const updatedTypes = currentTypes.includes(typeId)
      ? currentTypes.filter(id => id !== typeId)
      : [...currentTypes, typeId];
    
    onUpdate({ contentTypes: updatedTypes });
  };

  const validateAndNext = () => {
    if (!profile.learningStyles?.length || !profile.contentTypes?.length || !profile.difficultyPreference) {
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
          <BookOpen size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">How do you learn best?</h2>
        <p className="text-white/70">Help us customize your learning experience</p>
      </motion.div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button 
          onClick={onNext}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '0.875rem',
            cursor: 'pointer',
            zIndex: 10,
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.color = '#374151';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          Skip
        </button>

        {/* Learning Styles */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Learning Styles (Select all that apply)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {learningStyles.map((style) => (
              <OptionCard
                key={style.id}
                icon={style.icon}
                title={style.title}
                description={style.description}
                isSelected={profile.learningStyles?.includes(style.id) || false}
                onClick={() => toggleLearningStyle(style.id)}
              />
            ))}
          </div>
          {profile.learningStyles?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select at least one learning style
            </p>
          )}
        </div>

        {/* Content Types */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Preferred Content Types (Select multiple)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {contentTypes.map((type) => (
              <OptionCard
                key={type.id}
                icon={type.icon}
                title={type.title}
                description={type.description}
                isSelected={profile.contentTypes?.includes(type.id) || false}
                onClick={() => toggleContentType(type.id)}
                variant="compact"
              />
            ))}
          </div>
          {profile.contentTypes?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select at least one content type
            </p>
          )}
        </div>

        {/* Difficulty Preference */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            How challenging should the content be?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {difficultyPreferences.map((difficulty) => (
              <motion.button
                key={difficulty.value}
                onClick={() => onUpdate({ difficultyPreference: difficulty.value })}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  profile.difficultyPreference === difficulty.value
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="text-white font-semibold mb-1">{difficulty.label}</h4>
                <p className="text-white/70 text-sm">{difficulty.description}</p>
              </motion.button>
            ))}
          </div>
          {!profile.difficultyPreference && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select a difficulty preference
            </p>
          )}
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
          disabled={!profile.learningStyles?.length || !profile.contentTypes?.length || !profile.difficultyPreference}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};