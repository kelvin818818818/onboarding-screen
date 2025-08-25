import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Bell, Zap } from 'lucide-react';
import { UserProfile } from '../../types/onboarding';
import { OptionCard } from '../OptionCard';

interface TimeCommitmentStepProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TimeCommitmentStep: React.FC<TimeCommitmentStepProps> = ({
  profile,
  onUpdate,
  onNext,
  onBack
}) => {
  const timeCommitments = [
    {
      id: '15-30min',
      icon: Zap,
      title: '15-30 minutes',
      description: 'Quick daily sessions'
    },
    {
      id: '30-60min',
      icon: Clock,
      title: '30-60 minutes',
      description: 'Focused learning time'
    },
    {
      id: '1-2hours',
      icon: Calendar,
      title: '1-2 hours',
      description: 'Deep learning sessions'
    },
    {
      id: '2+hours',
      icon: Calendar,
      title: '2+ hours',
      description: 'Intensive study periods'
    }
  ];

  const scheduleOptions = [
    { id: 'morning', label: 'Morning (6-12 PM)', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon (12-6 PM)', icon: '☀️' },
    { id: 'evening', label: 'Evening (6-10 PM)', icon: '🌆' },
    { id: 'night', label: 'Night (10 PM-12 AM)', icon: '🌙' },
    { id: 'flexible', label: 'Flexible Schedule', icon: '🔄' }
  ];

  const studyDurations = [
    { value: '5-10min', label: '5-10 minutes', description: 'Micro-learning sessions' },
    { value: '10-20min', label: '10-20 minutes', description: 'Short focused bursts' },
    { value: '20-45min', label: '20-45 minutes', description: 'Standard lesson length' },
    { value: '45min+', label: '45+ minutes', description: 'Extended learning sessions' }
  ];

  const reminderTypes = [
    { id: 'daily', label: 'Daily Reminders', icon: '📅' },
    { id: 'streak', label: 'Streak Notifications', icon: '🔥' },
    { id: 'progress', label: 'Progress Updates', icon: '📊' },
    { id: 'achievements', label: 'Achievement Alerts', icon: '🏆' },
    { id: 'none', label: 'No Reminders', icon: '🔕' }
  ];

  const toggleSchedule = (scheduleId: string) => {
    const currentSchedule = profile.preferredSchedule || [];
    const updatedSchedule = currentSchedule.includes(scheduleId)
      ? currentSchedule.filter(id => id !== scheduleId)
      : [...currentSchedule, scheduleId];
    
    onUpdate({ preferredSchedule: updatedSchedule });
  };

  const toggleReminder = (reminderId: string) => {
    const currentReminders = profile.reminderPreferences || [];
    const updatedReminders = currentReminders.includes(reminderId)
      ? currentReminders.filter(id => id !== reminderId)
      : [...currentReminders, reminderId];
    
    onUpdate({ reminderPreferences: updatedReminders });
  };

  const validateAndNext = () => {
    if (!profile.availableTime || !profile.preferredSchedule?.length || !profile.studyDuration) {
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
          <Clock size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">How much time can you commit?</h2>
        <p className="text-white/70">Let's create a realistic study schedule</p>
      </motion.div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button 
          onClick={onNext}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '0.875rem',
            cursor: 'pointer',
            zIndex: 10,
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.color = '#374151';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          Skip
        </button>

        {/* Daily Time Commitment */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            How much time per day?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {timeCommitments.map((time) => (
              <OptionCard
                key={time.id}
                icon={time.icon}
                title={time.title}
                description={time.description}
                isSelected={profile.availableTime === time.id}
                onClick={() => onUpdate({ availableTime: time.id })}
                variant="compact"
              />
            ))}
          </div>
          {!profile.availableTime && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select your available time
            </p>
          )}
        </div>

        {/* Preferred Schedule */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            When do you prefer to study? (Select multiple)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {scheduleOptions.map((schedule) => (
              <motion.button
                key={schedule.id}
                onClick={() => toggleSchedule(schedule.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  profile.preferredSchedule?.includes(schedule.id)
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{schedule.icon}</span>
                  <span className="text-white font-medium">{schedule.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
          {profile.preferredSchedule?.length === 0 && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select at least one time preference
            </p>
          )}
        </div>

        {/* Study Session Duration */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Preferred session length?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {studyDurations.map((duration) => (
              <motion.button
                key={duration.value}
                onClick={() => onUpdate({ studyDuration: duration.value })}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  profile.studyDuration === duration.value
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="text-white font-semibold mb-1">{duration.label}</h4>
                <p className="text-white/70 text-sm">{duration.description}</p>
              </motion.button>
            ))}
          </div>
          {!profile.studyDuration && (
            <p className="text-warning-300 text-sm text-center mt-2">
              Please select a session duration
            </p>
          )}
        </div>

        {/* Reminder Preferences */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">
            Notification preferences (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {reminderTypes.map((reminder) => (
              <motion.button
                key={reminder.id}
                onClick={() => toggleReminder(reminder.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  profile.reminderPreferences?.includes(reminder.id)
                    ? 'border-primary-400 bg-primary-500/20 shadow-xl ring-4 ring-primary-400/30'
                    : 'glass border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-2xl">{reminder.icon}</span>
                  <span className="text-white font-medium text-sm">{reminder.label}</span>
                </div>
              </motion.button>
            ))}
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
          disabled={!profile.availableTime || !profile.preferredSchedule?.length || !profile.studyDuration}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};