'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, Tag, ProgressBar } from '@carbon/react';
import { CheckmarkFilled, Locked, PlayFilledAlt, Time, Catalog } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';
import { module1LessonList } from '@/data/lessons/module1';
import { module2LessonList } from '@/data/lessons/module2';
import { useCourseProgress } from '@/context/CourseProgressContext';

import { LessonHero } from './LessonHero';
import { StorySection } from './StorySection';
import { ConceptSection } from './ConceptSection';
import { CodePlayground } from './CodePlayground';
import { CommonMistakes } from './CommonMistakes';
import { ThinkingApproach } from './ThinkingApproach';
import { InteractiveQuiz } from './InteractiveQuiz';
import { TopicSummary } from './TopicSummary';

// Topic 1.1 Interactives Suite
import { DataToDecisionTransformer } from './interactives/DataToDecisionTransformer';
import { LifecycleExplorer } from './interactives/LifecycleExplorer';
import { QuestionTypesExplorer } from './interactives/QuestionTypesExplorer';
import { RealWorldShowcase } from './interactives/RealWorldShowcase';
import { ThinkingChecklist } from './interactives/ThinkingChecklist';
import { DataScienceVenn } from './interactives/DataScienceVenn';

// Topic 1.2 Interactives Suite
import { DataTeamSimulator } from './interactives/DataTeamSimulator';
import { RolePipelineExplorer } from './interactives/RolePipelineExplorer';
import { ToolMatcher } from './interactives/ToolMatcher';
import { RoleToolMatrix } from './interactives/RoleToolMatrix';
import { BuildYourDataTeam } from './interactives/BuildYourDataTeam';

// Topic 1.3 Interactives Suite
import { VariableLab } from './interactives/VariableLab';
import { TypeDetective } from './interactives/TypeDetective';
import { TypeShiftTimeline } from './interactives/TypeShiftTimeline';
import { ConversionLab } from './interactives/ConversionLab';
import { NamingChecker } from './interactives/NamingChecker';
import { FromValueToDataset } from './interactives/FromValueToDataset';
import { StudentProfileBuilder } from './interactives/StudentProfileBuilder';

// Topic 1.4 Interactives Suite
import { ConditionChecker } from './interactives/ConditionChecker';
import { GradeDecisionTree } from './interactives/GradeDecisionTree';
import { BooleanPlayground } from './interactives/BooleanPlayground';
import { ForLoopVisualizer } from './interactives/ForLoopVisualizer';
import { RangeBuilder } from './interactives/RangeBuilder';
import { WhileLoopVisualizer } from './interactives/WhileLoopVisualizer';
import { BreakVsContinue } from './interactives/BreakVsContinue';
import { DryRunSimulator } from './interactives/DryRunSimulator';
import { AnalyzeTheClassChallenge } from './interactives/AnalyzeTheClassChallenge';

// Topic 1.5 Interactives Suite
import { FunctionAnatomy } from './interactives/FunctionAnatomy';
import { ParameterSlotMachine } from './interactives/ParameterSlotMachine';
import { PrintVsReturnLab } from './interactives/PrintVsReturnLab';
import { InteractiveFunctionBuilder } from './interactives/InteractiveFunctionBuilder';
import { DefaultParamPlayground } from './interactives/DefaultParamPlayground';
import { ArgumentOrderLab } from './interactives/ArgumentOrderLab';
import { ScopeVisualizer } from './interactives/ScopeVisualizer';
import { FunctionPipelineVisualizer } from './interactives/FunctionPipelineVisualizer';
import { DataScienceToolkitChallenge } from './interactives/DataScienceToolkitChallenge';

// Topic 1.6 Interactives Suite
import { CellTypeSorter } from './interactives/CellTypeSorter';
import { NotebookAnatomyExplorer } from './interactives/NotebookAnatomyExplorer';
import { ExecutionOrderLab } from './interactives/ExecutionOrderLab';
import { KernelStateVisualizer } from './interactives/KernelStateVisualizer';
import { JupyterSimulator } from './interactives/JupyterSimulator';
import { ReproducibilityLab } from './interactives/ReproducibilityLab';
import { NotebookDesignChallenge } from './interactives/NotebookDesignChallenge';

