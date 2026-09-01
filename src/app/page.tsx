'use client';

import React from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { DataPipelineJourney } from '@/components/journey/DataPipelineJourney';
import { CourseProgressOverview } from '@/components/progress/CourseProgressOverview';
import { ModuleGrid } from '@/components/modules/ModuleGrid';
import { LearningJourneyRoadmap } from '@/components/journey/LearningJourneyRoadmap';
import { QuickAccessSection } from '@/components/quick-access/QuickAccessSection';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Course Introduction & Data Pipeline Visualizer */}
      <DataPipelineJourney />

      {/* 3. Real-time Course Progress Status */}
      <CourseProgressOverview />

      {/* 4. 5-Module Interactive Carbon Grid */}
      <ModuleGrid />

      {/* 5. Connected Learning Journey Roadmap */}
      <LearningJourneyRoadmap />

      {/* 6. Quick Access Ecosystem Tools */}
      <QuickAccessSection />
    </div>
  );
}
