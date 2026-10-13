import { LessonContent } from '@/types/lesson';
import { topic3_1 } from './topic3_1';
import { topic3_2 } from './topic3_2';
import { topic3_3 } from './topic3_3';

export const module3Lessons: Record<string, LessonContent> = {
  'descriptive-statistics': topic3_1,
  'm3-t1': topic3_1,
  'topic-1': topic3_1,
  'distributions': topic3_2,
  'distributions-and-skewness': topic3_2,
  'm3-t2': topic3_2,
  'topic-2': topic3_2,
  'data-visualization': topic3_3,
  'data-visualization-and-chart-selection': topic3_3,
  'visualization': topic3_3,
  'm3-t3': topic3_3,
  'topic-3': topic3_3,
};

export const module3LessonList: LessonContent[] = [
  topic3_1,
  topic3_2,
  topic3_3,
];

export function getModule3Lesson(slugOrId: string): LessonContent | undefined {
  return module3Lessons[slugOrId];
}

export { topic3_1, topic3_2, topic3_3 };