// Topic 1.7 Interactives Suite
import { ArrayBuilder } from './interactives/ArrayBuilder';
import { ArrayFactory } from './interactives/ArrayFactory';
import { IndexingSlicingLab } from './interactives/IndexingSlicingLab';
import { VectorMathLab } from './interactives/VectorMathLab';
import { AxisVisualizer } from './interactives/AxisVisualizer';
import { ReshapeLab } from './interactives/ReshapeLab';
import { NumpyPlayground } from './interactives/NumpyPlayground';
import { Module1FinalChallenge } from './interactives/Module1FinalChallenge';
import { NumpyVectorizationBenchmark } from './interactives/NumpyVectorizationBenchmark';

// Topic 2.1 Interactives Suite
import { ApiRestaurantAnalogy } from './interactives/ApiRestaurantAnalogy';
import { ApiRequestBuilder } from './interactives/ApiRequestBuilder';
import { JsonExplorer } from './interactives/JsonExplorer';
import { HttpStatusDetective } from './interactives/HttpStatusDetective';
import { BatchVsStreamingVisualizer } from './interactives/BatchVsStreamingVisualizer';
import { DataStreamSimulator } from './interactives/DataStreamSimulator';
import { ApiVsScrapingMatrix } from './interactives/ApiVsScrapingMatrix';
import { ApiDetectiveChallenge } from './interactives/ApiDetectiveChallenge';

// Topic 2.2 Interactives Suite
import { WebScrapingPipeline } from './interactives/WebScrapingPipeline';
import { HtmlVsRenderedVisualizer } from './interactives/HtmlVsRenderedVisualizer';
import { DomTreeExplorer } from './interactives/DomTreeExplorer';
import { ElementSelectorLab } from './interactives/ElementSelectorLab';
import { FindVsFindAllVisualizer } from './interactives/FindVsFindAllVisualizer';
import { TextVsAttributeExtractor } from './interactives/TextVsAttributeExtractor';
import { HtmlTableToDataframeVisualizer } from './interactives/HtmlTableToDataframeVisualizer';
import { StaticVsDynamicVisualizer } from './interactives/StaticVsDynamicVisualizer';
import { WebpageAnatomyExplorer } from './interactives/WebpageAnatomyExplorer';
import { WebScrapingSimulator } from './interactives/WebScrapingSimulator';
import { ResponsibleScrapingGuide } from './interactives/ResponsibleScrapingGuide';
import { WebDetectiveChallenge } from './interactives/WebDetectiveChallenge';

// Topic 2.3 Interactives Suite
import { DataTypeEverywhereExplorer } from './interactives/DataTypeEverywhereExplorer';
import { DiscreteVsContinuousLab } from './interactives/DiscreteVsContinuousLab';
import { NominalVsOrdinalLab } from './interactives/NominalVsOrdinalLab';
import { DataTypeDetective } from './interactives/DataTypeDetective';
import { DataSourceHierarchyMap } from './interactives/DataSourceHierarchyMap';
import { StructureDetective } from './interactives/StructureDetective';
import { SourceSelectionScenario } from './interactives/SourceSelectionScenario';
import { DataTypeSourceMatrix } from './interactives/DataTypeSourceMatrix';
import { RepresentationAndIdentifierLab } from './interactives/RepresentationAndIdentifierLab';
import { InteractiveDataDictionary } from './interactives/InteractiveDataDictionary';
import { DataTypeDecisionTree } from './interactives/DataTypeDecisionTree';
import { FoodDeliveryCaseStudy } from './interactives/FoodDeliveryCaseStudy';
import { DatasetDetectiveChallenge } from './interactives/DatasetDetectiveChallenge';

// Topic 2.4 Interactives Suite
import { ZeroVsMissingLab } from './interactives/ZeroVsMissingLab';
import { MissingnessMechanismsExplorer } from './interactives/MissingnessMechanismsExplorer';
import { MissingDataDetective } from './interactives/MissingDataDetective';
import { DropVsKeepExperiment } from './interactives/DropVsKeepExperiment';
import { MeanVsMedianPlayground } from './interactives/MeanVsMedianPlayground';
import { CategoricalAndSequentialImputationLab } from './interactives/CategoricalAndSequentialImputationLab';
import { ImputationStrategyDecisionTree } from './interactives/ImputationStrategyDecisionTree';
import { ObservedVsImputedVisualizer } from './interactives/ObservedVsImputedVisualizer';
import { StudentPerformanceCaseStudy } from './interactives/StudentPerformanceCaseStudy';
import { MissingDataChallenge } from './interactives/MissingDataChallenge';

