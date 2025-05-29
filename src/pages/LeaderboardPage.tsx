import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Users, Medal, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { LeaderboardEntry } from '../types';
import { useAuthStore } from '../store/authStore';

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock leaderboard data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockLeaderboard: LeaderboardEntry[] = [
        {
          userId: '5',
          username: 'cyberwizard',
          score: 1850,
          rank: 1,
          completedChallenges: 18,
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
        {
          userId: '2',
          username: 'matrixhacker',
          score: 1720,
          rank: 2,
          completedChallenges: 15,
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
          userId: '3',
          username: 'ghostprotocol',
          score: 1650,
          rank: 3,
          completedChallenges: 14,
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
        {
          userId: '1',
          username: 'hackerman',
          score: 1500,
          rank: 4,
          completedChallenges: 12,
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          userId: '4',
          username: 'cyberwarrior',
          score: 1350,
          rank: 5,
          completedChallenges: 10,
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
        {
          userId: '6',
          username: 'datapirate',
          score: 1200,
          rank: 6,
          completedChallenges: 8,
          avatar: 'https://i.pravatar.cc/150?img=6',
        },
        {
          userId: '7',
          username: 'zerohour',
          score: 980,
          rank: 7,
          completedChallenges: 7,
          avatar: 'https://i.pravatar.cc/150?img=7',
        },
        {
          userId: '8',
          username: 'bytewise',
          score: 850,
          rank: 8,
          completedChallenges: 6,
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
        {
          userId: '9',
          username: 'coderunner',
          score: 720,
          rank: 9,
          completedChallenges: 5,
          avatar: 'https://i.pravatar.cc/150?img=9',
        },
        {
          userId: '10',
          username: 'bitstreamer',
          score: 650,
          rank: 10,
          completedChallenges: 4,
          avatar: 'https://i.pravatar.cc/150?img=10',
        },
      ];
      
      setLeaderboard(mockLeaderboard);
    }, 1000);
  }, []);
  
  const filteredLeaderboard = leaderboard.filter(entry => 
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div className="mb-6" variants={itemVariants}>
          <button 
            onClick={() => navigate('/map')}
            className="flex items-center text-cyber-blue-100 hover:text-cyber-blue-200 transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Map</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-3xl font-cyber font-bold mb-2 md:mb-0 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
              Global Leaderboard
            </h1>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-cyber-gray border-2 border-cyber-blue-200 rounded-lg py-2 pl-10 pr-4 text-white w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-cyber-blue-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </motion.div>
        
        {/* Top 3 Players */}
        <motion.div 
          className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={itemVariants}
        >
          {leaderboard.slice(0, 3).map((entry, index) => {
            const medals = [
              'bg-gradient-to-r from-yellow-400 to-yellow-600',
              'bg-gradient-to-r from-gray-300 to-gray-500',
              'bg-gradient-to-r from-amber-700 to-amber-900',
            ];
            
            const isCurrentUser = user && entry.userId === user.id;
            
            return (
              <Card
                key={entry.userId}
                variant={isCurrentUser ? 'secondary' : 'primary'}
                glowing={isCurrentUser}
                className={`p-4 text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
              >
                <div className="relative inline-block mb-2">
                  <div className={`w-16 h-16 rounded-full overflow-hidden border-4 ${medals[index]}`}>
                    {entry.avatar ? (
                      <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-cyber-gray flex items-center justify-center">
                        <Users size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${medals[index]} text-white font-bold`}>
                    {entry.rank}
                  </div>
                </div>
                
                <h3 className="font-cyber text-lg truncate">{entry.username}</h3>
                <p className="text-sm text-gray-300 mb-2">Score: {entry.score}</p>
                
                <div className="flex justify-center">
                  <Badge variant="primary" size="sm">
                    <Trophy size={12} className="mr-1" /> 
                    {entry.completedChallenges} Challenges
                  </Badge>
                </div>
                
                {isCurrentUser && (
                  <div className="mt-2 text-xs text-cyber-blue-100">That's you!</div>
                )}
              </Card>
            );
          })}
        </motion.div>
        
        {/* Leaderboard Table */}
        <motion.div
          className="bg-cyber-black rounded-xl overflow-hidden"
          variants={itemVariants}
        >
          <table className="w-full">
            <thead className="bg-cyber-gray">
              <tr>
                <th className="py-4 px-2 md:px-6 text-left font-cyber">Rank</th>
                <th className="py-4 px-2 md:px-6 text-left font-cyber">Player</th>
                <th className="py-4 px-2 md:px-6 text-left font-cyber">Score</th>
                <th className="py-4 px-2 md:px-6 text-left font-cyber hidden md:table-cell">Challenges</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((entry) => {
                const isCurrentUser = user && entry.userId === user.id;
                
                return (
                  <tr 
                    key={entry.userId} 
                    className={`border-b border-cyber-gray hover:bg-cyber-gray hover:bg-opacity-20 transition-colors ${
                      isCurrentUser ? 'bg-cyber-blue-300 bg-opacity-10' : ''
                    }`}
                  >
                    <td className="py-4 px-2 md:px-6">
                      <div className="flex items-center">
                        {entry.rank <= 3 ? (
                          <Medal 
                            size={18} 
                            className={
                              entry.rank === 1 
                                ? 'text-yellow-400' 
                                : entry.rank === 2 
                                  ? 'text-gray-300' 
                                  : 'text-amber-700'
                            } 
                          />
                        ) : (
                          <span className="font-mono">{entry.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          {entry.avatar ? (
                            <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-cyber-gray flex items-center justify-center">
                              <Users size={16} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{entry.username}</div>
                          {isCurrentUser && (
                            <div className="text-xs text-cyber-blue-100">You</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-6 font-mono">{entry.score}</td>
                    <td className="py-4 px-2 md:px-6 hidden md:table-cell">{entry.completedChallenges}</td>
                  </tr>
                );
              })}
              
              {filteredLeaderboard.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    No players match your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeaderboardPage;