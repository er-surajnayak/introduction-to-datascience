export type InteractiveType =
  | 'venn'
  | 'role-matrix'
  | 'variable-memory'
  | 'execution-flow'
  | 'function-transformer'
  | 'jupyter-runner'
  | 'numpy-benchmark';

export interface CodeExample {
  title: string;
  description: string;
  language: string;
  code: string;
  lineExplanations: { line: number; text: string }[];
  output?: string;
}

export interface CommonMistake {
  mistake: string;
  why: string;
  correction: string;
  wrongCode?: string;
  correctCode?: string;
}

export interface ThinkingStrategy {
  question: string;
  context: string;
  reasoning: string;
  ruleOfThumb: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  topicNumber: string; // e.g. "1.1"
  slug: string;
  moduleId: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  objectives: string[];
  hook: {
    title: string;
    story: string;
    analogy: string;
    realWorldImpact: string;
  };
  coreConcept: {
    headline: string;
    explanation: string;
    keyPillars: { title: string; description: string; iconName?: string }[];
  };
  interactiveType: InteractiveType;
  technicalExplanation: {
    title: string;
    deepDive: string;
    bulletPoints: string[];
    equations?: string[];
  };
  codeExamples: CodeExample[];
  commonMistakes: CommonMistake[];
  thinkingStrategies: ThinkingStrategy[];
  quiz: QuizQuestion[];
  summary: {
    takeaways: string[];
    nextUpText: string;
  };
  prevTopic?: { slug: string; title: string };
  nextTopic?: { slug: string; title: string };
}
