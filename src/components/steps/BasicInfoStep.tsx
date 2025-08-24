import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/onboarding';

interface BasicInfoStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ageRanges = [
    { value: '13-17', label: '13-17', description: 'High School' },
    { value: '18-24', label: '18-24', description: 'University Age' },
    { value: '25-34', label: '25-34', description: 'Young Professional' },
    { value: '35-44', label: '35-44', description: 'Mid-Career' },
    { value: '45-54', label: '45-54', description: 'Senior Professional' },
    { value: '55-64', label: '55-64', description: 'Pre-Retirement' },
    { value: '65+', label: '65+', description: 'Retirement Age' }
  ];

  const occupations = [
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'teacher', label: 'Teacher/Educator', icon: '👨‍🏫' },
    { value: 'business', label: 'Business Professional', icon: '💼' },
    { value: 'healthcare', label: 'Healthcare Worker', icon: '⚕️' },
    { value: 'engineer', label: 'Engineer/Tech', icon: '👨‍💻' },
    { value: 'artist', label: 'Artist/Creative', icon: '🎨' },
    { value: 'service', label: 'Service Industry', icon: '🏪' },
    { value: 'government', label: 'Government/Public', icon: '🏛️' },
    { value: 'retired', label: 'Retired', icon: '🏖️' },
    { value: 'unemployed', label: 'Between Jobs', icon: '🔍' },
    { value: 'other', label: 'Other', icon: '💭' }
  ];

  const educationLevels = [
    { value: 'elementary', label: 'Elementary School', description: 'Basic education' },
    { value: 'middle', label: 'Middle School', description: 'Junior high level' },
    { value: 'high_school', label: 'High School', description: 'Secondary education' },
    { value: 'some_college', label: 'Some College', description: 'Partial university' },
    { value: 'associate', label: 'Associate Degree', description: '2-year degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree', description: '4-year degree' },
    { value: 'master', label: 'Master\'s Degree', description: 'Graduate degree' },
    { value: 'doctorate', label: 'Doctorate/PhD', description: 'Advanced degree' },
    { value: 'professional', label: 'Professional Degree', description: 'Law, Medicine, etc.' }
  ];

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!profile.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!profile.age) {
      newErrors.age = 'Please select your age range';
    }
    if (!profile.occupation) {
      newErrors.occupation = 'Please select your occupation';
    }
    if (!profile.educationLevel) {
      newErrors.educationLevel = 'Please select your education level';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
          <span className="text-3xl">👋</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell us about yourself</h2>
        <p className="text-gray-600">This helps us create your personalized learning experience</p>
      </motion.div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Personal Information */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border-2 ${
                  errors.name ? 'border-red-400' : 'border-white/20'
                } transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400`}
              />
              {errors.name && (
                <p className="text-red-300 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border-2 ${
                  errors.email ? 'border-red-400' : 'border-white/20'
                } transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400`}
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Age Range */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Age Range *</h3>
          <div className="option-grid">
            {ageRanges.map((age) => (
              <div
                key={age.value}
                onClick={() => onUpdate({ age: age.value })}
                className={`option-card ${profile.age === age.value ? 'selected' : ''}`}
              >
                <div className="option-title">{age.label}</div>
                <div className="option-description">{age.description}</div>
              </div>
            ))}
          </div>
          {errors.age && (
            <p className="text-red-300 text-sm mt-2">{errors.age}</p>
          )}
        </motion.div>

        {/* Occupation */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Current Occupation *</h3>
          <div className="option-grid">
            {occupations.map((occ) => (
              <div
                key={occ.value}
                onClick={() => onUpdate({ occupation: occ.value })}
                className={`option-card ${profile.occupation === occ.value ? 'selected' : ''}`}
              >
                <div className="option-icon">{occ.icon}</div>
                <div className="option-title">{occ.label}</div>
              </div>
            ))}
          </div>
          {errors.occupation && (
            <p className="text-red-300 text-sm mt-2">{errors.occupation}</p>
          )}
        </motion.div>

        {/* Education Level */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3>Education Level *</h3>
          <div className="space-y-3">
            {educationLevels.map((edu) => (
              <div
                key={edu.value}
                onClick={() => onUpdate({ educationLevel: edu.value })}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  profile.educationLevel === edu.value
                    ? 'bg-blue-500/30 border-2 border-blue-400'
                    : 'bg-white/10 border-2 border-white/20 hover:bg-white/15'
                }`}
              >
                <div>
                  <div className="text-white font-semibold">{edu.label}</div>
                  <div className="text-white/70 text-sm">{edu.description}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  profile.educationLevel === edu.value
                    ? 'bg-blue-400 border-blue-400'
                    : 'border-white/40'
                }`}>
                  {profile.educationLevel === edu.value && (
                    <div className="w-full h-full rounded-full bg-white/30"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {errors.educationLevel && (
            <p className="text-red-300 text-sm mt-2">{errors.educationLevel}</p>
          )}
        </motion.div>

        {/* Location (Optional) */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>Location (Optional)</h3>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="City, Country (helps with timezone and cultural context)"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border-2 border-white/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400"
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        className="flex justify-between items-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          ← Back
        </button>
        
        <div className="text-center">
          <div className="text-white/60 text-sm mb-2">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="text-white/80 text-xs">
            Basic Information
          </div>
        </div>
        
        <button
          onClick={validateAndNext}
          disabled={!profile.name.trim() || !profile.email.trim() || !profile.age || !profile.occupation || !profile.educationLevel}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </motion.div>
    </div>
  );
};