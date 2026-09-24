import { LessonContent } from '@/types/lesson';
import { topic2_1 } from './topic2_1';
import { topic2_2 } from './topic2_2';
import { topic2_3 } from './topic2_3';

export const module2Lessons: Record<string, LessonContent> = {
  'apis-and-data-streams': topic2_1,
  'm2-t1': topic2_1,
  'web-scraping-and-parsing': topic2_2,
  'm2-t2': topic2_2,
  'data-types-and-sources': topic2_3,
  'm2-t3': topic2_3,
};

export const module2LessonList: LessonContent[] = [
  topic2_1,
  topic2_2,
  topic2_3,
];

export function getModule2Lesson(slugOrId: string): LessonContent | undefined {
  return module2Lessons[slugOrId];
}

