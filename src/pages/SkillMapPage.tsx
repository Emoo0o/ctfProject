import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Lock, Shield, FileSearch, Code, Terminal,
  CheckCircle2, Star, Trophy, Settings, User, Package,
  MessageSquare, Search, Layers, Copy, Repeat, Ticket,
  Camera, Timer, Clock, Key, File, Music, Image
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
  Terminal,
  Package,
  MessageSquare,
  Search,
  Layers,
  Copy,
  Repeat,
  Ticket,
  Camera,
  Timer,
  Clock,
  Key,
  File,
  Music,
  Image
};

const SkillMapPage: React.FC = () => {
  const { categories, selectedCategory, playerSettings } = useSkillMapStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

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

  const difficultyGlows = {
    bronze: 'shadow-neon-orange',
    silver: 'shadow-neon-blue',
    gold: 'shadow-neon-yellow',
    platinum: 'shadow-neon-blue',
    diamond: 'shadow-neon-pink',
  };

  const LevelNode: React.FC<{ category: string; level: any }> = ({ category, level }) => {
    const isLocked = level.status === 'locked';
    const isCompleted = level.status === 'completed';
    const IconComponent = icons[level.icon as keyof typeof icons] || Shield;

    const nodeVariants = {
      initial: { scale: 0.95, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: { duration: 0.5 }
      },
      hover: { 
        scale: 1.05,
        transition: { duration: 0.3 }
      },
      tap: { scale: 0.95 },
    };

    const glowVariants = {
      initial: { opacity: 0 },
      animate: { 
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    };

    const fogVariants = {
      initial: { opacity: 0 },
      animate: { 
        opacity: 0.7,
        transition: {
          duration: 1
        }
      }
    };

    return (
      <motion.div
        variants={nodeVariants}
        initial="initial"
        animate="animate"
        whileHover={!isLocked ? "hover" : undefined}
        whileTap={!isLocked ? "tap" : undefined}
        className="relative"
        onHoverStart={() => setHoveredLevel(level.id)}
        onHoverEnd={() => setHoveredLevel(null)}
      >
        <div className={`
          relative w-32 h-32 rounded-full 
          overflow-hidden
          ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}>
          {/* Background gradient and glow */}
          <div className={`
            absolute inset-0
            bg-gradient-to-r ${difficultyStyles[level.difficulty]}
            ${!isLocked && difficultyGlows[level.difficulty]}
            transition-all duration-300
          `} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
            <IconComponent className={`
              w-8 h-8 mb-2
              ${isLocked ? 'text-gray-400' : 'text-white'}
            `} />
            <div className={`
              text-sm font-cyber text-center truncate
              ${isLocked ? 'text-gray-400' : 'text-white'}
            `}>
              {level.title}
            </div>
            <div className="text-xs text-cyber-blue-100">
              {level.points} pts
            </div>
          </div>

          {/* Completion overlay */}
          {isCompleted && (
            <motion.div
              className="absolute inset-0 bg-cyber-green-200 bg-opacity-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle2 className="w-10 h-10 text-cyber-green-200" />
            </motion.div>
          )}

          {/* Lock overlay */}
          {isLocked && (
            <motion.div
              variants={fogVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-cyber-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center"
            >
              <Lock className="w-8 h-8 text-gray-400" />
            </motion.div>
          )}

          {/* Hover glow effect */}
          {!isLocked && hoveredLevel === level.id && (
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className={`absolute inset-0 bg-gradient-to-r ${difficultyStyles[level.difficulty]} opacity-30`}
            />
          )}
        </div>

        {/* Level info tooltip on hover */}
        <AnimatePresence>
          {hoveredLevel === level.id && !isLocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-48 z-50"
            >
              <div className="bg-cyber-black border border-cyber-blue-200 rounded-lg p-3 shadow-neon-blue">
                <h4 className="font-cyber text-sm mb-1">{level.title}</h4>
                <p className="text-xs text-gray-400">{level.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge 
                    variant="primary" 
                    size="sm"
                    className="capitalize"
                  >
                    {level.difficulty}
                  </Badge>
                  <span className="text-xs text-cyber-blue-100">{level.points} pts</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <motion.div 
                className="flex items-center bg-cyber-black rounded-full p-2 border border-cyber-blue-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar
                  src={playerSettings.avatarUrl}
                  alt={playerSettings.username}
                  size="md"
                  className="mr-3"
                />
                <span className="text-white mr-4">{playerSettings.username || 'Anonymous'}</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  glowing
                  className="rounded-full w-14 h-14 flex items-center justify-center"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="w-6 h-6" />
                </Button>
              </motion.div>
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
                className={`p-6 bg-gradient-to-br ${category.background} relative overflow-hidden`}
                hoverable
                glowing
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="h-full w-full bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] animate-pulse-slow"></div>
                </div>

                <div className="relative">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-cyber-blue-300 bg-opacity-20 flex items-center justify-center mr-3"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>
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
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10">View All Levels</span>
                    <motion.div
                      className="absolute inset-0 bg-cyber-blue-200 opacity-0"
                      whileHover={{ opacity: 0.1 }}
                    />
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      whileHover={{ x: 4 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </div>
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