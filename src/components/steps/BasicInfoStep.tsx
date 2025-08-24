import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Languages } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';

interface BasicInfoStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ageRanges = [
    '13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
  ];

  const commonLanguages = [
    'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'Portuguese', 'Bengali',
    'Russian', 'Japanese', 'French', 'German', 'Korean', 'Italian',
    'Vietnamese', 'Turkish', 'Polish', 'Dutch', 'Other'
  ];

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!profile.age) {
      newErrors.age = 'Please select your age range';
    }
    if (!profile.nativeLanguage) {
      newErrors.nativeLanguage = 'Please select your native language';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Skip Button */}
      <button 
        onClick={onNext}
        className="btn-skip absolute top-8 right-8 z-10"
      >
        Skip
      </button>

      <div className="mobile-card w-full max-w-sm space-y-6">
        {/* Character Illustration */}
        <motion.div
          className="character-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-illustration">
            👋
          </div>
          <motion.div
            className="absolute top-6 right-6 text-2xl"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎯
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h2>
          <p className="text-gray-600">This helps us personalize your experience</p>
        </motion.div>

        {/* Form Fields */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              What's your name? *
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Enter your first name"
              className={`w-full px-4 py-4 rounded-2xl bg-gray-50 border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/30 ${
                errors.name ? 'border-red-400' : 'border-gray-200 focus:border-indigo-400'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              What's your age range? *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ageRanges.map((age) => (
                <motion.button
                  key={age}
                  onClick={() => onUpdate({ age })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    profile.age === age
                      ? 'bg-indigo-500 text-white shadow-lg ring-4 ring-indigo-400/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {age}
                </motion.button>
              ))}
            </div>
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={onBack}
            className="btn-secondary px-6 py-3"
          >
            Back
          </button>
          <button
            onClick={validateAndNext}
            className="btn-primary px-6 py-3"
          >
            Continue
          </button>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
          <User size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h2>
        <p className="text-white/70">This helps us personalize your learning experience</p>
      </motion.div>

      <motion.div
        className="space-y-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Name Input */}
        <div>
          <label className="block text-white font-medium mb-2">
            What's your name? *
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Enter your first name"
            className={`w-full px-4 py-3 rounded-xl glass text-white placeholder-white/50 border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-400/30 ${
              errors.name ? 'border-error-400' : 'border-white/20 focus:border-primary-400'
            }`}
          />
          {errors.name && (
            <p className="text-error-300 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-white font-medium mb-3">
            What's your age range? *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ageRanges.map((age) => (
              <motion.button
                key={age}
                onClick={() => onUpdate({ age })}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  profile.age === age
                    ? 'bg-primary-500 text-white shadow-lg ring-4 ring-primary-400/30'
                    : 'glass text-white/80 hover:bg-white/10 border border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {age}
              </motion.button>
            ))}
          </div>
          {errors.age && (
            <p className="text-error-300 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Native Language */}
        <div>
          <label className="block text-white font-medium mb-3">
            What's your native language? *
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {commonLanguages.map((language) => (
              <motion.button
                key={language}
                onClick={() => onUpdate({ nativeLanguage: language })}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                  profile.nativeLanguage === language
                    ? 'bg-primary-500 text-white shadow-lg ring-4 ring-primary-400/30'
                    : 'glass text-white/80 hover:bg-white/10 border border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language}
              </motion.button>
            ))}
          </div>
          {errors.nativeLanguage && (
            <p className="text-error-300 text-sm mt-1">{errors.nativeLanguage}</p>
          )}
        </div>

        {/* Current Location (Optional) */}
        <div>
          <label className="block text-white font-medium mb-2">
            Where are you located? (Optional)
          </label>
          <div className="relative">
            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
            <input
              type="text"
              value={profile.currentLocation}
              onChange={(e) => onUpdate({ currentLocation: e.target.value })}
              placeholder="City, Country"
              className="w-full pl-12 pr-4 py-3 rounded-xl glass text-white placeholder-white/50 border-2 border-white/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-400/30 focus:border-primary-400"
            />
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
          className="btn-primary px-6 py-3"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};