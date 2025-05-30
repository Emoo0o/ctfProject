import { create } from 'zustand';
import { SkillMapState, Category, PlayerSettings } from '../types/skillmap';

const initialCategories: Category[] = [
  {
    id: 'web',
    name: 'Web Exploitation',
    codename: 'Skyline Heist',
    description: 'Master web vulnerabilities and exploitation techniques',
    icon: 'Globe',
    background: 'from-blue-900/30 to-purple-900/30',
    isUnlocked: true,
    levels: [
      {
        id: 'web-bronze',
        title: 'Comment Door',
        points: 100,
        difficulty: 'bronze',
        status: 'available',
        icon: 'Code',
        description: 'Find the hidden door in the comments',
      },
      {
        id: 'web-silver',
        title: 'Cookie Upgrade',
        points: 200,
        difficulty: 'silver',
        status: 'locked',
        icon: 'Cookie',
        description: 'Manipulate cookies to gain access',
      },
      {
        id: 'web-gold',
        title: 'Cargo Shortcut',
        points: 300,
        difficulty: 'gold',
        status: 'locked',
        icon: 'Package',
        description: 'Find the shortcut in the cargo system',
      },
      {
        id: 'web-platinum',
        title: 'Two Seats, One Choice',
        points: 400,
        difficulty: 'platinum',
        status: 'locked',
        icon: 'Split',
        description: 'Make the right choice between two paths',
      },
      {
        id: 'web-diamond',
        title: 'Frozen Nonce',
        points: 500,
        difficulty: 'diamond',
        status: 'locked',
        icon: 'Snowflake',
        description: 'Break through the frozen nonce protection',
      },
    ],
  },
  {
    id: 'crypto',
    name: 'Cryptography',
    codename: 'The Hollow Mark',
    description: 'Decrypt messages and break encryption schemes',
    icon: 'Shield',
    background: 'from-green-900/30 to-cyan-900/30',
    isUnlocked: true,
    levels: [
      {
        id: 'crypto-bronze',
        title: 'Whisper One',
        points: 100,
        difficulty: 'bronze',
        status: 'available',
        icon: 'MessageSquare',
        description: 'Decode the whispered message',
      },
      {
        id: 'crypto-silver',
        title: 'Layered Cry',
        points: 200,
        difficulty: 'silver',
        status: 'locked',
        icon: 'Layers',
        description: 'Peel back the layers of encryption',
      },
      {
        id: 'crypto-gold',
        title: 'Mirror Block',
        points: 300,
        difficulty: 'gold',
        status: 'locked',
        icon: 'Copy',
        description: 'Break the mirrored block cipher',
      },
      {
        id: 'crypto-platinum',
        title: 'Echo Pad',
        points: 400,
        difficulty: 'platinum',
        status: 'locked',
        icon: 'Repeat',
        description: 'Find the echo in the one-time pad',
      },
      {
        id: 'crypto-diamond',
        title: 'Unsigned Ticket',
        points: 500,
        difficulty: 'diamond',
        status: 'locked',
        icon: 'Ticket',
        description: 'Forge the unsigned digital ticket',
      },
    ],
  },
  {
    id: 'forensics',
    name: 'Digital Forensics',
    codename: 'Night Signal',
    description: 'Investigate digital evidence and recover data',
    icon: 'FileSearch',
    background: 'from-purple-900/30 to-pink-900/30',
    isUnlocked: true,
    levels: [
      {
        id: 'forensics-bronze',
        title: 'Forgotten Selfie',
        points: 100,
        difficulty: 'bronze',
        status: 'available',
        icon: 'Camera',
        description: 'Recover the deleted selfie',
      },
      {
        id: 'forensics-silver',
        title: 'False Track',
        points: 200,
        difficulty: 'silver',
        status: 'locked',
        icon: 'FileSearch',
        description: 'Follow the misleading digital tracks',
      },
      {
        id: 'forensics-gold',
        title: 'Three-Second Burst',
        points: 300,
        difficulty: 'gold',
        status: 'locked',
        icon: 'Timer',
        description: 'Analyze the three-second data burst',
      },
      {
        id: 'forensics-platinum',
        title: 'Needle in the Log',
        points: 400,
        difficulty: 'platinum',
        status: 'locked',
        icon: 'Search',
        description: 'Find the crucial evidence in system logs',
      },
      {
        id: 'forensics-diamond',
        title: 'Memory at 02:16',
        points: 500,
        difficulty: 'diamond',
        status: 'locked',
        icon: 'Clock',
        description: 'Extract the memory dump from 02:16',
      },
    ],
  },
  {
    id: 'reverse',
    name: 'Reverse Engineering',
    codename: 'Neurolock',
    description: 'Analyze and modify compiled programs',
    icon: 'Code',
    background: 'from-red-900/30 to-orange-900/30',
    isUnlocked: true,
    levels: [
      {
        id: 'reverse-bronze',
        title: 'Plain Token',
        points: 100,
        difficulty: 'bronze',
        status: 'available',
        icon: 'Key',
        description: 'Find the hardcoded token',
      },
      {
        id: 'reverse-silver',
        title: 'Weak Zip',
        points: 200,
        difficulty: 'silver',
        status: 'locked',
        icon: 'File',
        description: 'Break the weak compression algorithm',
      },
      {
        id: 'reverse-gold',
        title: 'Hidden Shell',
        points: 300,
        difficulty: 'gold',
        status: 'locked',
        icon: 'Terminal',
        description: 'Uncover the hidden shell code',
      },
      {
        id: 'reverse-platinum',
        title: 'Number Song',
        points: 400,
        difficulty: 'platinum',
        status: 'locked',
        icon: 'Music',
        description: 'Decode the numerical sequence',
      },
      {
        id: 'reverse-diamond',
        title: 'Pixel Cure',
        points: 500,
        difficulty: 'diamond',
        status: 'locked',
        icon: 'Image',
        description: 'Fix the corrupted pixel data',
      },
    ],
  },
];

const initialPlayerSettings: PlayerSettings = {
  username: '',
  fullName: '',
  biography: '',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
};

export const useSkillMapStore = create<SkillMapState>((set) => ({
  categories: initialCategories,
  selectedCategory: null,
  playerSettings: initialPlayerSettings,

  updatePlayerSettings: (settings) => {
    set((state) => ({
      playerSettings: { ...state.playerSettings, ...settings },
    }));
  },

  completeLevel: (categoryId, levelId) => {
    set((state) => ({
      categories: state.categories.map((category) => {
        if (category.id === categoryId) {
          const levelIndex = category.levels.findIndex((l) => l.id === levelId);
          return {
            ...category,
            levels: category.levels.map((level, index) => {
              if (level.id === levelId) {
                return { ...level, status: 'completed' as const };
              }
              if (index === levelIndex + 1) {
                return { ...level, status: 'available' as const };
              }
              return level;
            }),
          };
        }
        return category;
      }),
    }));
  },
}));