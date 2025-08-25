import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, currentStep, totalSteps }) => {
  return (
    <div className="main-content">
      {/* Header Section */}
      <div style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', opacity: 0.9 }}>
          Welcome to
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', margin: 0 }}>
          Speaker
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.9, margin: 0 }}>
          Language Learning Platform
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <button 
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            background: 'none', 
            border: 'none', 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '0.875rem', 
            cursor: 'pointer' 
          }}
        >
          Skip
        </button>

        {/* Character Illustration */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <div style={{ 
            position: 'relative', 
            width: '200px', 
            height: '200px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              zIndex: 2
            }}>
              👨‍🎓
            </div>
            <motion.div
              style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                background: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                fontSize: '1.5rem'
              }}
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🇬🇧
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '10%',
                background: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                fontSize: '1.5rem'
              }}
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🇫🇷
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                background: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                fontSize: '1.5rem'
              }}
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              🇩🇪
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                background: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                fontSize: '1.5rem'
              }}
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            >
              💬
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>
            Learn a language in 3 minutes a day
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Join millions of learners worldwide. Personalized lessons, 
            real-time feedback, and AI-powered progress tracking.
          </p>

          {/* Features Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}>
                🎯
              </div>
              <p style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '600' }}>
                Personalized Learning
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
              }}>
                📊
              </div>
              <p style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '600' }}>
                Track Progress
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
              }}>
                🏆
              </div>
              <p style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '600' }}>
                Earn Achievements
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)'
              }}>
                🤖
              </div>
              <p style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '600' }}>
                AI-Powered
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onNext}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 3rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              marginBottom: '2rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)';
            }}
          >
            Start Learning
          </button>
          
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '2rem' }}>
            Already have an account? <span style={{ color: '#667eea', fontWeight: '500', cursor: 'pointer' }}>Log in</span>
          </p>
          
          {/* Progress Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: index + 1 === currentStep ? '#667eea' : index < currentStep ? '#10b981' : '#d1d5db',
                  transform: index + 1 === currentStep ? 'scale(1.5)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};