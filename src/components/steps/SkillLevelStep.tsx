import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Award, Target } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';

interface SkillLevelStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SkillLevelStep: React.FC<SkillLevelStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const [showDetailedAssessment, setShowDetailedAssessment] = useState(false);

  const overallLevels = [
    { 
      value: 'beginner' as const, 
      label: 'Beginner', 
      description: 'I know very little English',
      color: 'from-red-400 to-red-500'
    },
    { 
      value: 'elementary' as const, 
      label: 'Elementary', 
      description: 'I can understand basic phrases',
      color: 'from-orange-400 to-orange-500'
    },
    { 
      value: 'intermediate' as const, 
      label: 'Intermediate', 
      description: 'I can have simple conversations',
      color: 'from-yellow-400 to-yellow-500'
    },
    { 
      value: 'upper-intermediate' as const, 
      label: 'Upper-Intermediate', 
      description: 'I can discuss various topics',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      value: 'advanced' as const, 
      label: 'Advanced', 
      description: 'I can express myself fluently',
      color: 'from-green-400 to-green-500'
    },
    { 
      value: 'proficient' as const, 
      label: 'Proficient', 
      description: 'I have near-native fluency',
      color: 'from-purple-400 to-purple-500'
    }
  ];

  const skillAreas = [
    { key: 'speaking' as const, label: 'Speaking', icon: '🗣️' },
    { key: 'listening' as const, label: 'Listening', icon: '👂' },
    { key: 'reading' as const, label: 'Reading', icon: '📖' },
    { key: 'writing' as const, label: 'Writing', icon: '✍️' },
    { key: 'grammar' as const, label: 'Grammar', icon: '📝' },
    { key: 'vocabulary' as const, label: 'Vocabulary', icon: '📚' }
  ];

  const handleSkillLevelChange = (skill: keyof UserProfile['skillLevels'], level: number) => {
    onUpdate({
      skillLevels: {
        ...profile.skillLevels,
        [skill]: level
      }
    });
  };

  const validateAndNext = () => {
    if (!profile.overallLevel) {
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
          <BarChart3 size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">What's your English level?</h2>
        <p className="text-white/70">Help us understand your current abilities</p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Overall Level Selection */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">Overall English Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {overallLevels.map((level) => (
              <motion.button
                key={level.value}
                onClick={() => onUpdate({ overallLevel: level.value })}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  profile.overallLevel === level.value
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${level.color}`} />
                  <div>
                    <h4 className="text-white font-semibold">{level.label}</h4>
                    <p className="text-white/70 text-sm">{level.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detailed Assessment Toggle */}
        {profile.overallLevel && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setShowDetailedAssessment(!showDetailedAssessment)}
              className="btn-secondary px-6 py-3"
            >
              {showDetailedAssessment ? 'Hide' : 'Show'} Detailed Assessment
            </button>
          </motion.div>
        )}

        {/* Detailed Skill Assessment */}
        {showDetailedAssessment && (
          <motion.div
            className="space-y-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white font-semibold text-center mb-6">
              Rate your skills (1-10)
            </h3>
            
            {skillAreas.map((skill) => (
              <div key={skill.key} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-white font-medium">{skill.label}</span>
                  </div>
                  <span className="text-primary-300 font-bold text-lg">
                    {profile.skillLevels[skill.key] || 1}
                  </span>
                </div>
                
                <div className="flex space-x-1">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                    <button
                      key={level}
                      onClick={() => handleSkillLevelChange(skill.key, level)}
                      className={`flex-1 h-8 rounded transition-all duration-200 ${
                        level <= (profile.skillLevels[skill.key] || 1)
                          ? 'bg-gradient-to-r from-primary-400 to-secondary-400 shadow-lg'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
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
          disabled={!profile.overallLevel}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};