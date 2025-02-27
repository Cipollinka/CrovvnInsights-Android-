export interface Task {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  priority: string;
  date: string;
  goal: string;
  subGoals: Subgoal[];
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum ECategory {
  HEALTH = 'Health',
  FINANCE = 'Finance',
  CAREER = 'Career',
  RELATIONSHIP = 'Relationship',
  PERSONAL_DEVELOPMENT = 'Personal',
  HOBBIES_AND_INTERESTS = 'Hobbies',
  EDUCATION = 'Education',
  SPIRITUAL_DEVELOPMENT = 'Spiritual',
  HOME_AND_LIFESTYLE = 'Lifestyle',
}

export interface Subgoal {
  id: string;
  title: string;
  description: string;
  priority: string;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  date: string;
  category: ECategory;
  priority: Priority;
  subGoals: Subgoal[];
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Note {
  id: string;
  imageUrl: string | null;
  videoUrl: string | null;
  subNote: SubNote[];
  completedSubTasks: string[];
  title: string;
  description: string;
  // date: string;
}

export interface SubNote {
  id: string;
  title: string;
}

export type MediaItem = {
  id: string;
  uri: string;
  type: 'photo' | 'video';
};

export interface User {
  name: string;
  surname: string;
  email: string;
  imageUrl: string;
}
