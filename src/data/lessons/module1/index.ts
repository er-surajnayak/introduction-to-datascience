import { LessonContent } from '@/types/lesson';
import { topic1_1 } from './topic1_1';
import { topic1_2 } from './topic1_2';
import { topic1_3 } from './topic1_3';
import { topic1_4 } from './topic1_4';
import { topic1_5 } from './topic1_5';
import { topic1_6 } from './topic1_6';
import { topic1_7 } from './topic1_7';

export const module1Lessons: Record<string, LessonContent> = {
  'data-science-introduction': topic1_1,
  'roles-and-tools-in-data-science': topic1_2,
  'python-refresher-variables': topic1_3,
  'control-structures': topic1_4,
  'functions-and-modularity': topic1_5,
  'introduction-to-jupyter-notebook': topic1_6,
  'numpy-basics-and-vectorization': topic1_7,
  // Also support ID mapping
  'm1-t1': topic1_1,
  'm1-t2': topic1_2,
  'm1-t3': topic1_3,
  'm1-t4': topic1_4,
  'm1-t5': topic1_5,
  'm1-t6': topic1_6,
  'm1-t7': topic1_7,
};

export const module1LessonList: LessonContent[] = [
  topic1_1,
  topic1_2,
  topic1_3,
  topic1_4,
  topic1_5,
  topic1_6,
  topic1_7,
];

export function getModule1Lesson(slugOrId: string): LessonContent | undefined {
  return module1Lessons[slugOrId];
}
