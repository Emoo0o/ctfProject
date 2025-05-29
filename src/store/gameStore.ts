import { create } from 'zustand';
import { Category, Challenge, GameProgress } from '../types';

// Data
import { categories } from '../data/categories';

interface GameState {
  categories: Category[];
  currentCategory: Category | null;
  currentChallenge: Challenge | null;
  gameProgress: GameProgress;
  
  // Actions
  setCurrentCategory: (categoryId: string | null) => void;
  setCurrentChallenge: (challengeId: string | null) => void;
  completeChallenge: (challengeId: string) => void;
  useHint: (hintId: string) => void;
  unlockCategory: (categoryId: string) => void;
  unlockChallenge: (challengeId: string) => void;
  submitFlag: (challengeId: string, flag: string) => boolean;
}

const initialGameProgress: GameProgress = {
  completedChallenges: [],
  unlockedCategories: ['crypto'], // Start with first category unlocked
  unlockedChallenges: ['crypto-1'], // Start with first challenge unlocked
  usedHints: [],
  score: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  categories: categories,
  currentCategory: null,
  currentChallenge: null,
  gameProgress: initialGameProgress,
  
  setCurrentCategory: (categoryId: string | null) => {
    if (!categoryId) {
      set({ currentCategory: null });
      return;
    }
    
    const category = get().categories.find(c => c.id === categoryId) || null;
    set({ currentCategory: category });
  },
  
  setCurrentChallenge: (challengeId: string | null) => {
    if (!challengeId) {
      set({ currentChallenge: null });
      return;
    }
    
    let foundChallenge: Challenge | null = null;
    
    for (const category of get().categories) {
      const challenge = category.challenges.find(c => c.id === challengeId);
      if (challenge) {
        foundChallenge = challenge;
        break;
      }
    }
    
    set({ currentChallenge: foundChallenge });
  },
  
  completeChallenge: (challengeId: string) => {
    const { gameProgress, categories } = get();
    
    if (gameProgress.completedChallenges.includes(challengeId)) {
      return; // Already completed
    }
    
    // Find the challenge to add points
    let challengePoints = 0;
    let nextChallengeId: string | null = null;
    let categoryId: string | null = null;
    
    for (const category of categories) {
      for (let i = 0; i < category.challenges.length; i++) {
        const challenge = category.challenges[i];
        if (challenge.id === challengeId) {
          challengePoints = challenge.points;
          categoryId = category.id;
          
          // Find next challenge in this category to unlock
          if (i < category.challenges.length - 1) {
            nextChallengeId = category.challenges[i + 1].id;
          } else if (i === category.challenges.length - 1) {
            // If this is the last challenge in the category, find the next category
            const categoryIndex = categories.findIndex(c => c.id === category.id);
            if (categoryIndex < categories.length - 1) {
              const nextCategory = categories[categoryIndex + 1];
              // Unlock the next category
              if (nextCategory && !gameProgress.unlockedCategories.includes(nextCategory.id)) {
                get().unlockCategory(nextCategory.id);
              }
            }
          }
          break;
        }
      }
      if (challengePoints > 0) break;
    }
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      completedChallenges: [...gameProgress.completedChallenges, challengeId],
      score: gameProgress.score + challengePoints,
    };
    
    // Update categories to mark challenge as completed
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          challenges: category.challenges.map(challenge => {
            if (challenge.id === challengeId) {
              return { ...challenge, isCompleted: true };
            }
            return challenge;
          }),
        };
      }
      return category;
    });
    
    set({ 
      gameProgress: updatedProgress,
      categories: updatedCategories
    });
    
    // Unlock next challenge if available
    if (nextChallengeId) {
      get().unlockChallenge(nextChallengeId);
    }
  },
  
  useHint: (hintId: string) => {
    const { gameProgress, currentChallenge, categories } = get();
    
    if (!currentChallenge || gameProgress.usedHints.includes(hintId)) {
      return; // No current challenge or hint already used
    }
    
    // Find the hint
    let hintCost = 0;
    let categoryId: string | null = null;
    
    for (const hint of currentChallenge.hints) {
      if (hint.id === hintId) {
        hintCost = hint.cost;
        break;
      }
    }
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      usedHints: [...gameProgress.usedHints, hintId],
      points: Math.max(0, gameProgress.score - hintCost), // Deduct points but not below 0
    };
    
    // Update categories to mark hint as revealed
    const updatedCategories = categories.map(category => {
      return {
        ...category,
        challenges: category.challenges.map(challenge => {
          if (challenge.id === currentChallenge.id) {
            return {
              ...challenge,
              hints: challenge.hints.map(hint => {
                if (hint.id === hintId) {
                  return { ...hint, isRevealed: true };
                }
                return hint;
              }),
            };
          }
          return challenge;
        }),
      };
    });
    
    set({
      gameProgress: updatedProgress,
      categories: updatedCategories
    });
  },
  
  unlockCategory: (categoryId: string) => {
    const { gameProgress, categories } = get();
    
    if (gameProgress.unlockedCategories.includes(categoryId)) {
      return; // Already unlocked
    }
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      unlockedCategories: [...gameProgress.unlockedCategories, categoryId],
    };
    
    // Update category to mark as unlocked
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, isLocked: false };
      }
      return category;
    });
    
    // Unlock the first challenge in this category
    const category = categories.find(c => c.id === categoryId);
    if (category && category.challenges.length > 0) {
      const firstChallengeId = category.challenges[0].id;
      updatedProgress.unlockedChallenges = [...updatedProgress.unlockedChallenges, firstChallengeId];
    }
    
    set({ 
      gameProgress: updatedProgress,
      categories: updatedCategories
    });
  },
  
  unlockChallenge: (challengeId: string) => {
    const { gameProgress, categories } = get();
    
    if (gameProgress.unlockedChallenges.includes(challengeId)) {
      return; // Already unlocked
    }
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      unlockedChallenges: [...gameProgress.unlockedChallenges, challengeId],
    };
    
    // Update categories to mark challenge as unlocked
    const updatedCategories = categories.map(category => {
      return {
        ...category,
        challenges: category.challenges.map(challenge => {
          if (challenge.id === challengeId) {
            return { ...challenge, isLocked: false };
          }
          return challenge;
        }),
      };
    });
    
    set({ 
      gameProgress: updatedProgress,
      categories: updatedCategories
    });
  },
  
  submitFlag: (challengeId: string, flag: string) => {
    const { categories } = get();
    
    // Find the challenge
    let correctFlag = '';
    
    for (const category of categories) {
      const challenge = category.challenges.find(c => c.id === challengeId);
      if (challenge) {
        correctFlag = challenge.flag;
        break;
      }
    }
    
    const isCorrect = flag.trim() === correctFlag;
    
    if (isCorrect) {
      get().completeChallenge(challengeId);
    }
    
    return isCorrect;
  },
}));