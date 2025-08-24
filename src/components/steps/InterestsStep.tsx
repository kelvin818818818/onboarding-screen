import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Camera, Gamepad2, Plane, Utensils, Book, Dumbbell, Palette, Code, Globe, Film } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';
import { OptionCard } from '../OptionCard';

interface InterestsStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const InterestsStep: React.FC<InterestsStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const interests = [
    { id: 'music', icon: Music, title: 'Music', description: 'Songs, concerts, instruments' },
    { id: 'travel', icon: Plane, title: 'Travel', description: 'Exploring new places' },
    { id: 'food', icon: Utensils, title: 'Food & Cooking', description: 'Recipes and cuisines' },
    { id: 'sports', icon: Dumbbell, title: 'Sports & Fitness', description: 'Exercise and athletics' },
    { id: 'technology', icon: Code, title: 'Technology', description: 'Gadgets and innovation' },
    { id: 'movies', icon: Film, title: 'Movies & TV', description: 'Entertainment and cinema' },
    { id: 'books', icon: Book, title: 'Books & Reading', description: 'Literature and stories' },
    { id: 'art', icon: Palette, title: 'Art & Design', description: 'Creative expression' },
    { id: 'gaming', icon: Gamepad2, title: 'Gaming', description: 'Video games and esports' },
    { id: 'photography', icon: Camera, title: 'Photography', description: 'Capturing moments' },
    { id: 'culture', icon: Globe, title: 'Culture & History', description: 'Learning about societies' },
    { id: 'nature', icon: Heart, title: 'Nature & Environment', description: 'Outdoors and wildlife' }
  ];

  const topics = [
    'Business & Career', 'Science & Technology', 'Health & Wellness', 'Education',
    'Politics & Current Events', 'Entertainment', 'Lifestyle', 'Relationships',
    'Finance & Money', 'Environment', 'Philosophy', 'Psychology'
  ];

  const culturalPreferences = [
    { id: 'american', label: 'American English', flag: '🇺🇸' },
    { id: 'british', label: 'British English', flag: '🇬🇧' },
    { id: 'australian', label: 'Australian English', flag: '🇦🇺' },
    { id: 'canadian', label: 'Canadian English', flag: '🇨🇦' },
    { id: 'mixed', label: 'Mixed/International', flag: '🌍' }
  ];

  const toggleInterest = (interestId: string) => {
    const currentInterests = profile.interests || [];
    const updatedInterests = currentInterests.includes(interestId)
      ? currentInterests.filter(id => id !== interestId)
      : [...currentInterests, interestId];
    
    onUpdate({ interests: updatedInterests });
  };

  const toggleTopic = (topic: string) => {
    const currentTopics = profile.topics || [];
    const updatedTopics = currentTopics.includes(topic)
      ? currentTopics.filter(t => t !== topic)
      : [...currentTopics, topic];
    
    onUpdate({ topics: updatedTopics });
  };

  const toggleCulturalPreference = (prefId: string) => {
    const currentPrefs = profile.culturalPreferences || [];
    const updatedPrefs = currentPrefs.includes(prefId)
      ? currentPrefs.filter(id => id !== prefId)
      : [...currentPrefs, prefId];
    
    onUpdate({ culturalPreferences: updatedPrefs });
  };

  const validateAndNext = () => {
    if (!profile.interests?.length) {
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
          <Heart size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">What interests you?</h2>
        <p className="text-white/70">We'll use this to personalize your content</p>
      </motion.div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Personal Interests */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Personal Interests (Select multiple)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {interests.map((interest) => (
              <OptionCard
                key={interest.id}
                icon={interest.icon}
                title={interest.title}
                description={interest.description}
                isSelected={profile.interests?.includes(interest.id) || false}
                onClick={() => toggleInterest(interest.id)}
                variant="compact"
              />
            ))}
          </div>
          {profile.interests?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select at least one interest
            </p>
          )}
        </div>

        {/* Discussion Topics */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Topics you'd like to discuss (Optional)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl mx-auto">
            {topics.map((topic) => (
              <motion.button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  profile.topics?.includes(topic)
                    ? 'bg-primary-500 text-white shadow-lg ring-2 ring-primary-400/50'
                    : 'glass text-white/80 hover:bg-white/10 border border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {topic}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cultural Preferences */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            English variety preference (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {culturalPreferences.map((pref) => (
              <motion.button
                key={pref.id}
                onClick={() => toggleCulturalPreference(pref.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  profile.culturalPreferences?.includes(pref.id)
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{pref.flag}</span>
                  <span className="text-white font-medium">{pref.label}</span>
                </div>
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
          disabled={!profile.interests?.length}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};