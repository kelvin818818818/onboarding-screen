import React from 'react';
import { motion } from 'framer-motion';
import { Target, Briefcase, Plane, GraduationCap, Users, Heart, Globe, BookOpen } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';
import { OptionCard } from '../OptionCard';

interface GoalsStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GoalsStep: React.FC<GoalsStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const goals = [
    {
      id: 'conversation',
      icon: Users,
      title: 'Conversation Skills',
      description: 'Improve everyday speaking and listening'
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business English',
      description: 'Professional communication and presentations'
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel & Tourism',
      description: 'Navigate travel situations confidently'
    },
    {
      id: 'academic',
      icon: GraduationCap,
      title: 'Academic English',
      description: 'Prepare for exams and university studies'
    },
    {
      id: 'culture',
      icon: Heart,
      title: 'Cultural Understanding',
      description: 'Learn about English-speaking cultures'
    },
    {
      id: 'global',
      icon: Globe,
      title: 'Global Communication',
      description: 'Connect with people worldwide'
    },
    {
      id: 'literature',
      icon: BookOpen,
      title: 'Literature & Media',
      description: 'Enjoy books, movies, and entertainment'
    },
    {
      id: 'general',
      icon: Target,
      title: 'General Improvement',
      description: 'Overall English language development'
    }
  ];

  const timeframes = [
    { value: '1-3 months', label: '1-3 months', description: 'Quick improvement' },
    { value: '3-6 months', label: '3-6 months', description: 'Steady progress' },
    { value: '6-12 months', label: '6-12 months', description: 'Comprehensive learning' },
    { value: '1+ years', label: '1+ years', description: 'Long-term mastery' }
  ];

  const toggleGoal = (goalId: string) => {
    const currentGoals = profile.primaryGoals || [];
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(id => id !== goalId)
      : [...currentGoals, goalId];
    
    onUpdate({ primaryGoals: updatedGoals });
  };

  const validateAndNext = () => {
    if (!profile.primaryGoals?.length || !profile.timeframe) {
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
          <Target size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">What are your goals?</h2>
        <p className="text-white/70">Select all that apply to personalize your learning path</p>
      </motion.div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Primary Goals */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Primary Learning Goals (Select multiple)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {goals.map((goal) => (
              <OptionCard
                key={goal.id}
                icon={goal.icon}
                title={goal.title}
                description={goal.description}
                isSelected={profile.primaryGoals?.includes(goal.id) || false}
                onClick={() => toggleGoal(goal.id)}
                variant="compact"
              />
            ))}
          </div>
          {profile.primaryGoals?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select at least one goal
            </p>
          )}
        </div>

        {/* Timeframe */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            What's your target timeframe?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {timeframes.map((timeframe) => (
              <motion.button
                key={timeframe.value}
                onClick={() => onUpdate({ timeframe: timeframe.value })}
                className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  profile.timeframe === timeframe.value
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="text-white font-semibold mb-1">{timeframe.label}</h4>
                <p className="text-white/70 text-sm">{timeframe.description}</p>
              </motion.button>
            ))}
          </div>
          {!profile.timeframe && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select a timeframe
            </p>
          )}
        </div>

        {/* Specific Objectives (Optional) */}
        <div className="max-w-md mx-auto">
          <label className="block text-white font-medium mb-3 text-center">
            Any specific objectives? (Optional)
          </label>
          <textarea
            value={profile.specificObjectives?.join('\n') || ''}
            onChange={(e) => onUpdate({ 
              specificObjectives: e.target.value.split('\n').filter(obj => obj.trim()) 
            })}
            placeholder="e.g., Pass IELTS exam, Give presentations at work, Travel to English-speaking countries..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl glass text-white placeholder-white/50 border-2 border-white/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-400/30 focus:border-primary-400 resize-none"
          />
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
          disabled={!profile.primaryGoals?.length || !profile.timeframe}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};