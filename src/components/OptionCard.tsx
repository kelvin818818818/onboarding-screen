import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'large' | 'compact';
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
  className = '',
  variant = 'default',
  disabled = false
}) => {
  const variants = {
    default: 'p-6',
    large: 'p-8',
    compact: 'p-4'
  };

  return (
    <motion.div
      className={clsx(
        'glass rounded-2xl cursor-pointer transition-all duration-300 border-2',
        variants[variant],
        {
          'border-primary-400 bg-primary-500/20 shadow-2xl ring-4 ring-primary-400/30': isSelected,
          'border-white/20 hover:border-white/40 hover:bg-white/10': !isSelected && !disabled,
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          className={clsx(
            'p-4 rounded-2xl transition-all duration-300',
            {
              'bg-primary-400 text-white shadow-lg': isSelected,
              'bg-white/20 text-white': !isSelected,
            }
          )}
          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Icon size={variant === 'large' ? 32 : variant === 'compact' ? 20 : 24} />
        </motion.div>
        
        <div>
          <h3 className={clsx(
            'font-semibold text-white mb-1',
            {
              'text-lg': variant === 'large',
              'text-base': variant === 'default',
              'text-sm': variant === 'compact',
            }
          )}>
            {title}
          </h3>
          <p className={clsx(
            'text-white/70 leading-relaxed',
            {
              'text-base': variant === 'large',
              'text-sm': variant === 'default',
              'text-xs': variant === 'compact',
            }
          )}>
            {description}
          </p>
        </div>
      </div>
      
      {isSelected && (
        <motion.div
          className="absolute -top-1 -right-1 bg-primary-400 text-white rounded-full shadow-lg"
          style={{ 
            width: '28px', 
            height: '28px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '14px'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};