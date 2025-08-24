import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, User, Target, Clock, Heart, Zap, BookOpen, Trophy } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';

interface CompletionStepProps {
  profile: UserProfile;
  onComplete: () => void;
  onBack: () => void;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
  profile,
  onComplete,
  onBack
}) => {
  const profileSummary = [
    {
      icon: User,
      label: 'Profile',
      value: `${profile.name}, ${profile.age} years old`
    },
    {
      icon: BookOpen,
      label: 'English Level',
      value: profile.overallLevel?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not specified'
    },
    {
      icon: Target,
      label: 'Primary Goals',
      value: profile.primaryGoals?.length ? `${profile.primaryGoals.length} goals selected` : 'Not specified'
    },
    {
      icon: Clock,
      label: 'Time Commitment',
      value: profile.availableTime?.replace('-', ' to ') || 'Not specified'
    },
    {
      icon: Heart,
      label: 'Interests',
      value: profile.interests?.length ? `${profile.interests.length} interests selected` : 'Not specified'
    },
    {
      icon: Zap,
      label: 'Learning Style',
      value: profile.learningStyles?.length ? `${profile.learningStyles.length} styles selected` : 'Not specified'
    }
  ];

  const completionPercentage = 95; // Calculate based on filled fields

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto bg-gradient-to-br from-success-400 to-success-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <CheckCircle size={40} className="text-white" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            🎉 Profile Complete!
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Great job! We've created your personalized learning profile. 
            Your English learning journey is about to begin!
          </p>
        </motion.div>
      </motion.div>

      {/* Completion Progress */}
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="glass rounded-2xl p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: completionPercentage / 100 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                style={{
                  strokeDasharray: "314.16",
                  strokeDashoffset: "314.16"
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{completionPercentage}%</span>
            </div>
          </div>
          <h3 className="text-white font-semibold mb-2">Profile Completion</h3>
          <p className="text-white/70 text-sm">Your learning profile is ready!</p>
        </div>
      </motion.div>

      {/* Profile Summary */}
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-white font-semibold text-center mb-6">Your Learning Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileSummary.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <item.icon size={20} className="text-primary-300" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        className="glass rounded-2xl p-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center">
          <Trophy size={32} className="text-warning-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-3">What's Next?</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>✨ Personalized lesson recommendations</p>
            <p>🎯 Custom learning path based on your goals</p>
            <p>📊 Progress tracking and achievements</p>
            <p>🎮 Interactive exercises tailored to your style</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-between max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <button
          onClick={onBack}
          className="btn-secondary px-6 py-3"
        >
          Back
        </button>
        <motion.button
          onClick={onComplete}
          className="btn-primary px-8 py-4 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Learning! 🚀
        </motion.button>
      </motion.div>
    </div>
  );
};