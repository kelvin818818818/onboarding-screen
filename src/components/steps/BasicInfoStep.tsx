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
    <div className="phone-mockup">
      <div className="phone-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <button className="text-blue-600 text-sm float-right">Skip</button>
          <div className="text-center">
            <div className="character-container mb-4" style={{ width: '120px', height: '120px', margin: '0 auto' }}>
              <div className="character-main" style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}>
                👋
              </div>
              <div className="floating-element">✨</div>
              <div className="floating-element">📝</div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Tell us about yourself</h2>
            <p className="text-gray-600 text-sm">Help us personalize your experience</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Personal Information */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Full Name *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && (
                <p className="form-error">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Email Address *</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="Enter your email"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Age Range */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-medium mb-3 text-sm">Age Range *</h3>
            <div className="grid grid-cols-2 gap-2">
              {ageRanges.slice(0, 6).map((age) => (
                <div
                  key={age.value}
                  onClick={() => onUpdate({ age: age.value })}
                  className={`option-card ${profile.age === age.value ? 'selected' : ''}`}
                  style={{ padding: '0.75rem', textAlign: 'center' }}
                >
                  <div className="option-title" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    {age.label}
                  </div>
                  <div className="option-description" style={{ fontSize: '0.75rem' }}>
                    {age.description}
                  </div>
                </div>
              ))}
            </div>
            {errors.age && (
              <p className="form-error mt-2">{errors.age}</p>
            )}
          </div>

          {/* Occupation */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-medium mb-3 text-sm">Current Occupation *</h3>
            <div className="grid grid-cols-2 gap-2">
              {occupations.slice(0, 8).map((occ) => (
                <div
                  key={occ.value}
                  onClick={() => onUpdate({ occupation: occ.value })}
                  className={`option-card ${profile.occupation === occ.value ? 'selected' : ''}`}
                  style={{ padding: '0.75rem', textAlign: 'center' }}
                >
                  <div className="option-icon" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    {occ.icon}
                  </div>
                  <div className="option-title" style={{ fontSize: '0.75rem' }}>
                    {occ.label}
                  </div>
                </div>
              ))}
            </div>
            {errors.occupation && (
              <p className="form-error mt-2">{errors.occupation}</p>
            )}
          </div>

          {/* Education Level */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-medium mb-3 text-sm">Education Level *</h3>
            <div className="space-y-2">
              {educationLevels.slice(0, 6).map((edu) => (
                <div
                  key={edu.value}
                  onClick={() => onUpdate({ educationLevel: edu.value })}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                    profile.educationLevel === edu.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{edu.label}</div>
                    <div className="text-gray-600 text-xs">{edu.description}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    profile.educationLevel === edu.value
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {profile.educationLevel === edu.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.educationLevel && (
              <p className="form-error mt-2">{errors.educationLevel}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="btn-secondary px-4 py-2 text-sm"
            >
              Back
            </button>
            <button
              onClick={validateAndNext}
              disabled={!profile.name.trim() || !profile.email.trim() || !profile.age || !profile.occupation || !profile.educationLevel}
              className="btn-primary px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
          
          {/* Progress Dots */}
          <div className="progress-dots">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`progress-dot ${index + 1 === currentStep ? 'active' : index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};