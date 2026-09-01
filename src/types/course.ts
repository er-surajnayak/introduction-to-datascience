export type ModuleStatus = 'available' | 'locked' | 'in-progress' | 'completed';

export interface TopicItem {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  estimatedMinutes?: number;
  isCompleted?: boolean;
}

export interface ModuleItem {
  id: string;
  moduleNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topics: TopicItem[];
  status: ModuleStatus;
  progress: number; // 0 - 100
  unlockCondition: string | null; // e.g. "module-1-complete" or null for first module
  estimatedHours: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  prerequisites?: string[];
  keyOutcome: string;
}

export interface CourseConfig {
  id: string;
  title: string;
  code: string;
  targetAudience: string;
  description: string;
  totalModules: number;
  modules: ModuleItem[];
  tools: string[];
}

export interface CourseProgressState {
  completedModules: string[];
  moduleProgress: Record<string, number>;
  activeModuleId: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'available' | 'coming-soon';
  iconType: 'document' | 'quiz' | 'chat' | 'task';
  badge: string;
}

export interface LearningPipelineStep {
  step: number;
  phase: string;
  label: string;
  description: string;
  tools: string[];
  moduleId: string;
}
