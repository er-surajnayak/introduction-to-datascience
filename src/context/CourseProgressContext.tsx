'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { ModuleItem, ModuleStatus } from '@/types/course';
import { courseConfig } from '@/data/courseData';
import {
  StoredProgress,
  defaultProgressState,
  loadProgressFromStorage,
  saveProgressToStorage,
  isModuleUnlocked,
  computeModuleStatus,
  calculateOverallProgress,
} from '@/lib/progress';

interface CourseProgressContextType {
  modules: ModuleItem[];
  completedModules: string[];
  completedTopics: string[];
  moduleProgress: Record<string, number>;
  overallProgress: number;
  completedCount: number;
  totalCount: number;
  activeModule: ModuleItem | null;
  isUnlocked: (moduleId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  getModuleById: (moduleId: string) => ModuleItem | undefined;
  setModuleProgressValue: (moduleId: string, progress: number) => void;
  completeModule: (moduleId: string) => void;
  completeTopic: (moduleId: string, topicId: string) => void;
  toggleTopicCompletion: (moduleId: string, topicId: string) => void;
  resetProgress: () => void;
  isHydrated: boolean;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export function CourseProgressProvider({ children }: { children: React.ReactNode }) {
  const [progressState, setProgressState] = useState<StoredProgress>(defaultProgressState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initial = loadProgressFromStorage();
    setProgressState(initial);
    setIsHydrated(true);
  }, []);

  const persist = useCallback((nextState: StoredProgress) => {
    setProgressState(nextState);
    saveProgressToStorage(nextState);
  }, []);

  const isUnlocked = useCallback(
    (moduleId: string): boolean => {
      const targetModule = courseConfig.modules.find((m) => m.id === moduleId);
      if (!targetModule) return false;
      return isModuleUnlocked(targetModule, progressState.completedModules);
    },
    [progressState.completedModules]
  );

  const isTopicCompleted = useCallback(
    (topicId: string): boolean => {
      return progressState.completedTopics.includes(topicId);
    },
    [progressState.completedTopics]
  );

  const modules: ModuleItem[] = useMemo(() => {
    return courseConfig.modules.map((m) => {
      // Calculate dynamic progress from completed topics if topics exist
      const moduleTopicIds = m.topics.map((t) => t.id);
      const completedCount = moduleTopicIds.filter((id) =>
        progressState.completedTopics.includes(id)
      ).length;

      let currentProg = progressState.moduleProgress[m.id] ?? 0;
      if (moduleTopicIds.length > 0) {
        const topicCalculated = Math.round((completedCount / moduleTopicIds.length) * 100);
        currentProg = Math.max(currentProg, topicCalculated);
      }

      const status: ModuleStatus = computeModuleStatus(
        m,
        progressState.completedModules,
        currentProg
      );

      return {
        ...m,
        progress: currentProg,
        status,
        topics: m.topics.map((t) => ({
          ...t,
          isCompleted: progressState.completedTopics.includes(t.id),
        })),
      };
    });
  }, [progressState]);

  const activeModule = useMemo(() => {
    return modules.find((m) => m.status === 'in-progress' || m.status === 'available') || modules[0];
  }, [modules]);

  const completedCount = useMemo(() => {
    return progressState.completedModules.length;
  }, [progressState.completedModules]);

  const totalCount = courseConfig.modules.length;

  const overallProgress = useMemo(() => {
    return calculateOverallProgress(progressState.moduleProgress, totalCount);
  }, [progressState.moduleProgress, totalCount]);

  const getModuleById = useCallback(
    (moduleId: string) => {
      return modules.find((m) => m.id === moduleId || m.slug === moduleId);
    },
    [modules]
  );

  const setModuleProgressValue = useCallback(
    (moduleId: string, progress: number) => {
      const clamped = Math.min(100, Math.max(0, progress));
      const nextProgress = {
        ...progressState.moduleProgress,
        [moduleId]: clamped,
      };
      const nextCompleted =
        clamped === 100
          ? Array.from(new Set([...progressState.completedModules, moduleId]))
          : progressState.completedModules.filter((id) => id !== moduleId);

      persist({
        ...progressState,
        moduleProgress: nextProgress,
        completedModules: nextCompleted,
      });
    },
    [progressState, persist]
  );

  const completeModule = useCallback(
    (moduleId: string) => {
      const targetMod = courseConfig.modules.find((m) => m.id === moduleId);
      const modTopicIds = targetMod?.topics.map((t) => t.id) || [];
      const nextTopics = Array.from(new Set([...progressState.completedTopics, ...modTopicIds]));
      const nextCompleted = Array.from(new Set([...progressState.completedModules, moduleId]));
      const nextProgress = {
        ...progressState.moduleProgress,
        [moduleId]: 100,
      };
      persist({
        ...progressState,
        completedTopics: nextTopics,
        completedModules: nextCompleted,
        moduleProgress: nextProgress,
      });
    },
    [progressState, persist]
  );

  const completeTopic = useCallback(
    (moduleId: string, topicId: string) => {
      const targetMod = courseConfig.modules.find((m) => m.id === moduleId);
      if (!targetMod) return;

      const nextTopics = Array.from(new Set([...progressState.completedTopics, topicId]));
      const modTopicIds = targetMod.topics.map((t) => t.id);
      const doneCount = modTopicIds.filter((id) => nextTopics.includes(id)).length;
      const pct = Math.round((doneCount / modTopicIds.length) * 100);

      const nextProgress = {
        ...progressState.moduleProgress,
        [moduleId]: pct,
      };
      const nextCompleted =
        pct === 100
          ? Array.from(new Set([...progressState.completedModules, moduleId]))
          : progressState.completedModules.filter((id) => id !== moduleId);

      persist({
        ...progressState,
        completedTopics: nextTopics,
        completedModules: nextCompleted,
        moduleProgress: nextProgress,
      });
    },
    [progressState, persist]
  );

  const toggleTopicCompletion = useCallback(
    (moduleId: string, topicId: string) => {
      const isAlreadyDone = progressState.completedTopics.includes(topicId);
      const targetMod = courseConfig.modules.find((m) => m.id === moduleId);
      if (!targetMod) return;

      const nextTopics = isAlreadyDone
        ? progressState.completedTopics.filter((id) => id !== topicId)
        : [...progressState.completedTopics, topicId];

      const modTopicIds = targetMod.topics.map((t) => t.id);
      const doneCount = modTopicIds.filter((id) => nextTopics.includes(id)).length;
      const pct = Math.round((doneCount / modTopicIds.length) * 100);

      const nextProgress = {
        ...progressState.moduleProgress,
        [moduleId]: pct,
      };
      const nextCompleted =
        pct === 100
          ? Array.from(new Set([...progressState.completedModules, moduleId]))
          : progressState.completedModules.filter((id) => id !== moduleId);

      persist({
        ...progressState,
        completedTopics: nextTopics,
        completedModules: nextCompleted,
        moduleProgress: nextProgress,
      });
    },
    [progressState, persist]
  );

  const resetProgress = useCallback(() => {
    persist(defaultProgressState);
  }, [persist]);

  return (
    <CourseProgressContext.Provider
      value={{
        modules,
        completedModules: progressState.completedModules,
        completedTopics: progressState.completedTopics,
        moduleProgress: progressState.moduleProgress,
        overallProgress,
        completedCount,
        totalCount,
        activeModule,
        isUnlocked,
        isTopicCompleted,
        getModuleById,
        setModuleProgressValue,
        completeModule,
        completeTopic,
        toggleTopicCompletion,
        resetProgress,
        isHydrated,
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
}
