export interface Level {
  id: string;
  title: string;
  points: number;
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  status: 'locked' | 'available' | 'completed';
  icon: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  codename: string;
  description: string;
  icon: string;
  levels: Level[];
  background: string;
  isUnlocked: boolean;
}

export interface PlayerSettings {
  username: string;
  fullName: string;
  biography: string;
  avatarUrl: string;
}

export interface SkillMapState {
  categories: Category[];
  selectedCategory: string | null;
  playerSettings: PlayerSettings;
  updatePlayerSettings: (settings: Partial<PlayerSettings>) => void;
  completeLevel: (categoryId: string, levelId: string) => void;
}