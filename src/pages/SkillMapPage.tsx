import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Lock, Shield, FileSearch, Code,
  CheckCircle2, Star, Trophy, Settings, User,
  ChevronRight, X
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import SettingsPanel from '../components/skillmap/SettingsPanel';
import { useSkillMapStore } from '../store/skillMapStore';

const icons = {
  Globe,
  Shield,
  FileSearch,
  Code,
  Lock,
  CheckCircle2,
  Star,
  Trophy,
};

const SkillMapPage: React.FC = () => {
  const { categories, selectedCategory, playerSettings } = useSkillMapStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const difficultyStyles = {
    bronze: 'from-amber-700 to-amber-900',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-cyan-400 to-cyan-600',
    diamond: 'from-purple-400 to-purple-600',
  };

  const LevelNode: React.FC<{ category: string; level: any }> = ({ category, level }) => {
    const isLocked = level.status === 'locked';
    const isCompleted = level.status === 'completed';
    const IconComponent = icons[level.icon as keyof typeof icons] || Shield;

    return (
      <motion.div
        whileHover={!isLocked ? { scale: 1.05 } : undefined}
        className={`relative ${
          isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <div
          className={`
            w-32 h-32 rounded-full 
            bg-gradient-to-r ${difficultyStyles[level.difficulty]}
            border-2 ${isCompleted ? 'border-cyber-green-200' : 'border-cyber-blue-200'}
            flex items-center justify-center
            relative overflow-hidden
            ${!isLocked && 'shadow-neon-blue'}
          `}
        >
          <div className="absolute inset-0 bg-cyber-black/30" />
          <div className="relative z-10 text-center p-4">
            <IconComponent className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm font-cyber truncate">{level.title}</div>
            <div className="text-xs text-cyber-blue-100">{level.points} pts</div>
          </div>

          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-cyber-black/70">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {isCompleted && (
            <div className="absolute top-2 right-2">
              <CheckCircle2 className="w-6 h-6 text-cyber-green-200" />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-cyber font-bold mb-4 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
                Skill Map
              </h1>
              <p className="text-gray-300 max-w-2xl">
                Master different cybersecurity disciplines through challenging missions.
                Complete each level to unlock new skills and advance your journey.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-cyber-black rounded-full p-2 border border-cyber-blue-200">
                <Avatar
                  src={playerSettings.avatarUrl}
                  alt={playerSettings.username}
                  size="md"
                  className="mr-3"
                />
                <span className="text-white mr-4">{playerSettings.username || 'Anonymous'}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                glowing
                className="rounded-full w-14 h-14 flex items-center justify-center"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          {categories.map((category) => {
            const IconComponent = icons[category.icon as keyof typeof icons] || Shield;
            
            return (
              <Card
                key={category.id}
                variant="primary"
                className={`p-6 bg-gradient-to-br ${category.background}`}
                hoverable
                glowing
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-cyber-blue-300 bg-opacity-20 flex items-center justify-center mr-3">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-cyber text-xl">{category.name}</h3>
                    <p className="text-sm text-cyber-blue-100">{category.codename}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  {category.levels.slice(0, 3).map((level) => (
                    <LevelNode
                      key={level.id}
                      category={category.id}
                      level={level}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="group"
                >
                  View All Levels
                  <ChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Card>
            );
          })}
        </motion.div>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </motion.div>
  );
};

export default SkillMapPage;