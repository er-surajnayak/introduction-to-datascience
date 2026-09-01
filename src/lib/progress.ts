import { ModuleItem, ModuleStatus } from '@/types/course';
import { courseConfig } from '@/data/courseData';

const STORAGE_KEY = 'di_notes_ds_progress_v1';

export interface StoredProgress {
  completedModules: string[];
  completedTopics: string[];
  moduleProgress: Record<string, number>;
  activeModuleId: string;
}

export const defaultProgressState: StoredProgress = {
  completedModules: [],
  completedTopics: [],
  moduleProgress: {
    'module-1': 0,
    'module-2': 0,
    'module-3': 0,
    'module-4': 0,
    'module-5': 0,
  },
  activeModuleId: 'module-1',
};

export function isModuleUnlocked(
  module: ModuleItem,
  completedModules: string[]
): boolean {
  if (!module.unlockCondition) {
    return true; // First module or no condition
  }
  return completedModules.includes(module.unlockCondition);
}

export function computeModuleStatus(
  module: ModuleItem,
  completedModules: string[],
  progress: number
): ModuleStatus {
  if (completedModules.includes(module.id)) {
    return 'completed';
  }
  const unlocked = isModuleUnlocked(module, completedModules);
  if (!unlocked) {
    return 'locked';
  }
  if (progress > 0) {
    return 'in-progress';
  }
  return 'available';
}

export function calculateOverallProgress(
  moduleProgress: Record<string, number>,
  totalModules: number = courseConfig.modules.length
): number {
  if (totalModules === 0) return 0;
  const total = Object.values(moduleProgress).reduce((sum, val) => sum + (val || 0), 0);
  return Math.round(total / totalModules);
}

export function loadProgressFromStorage(): StoredProgress {
  if (typeof window === 'undefined') return defaultProgressState;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return defaultProgressState;
    const parsed = JSON.parse(item);
    return {
      ...defaultProgressState,
      ...parsed,
      moduleProgress: {
        ...defaultProgressState.moduleProgress,
        ...(parsed.moduleProgress || {}),
      },
    };
  } catch (e) {
    console.warn('Failed to parse progress from localStorage, using defaults.', e);
    return defaultProgressState;
  }
}

export function saveProgressToStorage(state: StoredProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist progress to localStorage.', e);
  }
}
