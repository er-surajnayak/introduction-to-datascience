import { LessonContent } from '@/types/lesson';
import { topic2_1 } from './topic2_1';
import { topic2_2 } from './topic2_2';
import { topic2_3 } from './topic2_3';
import { topic2_4 } from './topic2_4';
import { topic2_5 } from './topic2_5';
import { topic2_6 } from './topic2_6';
import { topic2_7 } from './topic2_7';

export const module2Lessons: Record<string, LessonContent> = {
  'apis-and-data-streams': topic2_1,
  'm2-t1': topic2_1,
  'web-scraping-and-parsing': topic2_2,
  'm2-t2': topic2_2,
  'data-types-and-sources': topic2_3,
  'm2-t3': topic2_3,
  'missing-data-imputation': topic2_4,
  'm2-t4': topic2_4,
  'outliers-detection-and-treatment': topic2_5,
  'm2-t5': topic2_5,
  'data-formatting-and-normalization': topic2_6,
  'm2-t6': topic2_6,
  'numpy-and-pandas-operations': topic2_7,
  'm2-t7': topic2_7,
};

export const module2LessonList: LessonContent[] = [
  topic2_1,
  topic2_2,
  topic2_3,
  topic2_4,
  topic2_5,
  topic2_6,
  topic2_7,
];

export function getModule2Lesson(slugOrId: string): LessonContent | undefined {
  return module2Lessons[slugOrId];
}

