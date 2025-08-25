import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, currentStep, totalSteps }) => {
  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="text-sm text-gray-500 mb-2">Welcome to</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">EnglishMaster Pro</h1>
          <p className="text-gray-600 text-sm">Your AI-powered learning companion</p>
        </div>

        {/* Character Illustration */}
        <div className="character-container">
          <div className="character-main">
            👨‍🎓
          </div>
          <div className="floating-element">📚</div>
          <div className="floating-element">🌟</div>
          <div className="floating-element">💡</div>
          <div className="floating-element">🎯</div>
        </div>

        {/* Content */}
        <div className="px-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Learn English in 3 minutes a day
          </h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Join millions of learners worldwide. Personalized lessons, 
            real-time feedback, and AI-powered progress tracking.
          </p>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🎯</span>
              </div>
              <p className="text-xs text-gray-600">Personalized</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📊</span>
              </div>
              <p className="text-xs text-gray-600">Track Progress</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🏆</span>
              </div>
              <p className="text-xs text-gray-600">Earn Badges</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-6">
          <button
            onClick={onNext}
            className="btn-primary w-full mb-4"
          >
            Start Learning
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            Already have an account? <span className="text-blue-600">Sign in</span>
          </p>
          
          {/* Progress Dots */}
          <div className="progress-dots mt-4">
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