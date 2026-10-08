import { LessonContent } from '@/types/lesson';
import { topic3_1 } from './topic3_1';

export const module3Lessons: Record<string, LessonContent> = {
  'descriptive-statistics': topic3_1,
  'm3-t1': topic3_1,
};

export const module3LessonList: LessonContent[] = [
  topic3_1,
];

export function getModule3Lesson(slugOrId: string): LessonContent | undefined {
  return module3Lessons[slugOrId];
}
