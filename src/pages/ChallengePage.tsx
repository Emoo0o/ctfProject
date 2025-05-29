import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, ChevronUp, ChevronDown, Award, Send, Clock, Flag, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import Terminal from '../components/ui/Terminal';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useGameStore } from '../store/gameStore';
import { Challenge, Hint } from '../types';

const ChallengePage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { 
    categories, 
    currentChallenge, 
    gameProgress, 
    setCurrentChallenge,
    submitFlag,
    useHint
  } = useGameStore();
  
  const [flagInput, setFlagInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isHintsExpanded, setIsHintsExpanded] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  // Find the challenge
  useEffect(() => {
    if (challengeId) {
      setCurrentChallenge(challengeId);
    }
    
    // Start the timer
    setIsTimerRunning(true);
    
    return () => {
      setIsTimerRunning(false);
    };
  }, [challengeId, setCurrentChallenge]);
  
  // Handle timer
  useEffect(() => {
    let intervalId: number;
    
    if (isTimerRunning) {
      intervalId = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);
  
  // Format timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-cyber-dark pt-20 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <Info size={48} className="mx-auto mb-4 text-cyber-blue-100" />
          <h2 className="text-xl font-cyber mb-2">Challenge Not Found</h2>
          <p className="text-gray-400 mb-6">The challenge you're looking for doesn't exist or is locked.</p>
          <Button variant="primary" onClick={() => navigate('/map')}>
            Return to Game Map
          </Button>
        </Card>
      </div>
    );
  }
  
  // Find category for this challenge
  const category = categories.find(cat => 
    cat.challenges.some(ch => ch.id === currentChallenge.id)
  );
  
  const handleFlagSubmit = () => {
    if (!flagInput.trim()) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please enter a flag');
      return;
    }
    
    const isCorrect = submitFlag(currentChallenge.id, flagInput);
    
    if (isCorrect) {
      setSubmissionStatus('success');
      setSubmissionMessage('Congratulations! Flag is correct.');
      setIsTimerRunning(false); // Stop the timer on success
    } else {
      setSubmissionStatus('error');
      setSubmissionMessage('Incorrect flag. Try again.');
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmissionStatus('idle');
      setSubmissionMessage('');
      
      if (isCorrect) {
        navigate('/map');
      }
    }, 3000);
  };
  
  const handleUseHint = (hint: Hint) => {
    if (!hint.isRevealed) {
      useHint(hint.id);
    }
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
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Badge 
                  variant={submissionStatus === 'success' ? 'success' : 'primary'} 
                  glowing={submissionStatus === 'success'}
                  size="md"
                  className="mr-3"
                >
                  Level {currentChallenge.difficulty}
                </Badge>
                
                {category && (
                  <Badge 
                    variant="secondary" 
                    size="md"
                  >
                    {category.name}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-cyber font-bold mb-2 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
                {currentChallenge.title}
              </h1>
              
              <p className="text-gray-300 max-w-3xl">
                {currentChallenge.description}
              </p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex items-center bg-cyber-black p-2 rounded-lg mr-4">
                <Clock size={18} className="text-cyber-yellow mr-2" />
                <span className="font-mono">{formatTime(timer)}</span>
              </div>
              
              <div className="flex items-center bg-cyber-black p-2 rounded-lg">
                <Award size={18} className="text-cyber-blue-100 mr-2" />
                <span>{currentChallenge.points} pts</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge terminal/interface */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="p-4 h-full" variant="dark">
              <Terminal
                initialText="Welcome to the CyberQuest terminal. This challenge requires you to find the flag."
                autoFocus
                className="h-[400px]"
                commands={{
                  help: () => 'Available commands: help, info, hint',
                  info: () => `Challenge: ${currentChallenge.title}\nDifficulty: ${currentChallenge.difficulty}\nPoints: ${currentChallenge.points}`,
                  hint: () => 'Use the hint system on the right panel to get help. Each hint will cost you points.',
                  flag: () => 'Submit your flag in the submission field below.',
                }}
              />
              
              <div className="mt-4">
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={flagInput}
                      onChange={(e) => setFlagInput(e.target.value)}
                      placeholder="Enter flag (e.g., FLAG{...})"
                      className="w-full bg-cyber-gray border-2 border-cyber-blue-200 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue-100 font-mono"
                    />
                    <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue-200" size={18} />
                  </div>
                  
                  <Button
                    variant={submissionStatus === 'success' ? 'success' : 'primary'}
                    glowing={submissionStatus === 'success'}
                    onClick={handleFlagSubmit}
                    className="flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    <span>Submit Flag</span>
                  </Button>
                </div>
                
                {submissionStatus !== 'idle' && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${
                    submissionStatus === 'success' 
                      ? 'bg-cyber-green-200 bg-opacity-20 text-cyber-green-100' 
                      : 'bg-cyber-red bg-opacity-20 text-cyber-red'
                  }`}>
                    {submissionMessage}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
          
          {/* Hints and info panel */}
          <motion.div variants={itemVariants}>
            <Card className="p-4" variant="dark">
              <div className="mb-4">
                <button
                  onClick={() => setIsHintsExpanded(!isHintsExpanded)}
                  className="w-full flex items-center justify-between bg-cyber-gray p-3 rounded-lg font-cyber"
                >
                  <div className="flex items-center">
                    <Lightbulb size={18} className="text-cyber-yellow mr-2" />
                    <span>Hints</span>
                  </div>
                  {isHintsExpanded ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                
                {isHintsExpanded && (
                  <div className="mt-2 space-y-3">
                    {currentChallenge.hints.map((hint, index) => (
                      <div 
                        key={hint.id}
                        className="border border-cyber-gray rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-cyber">Hint {index + 1}</span>
                          <Badge variant="warning" size="sm">-{hint.cost} pts</Badge>
                        </div>
                        
                        {hint.isRevealed ? (
                          <p className="text-sm">{hint.text}</p>
                        ) : (
                          <div className="text-center py-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUseHint(hint)}
                            >
                              <Lightbulb size={14} className="mr-1 text-cyber-yellow" />
                              <span>Reveal Hint</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-cyber-black bg-opacity-50 rounded-lg p-4">
                <h3 className="font-cyber text-lg mb-3">Challenge Info</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="font-semibold">Level {currentChallenge.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Points:</span>
                    <span className="font-semibold">{currentChallenge.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="font-semibold">{category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-semibold ${currentChallenge.isCompleted ? 'text-cyber-green-200' : 'text-cyber-blue-100'}`}>
                      {currentChallenge.isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/map')}
                  >
                    <ArrowLeft size={14} className="mr-1" />
                    <span>Exit Challenge</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengePage;