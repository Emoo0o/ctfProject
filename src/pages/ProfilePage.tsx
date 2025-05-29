import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Award, Clock, Star, Shield, Trophy, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { categories, gameProgress } = useGameStore();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  // Calculate stats
  const completedChallenges = gameProgress.completedChallenges.length;
  const totalChallenges = categories.reduce((acc, cat) => acc + cat.challenges.length, 0);
  const percentComplete = Math.round((completedChallenges / totalChallenges) * 100) || 0;
  
  // Format time played
  const formatTimePlayed = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  
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
  
  // Get recently completed challenges
  const recentCompletedChallenges = gameProgress.completedChallenges
    .slice(-3)
    .reverse()
    .map(challId => {
      let challengeData = null;
      let categoryData = null;
      
      for (const cat of categories) {
        const challenge = cat.challenges.find(ch => ch.id === challId);
        if (challenge) {
          challengeData = challenge;
          categoryData = cat;
          break;
        }
      }
      
      return { challenge: challengeData, category: categoryData };
    })
    .filter(item => item.challenge && item.category);

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-6" variants={itemVariants}>
          <button 
            onClick={() => navigate('/map')}
            className="flex items-center text-cyber-blue-100 hover:text-cyber-blue-200 transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Map</span>
          </button>
          
          <h1 className="text-3xl font-cyber font-bold mb-2 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
            Hacker Profile
          </h1>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <motion.div variants={itemVariants}>
            <Card className="p-6" variant="primary">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-cyber-gray flex items-center justify-center text-cyber-blue-100 mr-4">
                  <User size={40} />
                </div>
                <div>
                  <h2 className="text-2xl font-cyber mb-1">{user.username}</h2>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      {user.rank}
                    </Badge>
                    <span className="text-gray-300 text-sm">ID: {user.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award size={20} className="text-cyber-pink-100 mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">Experience</span>
                      <span className="text-sm font-semibold">{user.xp} XP</span>
                    </div>
                    <div className="h-2 bg-cyber-gray rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-pink-200 to-cyber-pink-100" 
                        style={{ width: `${Math.min(user.xp / 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Star size={20} className="text-cyber-yellow mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">Points</span>
                      <span className="text-sm font-semibold">{user.points}</span>
                    </div>
                    <div className="h-2 bg-cyber-gray rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-yellow to-cyber-orange" 
                        style={{ width: `${Math.min(user.points / 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={20} className="text-cyber-blue-100 mr-3" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-300">Time Played</span>
                    <span className="font-mono">{formatTimePlayed(user.timePlayed)}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield size={20} className="text-cyber-green-100 mr-3" />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-300">Challenges Completed</span>
                    <span>
                      <span className="font-semibold">{completedChallenges}</span>
                      <span className="text-gray-400">/{totalChallenges}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/leaderboard')}
                  className="flex items-center justify-center"
                >
                  <Trophy size={16} className="mr-2" />
                  <span>View Leaderboard</span>
                </Button>
              </div>
            </Card>
          </motion.div>
          
          {/* Progress Stats */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="p-6 h-full" variant="dark">
              <h3 className="text-xl font-cyber mb-6">Progress & Achievements</h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Overall Completion</span>
                  <span className="font-semibold">{percentComplete}%</span>
                </div>
                <div className="h-3 bg-cyber-gray rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-blue-300 to-cyber-pink-300" 
                    style={{ width: `${percentComplete}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {categories.map((category) => {
                  const completedCount = category.challenges.filter(
                    ch => gameProgress.completedChallenges.includes(ch.id)
                  ).length;
                  const totalCount = category.challenges.length;
                  const categoryPercent = Math.round((completedCount / totalCount) * 100) || 0;
                  
                  return (
                    <div key={category.id} className="bg-cyber-gray bg-opacity-20 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span>{category.name}</span>
                        <span>
                          <span className="font-semibold">{completedCount}</span>
                          <span className="text-gray-400">/{totalCount}</span>
                        </span>
                      </div>
                      <div className="h-2 bg-cyber-gray rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${category.color}-200`}
                          style={{ width: `${categoryPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div>
                <h4 className="font-cyber text-lg mb-4">Recent Activity</h4>
                
                {recentCompletedChallenges.length > 0 ? (
                  <div className="space-y-3">
                    {recentCompletedChallenges.map(({ challenge, category }, index) => (
                      <div 
                        key={index}
                        className="bg-cyber-gray bg-opacity-10 rounded-lg p-3 flex items-center"
                      >
                        <div className={`w-10 h-10 rounded-full bg-${category?.color}-300 bg-opacity-20 flex items-center justify-center mr-3`}>
                          <Trophy size={20} className={`text-${category?.color}-200`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h5 className="font-cyber">{challenge?.title}</h5>
                            <Badge variant="success" size="sm">{challenge?.points} pts</Badge>
                          </div>
                          <p className="text-sm text-gray-400">{category?.name} - Level {challenge?.difficulty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <Trophy size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No challenges completed yet. Start solving!</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;