import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Users, Heart, Briefcase, GraduationCap, Plane, Star } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';
import { OptionCard } from '../OptionCard';

interface MotivationStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MotivationStep: React.FC<MotivationStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const motivationFactors = [
    {
      id: 'career',
      icon: Briefcase,
      title: 'Career Advancement',
      description: 'Improve job prospects and professional growth'
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Educational Goals',
      description: 'Academic requirements and exam preparation'
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel & Exploration',
      description: 'Communicate while traveling and exploring'
    },
    {
      id: 'personal',
      icon: Heart,
      title: 'Personal Growth',
      description: 'Self-improvement and intellectual development'
    },
    {
      id: 'social',
      icon: Users,
      title: 'Social Connections',
      description: 'Meet new people and build relationships'
    },
    {
      id: 'achievement',
      icon: Trophy,
      title: 'Achievement & Recognition',
      description: 'Earn certificates and recognition'
    },
    {
      id: 'curiosity',
      icon: Star,
      title: 'Curiosity & Interest',
      description: 'Love for languages and learning'
    },
    {
      id: 'necessity',
      icon: Zap,
      title: 'Immediate Need',
      description: 'Urgent requirement for work or life'
    }
  ];

  const toggleMotivation = (motivationId: string) => {
    const currentMotivations = profile.motivation || [];
    const updatedMotivations = currentMotivations.includes(motivationId)
      ? currentMotivations.filter(id => id !== motivationId)
      : [...currentMotivations, motivationId];
    
    onUpdate({ motivation: updatedMotivations });
  };

  const validateAndNext = () => {
    if (!profile.motivation?.length) {
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
        <h2 className="text-3xl font-bold text-white mb-2">What motivates you?</h2>
        <p className="text-white/70">Understanding your motivation helps us keep you engaged</p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h3 className="text-white font-semibold mb-6 text-center">
            What drives you to learn English? (Select all that apply)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {motivationFactors.map((factor) => (
              <OptionCard
                key={factor.id}
                icon={factor.icon}
                title={factor.title}
                description={factor.description}
                isSelected={profile.motivation?.includes(factor.id) || false}
                onClick={() => toggleMotivation(factor.id)}
                variant="compact"
              />
            ))}
          </div>
          {profile.motivation?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-4">
              Please select at least one motivation factor
            </p>
          )}
        </div>

        {/* Motivational Quote */}
        <motion.div
          className="glass rounded-2xl p-6 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-4xl mb-4">💪</div>
          <blockquote className="text-white/90 text-lg italic mb-3">
            "The limits of my language mean the limits of my world."
          </blockquote>
          <cite className="text-white/70 text-sm">— Ludwig Wittgenstein</cite>
        </motion.div>

        {/* Additional Motivation Input */}
        <div className="max-w-md mx-auto">
          <label className="block text-white font-medium mb-3 text-center">
            Tell us more about your motivation (Optional)
          </label>
          <textarea
            value={profile.motivation?.join(', ') || ''}
            onChange={(e) => {
              // This is just for display, actual motivation is handled by the cards above
            }}
            placeholder="Share what specifically motivates you to learn English..."
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
          disabled={!profile.motivation?.length}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Almost Done!
        </button>
      </motion.div>
    </div>
  );
};