export function LessonLayout({ lesson }: { lesson: LessonContent }) {
  const pathname = usePathname();
  const { isTopicCompleted, modules } = useCourseProgress();
  const activeModule = modules.find((m) => m.id === lesson.moduleId);

  const isTopic1_1 = lesson.id === 'm1-t1' || lesson.slug === 'data-science-introduction';
  const isTopic1_2 = lesson.id === 'm1-t2' || lesson.slug === 'roles-and-tools-in-data-science';
  const isTopic1_3 = lesson.id === 'm1-t3' || lesson.slug === 'python-refresher-variables';
  const isTopic1_4 = lesson.id === 'm1-t4' || lesson.slug === 'control-structures';
  const isTopic1_5 = lesson.id === 'm1-t5' || lesson.slug === 'functions-and-modularity';
  const isTopic1_6 = lesson.id === 'm1-t6' || lesson.slug === 'introduction-to-jupyter-notebook';
  const isTopic1_7 = lesson.id === 'm1-t7' || lesson.slug === 'numpy-basics-and-vectorization';
  const isTopic2_1 = lesson.id === 'm2-t1' || lesson.slug === 'apis-and-data-streams';
  const isTopic2_2 = lesson.id === 'm2-t2' || lesson.slug === 'web-scraping-and-parsing';
  const isTopic2_3 = lesson.id === 'm2-t3' || lesson.slug === 'data-types-and-sources';
  const isTopic2_4 = lesson.id === 'm2-t4' || lesson.slug === 'missing-data-imputation';

  const renderInteractiveBlock = () => {
    switch (lesson.interactiveType) {
      case 'venn':
        return <DataScienceVenn />;
      case 'role-matrix':
      case 'variable-memory':
      case 'execution-flow':
      case 'function-transformer':
      case 'jupyter-runner':
      case 'numpy-benchmark':
        // For custom multi-step topics we render modular interactives in the stream
        return null;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: 'var(--ds-bg-core)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="ds-container">
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumb noTrailingSlash aria-label="Topic Navigation">
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={`/modules/${lesson.moduleId}`}>
                {lesson.moduleId === 'module-2'
                  ? 'Module 2: Data Collection'
                  : 'Module 1: Introduction'}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              Topic {lesson.topicNumber}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* 2-Column Layout: Sidebar + Lesson Body */}
        <div className="ds-lesson-layout-grid">
          {/* Main Lesson Content Stream */}
          <div style={{ minWidth: 0 }}>
            <LessonHero lesson={lesson} />
            <StorySection hook={lesson.hook} />

            {/* Topic 2.1 Interactive 1: The Restaurant Analogy */}
            {isTopic2_1 && <ApiRestaurantAnalogy />}

            {/* Topic 2.2 Interactive 1: HTML vs What You See */}
            {isTopic2_2 && <HtmlVsRenderedVisualizer />}

            {/* Topic 2.3 Interactive 1: Data is Everywhere */}
            {isTopic2_3 && <DataTypeEverywhereExplorer />}

            {/* Topic 2.4 Interactive 1: Zero vs Missing Lab */}
            {isTopic2_4 && <ZeroVsMissingLab />}

            {/* Topic 1.1 Interactive 1: Data -> Info -> Insight -> Decision */}
            {isTopic1_1 && <DataToDecisionTransformer />}

            {/* Topic 1.2 Interactive 1: Data Team Simulator */}
            {isTopic1_2 && <DataTeamSimulator />}

            {/* Topic 1.3 Interactive 1: Variable Lab */}
            {isTopic1_3 && <VariableLab />}

            {/* Topic 1.4 Interactive 1: Condition Checker */}
            {isTopic1_4 && <ConditionChecker />}

            {/* Topic 1.5 Interactive 1: Function Anatomy Explorer */}
            {isTopic1_5 && <FunctionAnatomy />}

            {/* Topic 1.6 Interactive 1: Cell Type Sorter (Code vs Markdown) */}
            {isTopic1_6 && <CellTypeSorter />}

            {/* Topic 1.7 Interactive 1: Array Builder (1D vs 2D ndarray) */}
            {isTopic1_7 && <ArrayBuilder />}

            <ConceptSection
              coreConcept={lesson.coreConcept}
              technicalExplanation={lesson.technicalExplanation}
            />

            {/* Default Interactive Block */}
            {renderInteractiveBlock()}

            {/* Topic 2.1 Interactives Suite */}
            {isTopic2_1 && <ApiRequestBuilder />}
            {isTopic2_1 && <JsonExplorer />}
            {isTopic2_1 && <HttpStatusDetective />}
            {isTopic2_1 && <BatchVsStreamingVisualizer />}
            {isTopic2_1 && <DataStreamSimulator />}
            {isTopic2_1 && <ApiVsScrapingMatrix />}

            {/* Topic 2.2 Interactives Suite */}
            {isTopic2_2 && <WebScrapingPipeline />}
            {isTopic2_2 && <DomTreeExplorer />}
            {isTopic2_2 && <ElementSelectorLab />}
            {isTopic2_2 && <FindVsFindAllVisualizer />}
            {isTopic2_2 && <TextVsAttributeExtractor />}
            {isTopic2_2 && <HtmlTableToDataframeVisualizer />}
            {isTopic2_2 && <StaticVsDynamicVisualizer />}
            {isTopic2_2 && <WebpageAnatomyExplorer />}
            {isTopic2_2 && <WebScrapingSimulator />}
            {isTopic2_2 && <ResponsibleScrapingGuide />}

            {/* Topic 2.3 Interactives Suite */}
            {isTopic2_3 && <DiscreteVsContinuousLab />}
            {isTopic2_3 && <NominalVsOrdinalLab />}
            {isTopic2_3 && <DataTypeDetective />}
            {isTopic2_3 && <DataSourceHierarchyMap />}
            {isTopic2_3 && <StructureDetective />}
            {isTopic2_3 && <SourceSelectionScenario />}
            {isTopic2_3 && <DataTypeSourceMatrix />}
            {isTopic2_3 && <RepresentationAndIdentifierLab />}
            {isTopic2_3 && <InteractiveDataDictionary />}
            {isTopic2_3 && <DataTypeDecisionTree />}
            {isTopic2_3 && <FoodDeliveryCaseStudy />}

            {/* Topic 2.4 Interactives Suite */}
            {isTopic2_4 && <MissingnessMechanismsExplorer />}
            {isTopic2_4 && <MissingDataDetective />}
            {isTopic2_4 && <DropVsKeepExperiment />}
            {isTopic2_4 && <MeanVsMedianPlayground />}
            {isTopic2_4 && <CategoricalAndSequentialImputationLab />}
            {isTopic2_4 && <ImputationStrategyDecisionTree />}
            {isTopic2_4 && <ObservedVsImputedVisualizer />}
            {isTopic2_4 && <StudentPerformanceCaseStudy />}

            {/* Topic 1.1 Interactive 2: 9-Stage Iterative Lifecycle */}
            {isTopic1_1 && <LifecycleExplorer />}

            {/* Topic 1.2 Interactive 2: Role Pipeline Explorer */}
            {isTopic1_2 && <RolePipelineExplorer />}

            {/* Topic 1.3 Interactive 2: Type Detective */}
            {isTopic1_3 && <TypeDetective />}

            {/* Topic 1.4 Interactive 2: Grade Decision Playground (if/elif/else tree) */}
            {isTopic1_4 && <GradeDecisionTree />}

            {/* Topic 1.5 Interactive 2: Parameter Slot Machine */}
            {isTopic1_5 && <ParameterSlotMachine />}

            {/* Topic 1.6 Interactive 2: Notebook Anatomy Explorer */}
            {isTopic1_6 && <NotebookAnatomyExplorer />}

            {/* Topic 1.7 Interactive 2: Array Creation Factory */}
            {isTopic1_7 && <ArrayFactory />}

            {/* Topic 1.1 Interactive 3: 4 Types of Questions */}
            {isTopic1_1 && <QuestionTypesExplorer />}

            {/* Topic 1.2 Interactive 3: Tool Matcher */}
            {isTopic1_2 && <ToolMatcher />}

            {/* Topic 1.3 Interactive 3: Dynamic Typing Timeline */}
            {isTopic1_3 && <TypeShiftTimeline />}

            {/* Topic 1.4 Interactive 3: Boolean Logic & Short-Circuit Explorer */}
            {isTopic1_4 && <BooleanPlayground />}

            {/* Topic 1.5 Interactive 3: print() vs return Lab */}
            {isTopic1_5 && <PrintVsReturnLab />}

            {/* Topic 1.6 Interactive 3: Execution Order Lab */}
            {isTopic1_6 && <ExecutionOrderLab />}

            {/* Topic 1.7 Interactive 3: Indexing & Slicing Explorer */}
            {isTopic1_7 && <IndexingSlicingLab />}

            {/* Topic 1.1 Interactive 4: Real World Ecosystem */}
            {isTopic1_1 && <RealWorldShowcase />}

            {/* Topic 1.2 Interactive 4: Role + Tool Connection Matrix */}
            {isTopic1_2 && <RoleToolMatrix />}

            {/* Topic 1.3 Interactive 4: Type Conversion Workbench */}
            {isTopic1_3 && <ConversionLab />}

            {/* Topic 1.4 Interactive 4: For Loop Iterator Visualizer */}
            {isTopic1_4 && <ForLoopVisualizer />}

            {/* Topic 1.5 Interactive 4: Interactive Function Builder */}
            {isTopic1_5 && <InteractiveFunctionBuilder />}

            {/* Topic 1.6 Interactive 4: Kernel State Visualizer */}
            {isTopic1_6 && <KernelStateVisualizer />}

            {/* Topic 1.7 Interactive 4: Vectorized Math & Broadcasting */}
            {isTopic1_7 && <VectorMathLab />}

            {/* Topic 1.3 Interactive 5: Python Naming Checker */}
            {isTopic1_3 && <NamingChecker />}

            {/* Topic 1.4 Interactive 5: range() Sequence Generator */}
            {isTopic1_4 && <RangeBuilder />}

            {/* Topic 1.5 Interactive 5: Default Parameter Playground */}
            {isTopic1_5 && <DefaultParamPlayground />}

            {/* Topic 1.6 Interactive 5: Jupyter Primary Simulator */}
            {isTopic1_6 && <JupyterSimulator />}

            {/* Topic 1.7 Interactive 5: Understanding Axis (0 vs 1) */}
            {isTopic1_7 && <AxisVisualizer />}

            {/* Topic 1.4 Interactive 6: While Loop Simulator */}
            {isTopic1_4 && <WhileLoopVisualizer />}

            {/* Topic 1.5 Interactive 6: Positional vs Keyword Argument Mapper */}
            {isTopic1_5 && <ArgumentOrderLab />}

            {/* Topic 1.6 Interactive 6: Reproducibility Lab */}
            {isTopic1_6 && <ReproducibilityLab />}

            {/* Topic 1.7 Interactive 6: Reshape Lab */}
            {isTopic1_7 && <ReshapeLab />}

            {/* Topic 1.4 Interactive 7: Break vs Continue Playground */}
            {isTopic1_4 && <BreakVsContinue />}

            {/* Topic 1.5 Interactive 7: Scope Visualizer */}
            {isTopic1_5 && <ScopeVisualizer />}

            {/* Topic 1.7 Interactive 7: Vectorization Speed Benchmark */}
            {isTopic1_7 && <NumpyVectorizationBenchmark />}

            {/* Code Examples Playground */}
            <CodePlayground examples={lesson.codeExamples} />

            {/* Topic 1.1 Interactive 5: Thinking Checklist */}
            {isTopic1_1 && <ThinkingChecklist />}

            {/* Topic 1.2 Interactive 5: Build Your Data Team Challenge */}
            {isTopic1_2 && <BuildYourDataTeam />}

            {/* Topic 1.3 Interactive 6: From Value To Dataset Bridge */}
            {isTopic1_3 && <FromValueToDataset />}

            {/* Topic 1.4 Interactive 8: Trace Table Simulator */}
            {isTopic1_4 && <DryRunSimulator />}

            {/* Topic 1.5 Interactive 8: Function Composition Pipeline */}
            {isTopic1_5 && <FunctionPipelineVisualizer />}

            {/* Topic 1.7 Interactive 8: Consolidated NumPy Playground */}
            {isTopic1_7 && <NumpyPlayground />}

            {/* Topic 1.3 Mini Challenge: Build a Student Profile */}
            {isTopic1_3 && <StudentProfileBuilder />}

            {/* Topic 1.4 Mini Challenge: Analyze the Class */}
            {isTopic1_4 && <AnalyzeTheClassChallenge />}

            {/* Topic 1.5 Mini Challenge: Data Science Toolkit */}
            {isTopic1_5 && <DataScienceToolkitChallenge />}

            {/* Topic 1.6 Mini Challenge: Design Your First Data Science Notebook */}
            {isTopic1_6 && <NotebookDesignChallenge />}

            {/* Topic 1.7 Mini Challenge: Analyze a Class (Module 1 Final Capstone) */}
            {isTopic1_7 && <Module1FinalChallenge />}

            {/* Topic 2.1 Capstone Challenge */}
            {isTopic2_1 && <ApiDetectiveChallenge />}

            {/* Topic 2.2 Capstone Challenge */}
            {isTopic2_2 && <WebDetectiveChallenge />}

            {/* Topic 2.3 Capstone Challenge */}
            {isTopic2_3 && <DatasetDetectiveChallenge />}

            {/* Topic 2.4 Capstone Challenge */}
            {isTopic2_4 && <MissingDataChallenge />}

            <CommonMistakes mistakes={lesson.commonMistakes} />
            <ThinkingApproach strategies={lesson.thinkingStrategies} />
            <InteractiveQuiz questions={lesson.quiz} />
            <TopicSummary lesson={lesson} />
          </div>

          {/* Sticky Topic Navigation Sidebar */}
          <aside
            style={{
              position: 'sticky',
              top: '5.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Module Progress Card */}
            <div
              className="ds-glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-strong)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                  {lesson.moduleId === 'module-2' ? 'Module 2 Progress' : 'Module 1 Progress'}
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {activeModule?.progress || 0}%
                </span>
              </div>
              <ProgressBar
                value={activeModule?.progress || 0}
                max={100}
                size="small"
                hideLabel
                label={lesson.moduleId === 'module-2' ? 'Module 2' : 'Module 1'}
              />
            </div>

            {/* Topics Syllabus Accordion */}
            <div
              className="ds-glass-panel"
              style={{
                borderRadius: '4px',
                border: '1px solid var(--ds-border-strong)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderBottom: '1px solid var(--ds-border-subtle)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--ds-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Catalog size={16} style={{ color: 'var(--ds-cyan)' }} />
                <span>
                  {lesson.moduleId === 'module-2'
                    ? `Module 2 Topics (${module2LessonList.length})`
                    : `Module 1 Topics (${module1LessonList.length})`}
                </span>
              </div>

              <div style={{ padding: '0.5rem 0' }}>
                {(lesson.moduleId === 'module-2' ? module2LessonList : module1LessonList).map((top, idx) => {
                  const isCurrent = top.slug === lesson.slug;
                  const isDone = isTopicCompleted(top.id);

                  return (
                    <Link
                      key={top.id}
                      href={`/modules/${lesson.moduleId}/${top.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.625rem 1rem',
                        background: isCurrent ? 'var(--ds-cyan-dim)' : 'transparent',
                        borderLeft: isCurrent ? '3px solid var(--ds-cyan)' : '3px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--ds-font-mono)',
                            fontSize: '0.75rem',
                            color: isCurrent ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                            flexShrink: 0,
                          }}
                        >
                          {top.topicNumber}
                        </span>
                        <span
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: isCurrent ? 600 : 400,
                            color: isCurrent ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {top.title}
                        </span>
                      </div>

                      <div style={{ flexShrink: 0, marginLeft: '6px' }}>
                        {isDone ? (
                          <CheckmarkFilled size={14} style={{ color: 'var(--ds-emerald)' }} />
                        ) : isCurrent ? (
                          <PlayFilledAlt size={12} style={{ color: 'var(--ds-cyan)' }} />
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
