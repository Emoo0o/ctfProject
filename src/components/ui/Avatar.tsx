import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const statusColors = {
    online: 'bg-cyber-green-200',
    offline: 'bg-gray-400',
    away: 'bg-cyber-yellow',
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`
        ${sizeStyles[size]}
        rounded-full 
        overflow-hidden 
        bg-cyber-gray
        border-2 border-cyber-blue-200
        shadow-neon-blue
      `}>
        {src ? (
          <img 
            src={src} 
            alt={alt || 'Avatar'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <User className={size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'} />
          </div>
        )}
      </div>

      {status && (
        <div className={`
          absolute bottom-0 right-0
          w-3 h-3
          rounded-full
          border-2 border-cyber-black
          ${statusColors[status]}
        `} />
      )}
    </motion.div>
  );
};

export default Avatar;