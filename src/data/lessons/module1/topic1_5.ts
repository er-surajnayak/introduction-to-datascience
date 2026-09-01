import { LessonContent } from '@/types/lesson';

export const topic1_5: LessonContent = {
  id: 'm1-t5',
  topicNumber: '1.5',
  slug: 'functions-and-modularity',
  moduleId: 'module-1',
  title: 'Functions & Modularity',
  subtitle: 'Pure Functions, Variable Scopes, Dynamic Arguments & Type Hints',
  estimatedMinutes: 35,
  difficulty: 'Beginner',
  tags: ['Functions', 'Modularity', 'Pure Functions', 'Type Hints', 'Scope'],
  objectives: [
    'Design reusable, pure functions that transform data without unintended global side-effects.',
    'Understand Python variable lookup hierarchy: the LEGB (Local, Enclosing, Global, Built-in) rule.',
    'Master flexible argument unpacking with `*args` (positional) and `**kwargs` (keyword).',
    'Write professional documentation using Python type hints and NumPy-style docstrings.',
  ],
  hook: {
    title: 'The Industrial Water Purification Plant',
    story:
      'Imagine an industrial water filtration facility. River water enters Stage 1 (Filter Sediments), passes to Stage 2 (Remove Heavy Metals), and exits Stage 3 (Chlorinate). Each stage is a self-contained, sealed unit: it takes water in, applies a specific transformation, and outputs purified water. It never reaches out to tamper with the electricity grid or pollute neighboring pipes. In software architecture, functions are your sealed filtration units.',
    analogy:
      'A great function is like a mathematical equation $f(x) = x^2 + 1$. Give it 3, and it always outputs 10, regardless of the time of day or computer state.',
    realWorldImpact:
      'In production ML pipelines, modular pure functions allow automated unit testing, distributed Spark/Dask parallelization, and bug-free pipeline deployment.',
  },
  coreConcept: {
    headline: 'Encapsulating Reusable Computational Logic',
    explanation:
      'A function is an isolated block of organized, reusable code designed to perform a single focused action. It takes inputs (arguments), executes logic within a local scope, and returns an output.',
    keyPillars: [
      {
        title: 'Pure Functions (Idempotence)',
        description: 'A function that produces identical output for identical inputs and causes zero side-effects on outside state.',
      },
      {
        title: 'The LEGB Scope Rule',
        description: 'Python resolves variables in order: Local → Enclosing (nested functions) → Global (module level) → Built-in.',
      },
      {
        title: 'Flexible Unpacking (*args, **kwargs)',
        description: 'Accepting arbitrary numbers of positional parameters (`*args` as tuple) and keyword configurations (`**kwargs` as dictionary).',
      },
    ],
  },
  interactiveType: 'function-transformer',
  technicalExplanation: {
    title: 'The Architecture of a Production Data Science Function',
    deepDive:
      'Professional data engineers never write ad-hoc code. Every transformation function is annotated with Python Type Hints (PEP 484) and structured docstrings detailing parameters, return types, and exceptions.',
    bulletPoints: [
      'Type annotations (e.g., `def min_max_scale(values: list[float]) -> list[float]:`) clarify intent and enable static type checking.',
      'Default arguments are evaluated once at function definition time—NEVER use mutable default arguments like `def func(data=[])`.',
      'Lambda functions (`lambda x: x ** 2`) are lightweight anonymous single-expression functions useful inside `.apply()` and `.map()`.',
    ],
  },
  codeExamples: [
    {
      title: 'Writing a Production-Grade Scaling Function',
      description: 'See how a Data Scientist builds a pure, type-hinted, and documented normalization utility.',
      language: 'python',
      code: `from typing import List, Tuple, Optional

def min_max_scaler(
    data: List[float], 
    feature_range: Tuple[float, float] = (0.0, 1.0)
) -> List[float]:
    """
    Transform features by scaling each feature to a given range (default 0 to 1).
    
    Formula: X_scaled = (X - X_min) / (X_max - X_min) * (max - min) + min
    """
    if not data:
        raise ValueError("Input dataset cannot be empty.")
    
    min_val = min(data)
    max_val = max(data)
    
    # Handle zero-variance edge case (all numbers identical)
    if min_val == max_val:
        return [feature_range[0]] * len(data)
    
    target_min, target_max = feature_range
    scale_factor = (target_max - target_min) / (max_val - min_val)
    
    return [
        (x - min_val) * scale_factor + target_min 
        for x in data
    ]

# Execution:
raw_salaries = [30000.0, 65000.0, 120000.0, 45000.0, 90000.0]
scaled = min_max_scaler(raw_salaries, feature_range=(0.0, 1.0))
print("Scaled features:", [round(s, 3) for s in scaled])`,
      lineExplanations: [
        { line: 3, text: 'Type hints declare input and return signatures for safety.' },
        { line: 5, text: 'Default tuple argument allows optional customization of target bounds.' },
        { line: 17, text: 'Defensive check prevents ZeroDivisionError on constant columns.' },
      ],
      output: 'Scaled features: [0.0, 0.389, 1.0, 0.167, 0.667]',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Using mutable default arguments like `def append_reading(val, log=[])`',
      why: 'In Python, default arguments are created once when the function is defined. Subsequent calls share and mutate the exact same list!',
      correction: 'Use `None` as default: `def append_reading(val, log=None): if log is None: log = []`.',
    },
  ],
  thinkingStrategies: [
    {
      question: 'How long should a single function be?',
      context: 'Writing data preparation scripts.',
      reasoning: 'Follow the Single Responsibility Principle: each function should perform exactly one task (e.g. impute missing values, or convert timestamps, or calculate z-scores). If a function is longer than 25-30 lines, split it.',
      ruleOfThumb: 'One function = one mathematical or logical transformation.',
    },
  ],
  quiz: [
    {
      id: 'q1-5-1',
      question: 'What happens if you define a function with `def add_item(item, data=[])` and call it twice with `add_item(1)` then `add_item(2)`?',
      options: [
        'The second call returns `[2]`',
        'The second call returns `[1, 2]` because the default list is retained across calls',
        'Python throws a SyntaxError',
        'The second call returns `None`',
      ],
      correctIndex: 1,
      explanation: 'In Python, default parameters are evaluated once at definition time. Mutable defaults (like lists or dicts) persist mutations across all subsequent invocations.',
    },
    {
      id: 'q1-5-2',
      question: 'What does the LEGB rule stand for in Python variable resolution?',
      options: [
        'Linear, Exponential, Geometric, Binary',
        'Local, Enclosing, Global, Built-in',
        'List, Element, Group, Block',
        'Logical, Evaluated, Generic, Bound',
      ],
      correctIndex: 1,
      explanation: 'Python resolves variables by searching: Local scope first, Enclosing function scope second, Global module scope third, and Built-in namespace last.',
    },
  ],
  summary: {
    takeaways: [
      'Pure functions take inputs, produce outputs, and cause zero external side effects.',
      'Always use `None` as the default value for mutable arguments.',
      'Type annotations and docstrings are essential for readable engineering codebases.',
    ],
    nextUpText: 'Topic 1.6: Introduction to Jupyter Notebook',
  },
  prevTopic: {
    slug: 'control-structures',
    title: 'Control Structures',
  },
  nextTopic: {
    slug: 'introduction-to-jupyter-notebook',
    title: 'Introduction to Jupyter Notebook',
  },
};
