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
        {/* Status Bar - Like Speaker App */}
        <div className="status-bar">
          <div className="status-time">9:41</div>
          <div className="status-indicators">
            <span>📶</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        <div className="card-content">
          <button className="skip-btn">Skip</button>
          
          {/* Header */}
          <div className="card-header">
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Welcome to
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>
              Speaker
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Language Learning App
            </p>
          </div>

          {/* Character Illustration - Like Speaker Characters */}
          <div className="character-container">
            <div className="character-main">
              👨‍🎓
            </div>
            <div className="floating-element">🇬🇧</div>
            <div className="floating-element">🇫🇷</div>
            <div className="floating-element">🇩🇪</div>
            <div className="floating-element">💬</div>
          </div>

          {/* Main Content */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Learn a language in 3 minutes a day
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '2rem' }}>
              Join millions of learners worldwide. Personalized lessons, 
              real-time feedback, and AI-powered progress tracking.
            </p>

            {/* Features Grid */}
            <div className="option-grid" style={{ marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.75rem',
                  color: 'white',
                  fontSize: '1.25rem'
                }}>
                  🎯
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  Personalized Learning
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.75rem',
                  color: 'white',
                  fontSize: '1.25rem'
                }}>
                  📊
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  Track Progress
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.75rem',
                  color: 'white',
                  fontSize: '1.25rem'
                }}>
                  🏆
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  Earn Achievements
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.75rem',
                  color: 'white',
                  fontSize: '1.25rem'
                }}>
                  🤖
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  AI-Powered
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer">
            <button
              onClick={onNext}
              className="btn-primary"
              style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}
            >
              Start Learning
            </button>
            
            <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', marginBottom: '1rem' }}>
              Already have an account? <span style={{ color: '#667eea', fontWeight: '500' }}>Log in</span>
            </p>
            
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
    </div>
  );
};