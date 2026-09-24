'use client';

import React, { useState } from 'react';
import { Tag, Slider, Button } from '@carbon/react';
import { ChartLine, Reset, Information } from '@carbon/icons-react';

interface Preset {
  name: string;
  min: number;
  max: number;
  val: number;
  unit: string;
  description: string;
}

const PRESETS: Preset[] = [
  {
    name: 'Student Age',
    min: 18,
    max: 60,
    val: 39,
    unit: 'yrs',
    description: 'Undergraduate to continuing education age spectrum scaled to 0–1.',
  },
  {
    name: 'Salary Range',
    min: 20000,
    max: 200000,
    val: 110000,
    unit: '₹',
    description: 'Entry-level to executive salary normalized to unit range.',
  },
  {
    name: 'Exam Marks',
    min: 0,
    max: 100,
    val: 85,
    unit: 'pts',
    description: 'Raw test scores mapped directly between lowest and highest bounds.',
  },
  {
    name: 'Temperature',
    min: -10,
    max: 40,
    val: 20,
    unit: '°C',
    description: 'Sensor temperatures including negative bounds mapped into [0, 1].',
  },
];

export function MinMaxNormalizationVisualizer() {
  const [minVal, setMinVal] = useState<number>(20);
  const [maxVal, setMaxVal] = useState<number>(60);
  const [currentVal, setCurrentVal] = useState<number>(40);
  const [activePreset, setActivePreset] = useState<string>('Custom');
  const [unit, setUnit] = useState<string>('');

  const range = maxVal - minVal;
  const normalizedVal = range !== 0 ? (currentVal - minVal) / range : 0;
  const clampedNorm = Math.max(0, Math.min(1, normalizedVal));
  const normPercentage = clampedNorm * 100;

  const applyPreset = (preset: Preset) => {
    setMinVal(preset.min);
    setMaxVal(preset.max);
    setCurrentVal(preset.val);
    setUnit(preset.unit);
    setActivePreset(preset.name);
  };

  const handleReset = () => {
    setMinVal(20);
    setMaxVal(60);
    setCurrentVal(40);
    setUnit('');
    setActivePreset('Custom');
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-subtle)',
        marginBottom: '2rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChartLine size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Interactive Min-Max Normalization Visualizer
          </h3>
          <Tag type="teal" size="sm">x&apos; = (x - x_min) / (x_max - x_min)</Tag>
        </div>
        <Button kind="ghost" size="sm" renderIcon={Reset} onClick={handleRestartOrReset}>
          Reset
        </Button>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Min-Max scaling compresses any numerical feature into a fixed interval, typically <code>[0.0, 1.0]</code>. Adjust the sliders or choose a real-world scenario to watch the dual-axis transformation compute live.
      </p>

      {/* Scenario Presets */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: activePreset === p.name ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activePreset === p.name ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
              color: activePreset === p.name ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Interactive Sliders Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: '6px' }}>
            Current Value (x): <span style={{ color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>{currentVal} {unit}</span>
          </label>
          <Slider
            id="val-slider"
            labelText=""
            hideTextInput
            min={minVal}
            max={maxVal}
            step={range > 1000 ? 1000 : 1}
            value={currentVal}
            onChange={({ value }: { value: number }) => {
              setCurrentVal(value);
              setActivePreset('Custom');
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: '6px' }}>
            Minimum Boundary (x_min): <span style={{ color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>{minVal} {unit}</span>
          </label>
          <Slider
            id="min-slider"
            labelText=""
            hideTextInput
            min={minVal < 0 ? -100 : 0}
            max={maxVal - 10}
            step={range > 1000 ? 1000 : 1}
            value={minVal}
            onChange={({ value }: { value: number }) => {
              setMinVal(value);
              if (currentVal < value) setCurrentVal(value);
              setActivePreset('Custom');
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: '6px' }}>
            Maximum Boundary (x_max): <span style={{ color: 'var(--ds-text-primary)', fontFamily: 'var(--ds-font-mono)' }}>{maxVal} {unit}</span>
          </label>
          <Slider
            id="max-slider"
            labelText=""
            hideTextInput
            min={minVal + 10}
            max={maxVal > 100000 ? 500000 : 200}
            step={range > 1000 ? 1000 : 1}
            value={maxVal}
            onChange={({ value }: { value: number }) => {
              setMaxVal(value);
              if (currentVal > value) setCurrentVal(value);
              setActivePreset('Custom');
            }}
          />
        </div>
      </div>

      {/* Dual Scale Visualizer Display */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
          Dual-Axis Scale Mapping
        </div>

        {/* 1. Original Scale */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            <span>Original Scale (x_min = {minVal})</span>
            <span style={{ fontWeight: 600, color: 'var(--ds-cyan)' }}>x = {currentVal}</span>
            <span>(x_max = {maxVal})</span>
          </div>
          <div style={{ position: 'relative', height: '10px', background: 'var(--cds-layer-02)', borderRadius: '5px' }}>
            <div
              style={{
                position: 'absolute',
                left: `${normPercentage}%`,
                top: '-6px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'var(--ds-cyan)',
                border: '3px solid var(--ds-bg-core)',
                transform: 'translateX(-50%)',
                transition: 'left 0.1s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>

        {/* Arrow connector */}
        <div style={{ textAlign: 'center', margin: '-1rem 0 1rem 0', color: 'var(--ds-text-muted)', fontSize: '0.875rem' }}>
          ↓ <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)' }}>Min-Max Scaling</span> ↓
        </div>

        {/* 2. Normalized Scale [0, 1] */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
            <span>Normalized 0.0</span>
            <span style={{ fontWeight: 700, color: 'var(--ds-emerald)' }}>x&apos; = {clampedNorm.toFixed(4)}</span>
            <span>Normalized 1.0</span>
          </div>
          <div style={{ position: 'relative', height: '10px', background: 'var(--cds-layer-02)', borderRadius: '5px' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${normPercentage}%`,
                background: 'var(--ds-emerald)',
                borderRadius: '5px',
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: `${normPercentage}%`,
                top: '-6px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'var(--ds-emerald)',
                border: '3px solid var(--ds-bg-core)',
                transform: 'translateX(-50%)',
                transition: 'left 0.1s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Step-by-Step Mathematical Calculation Box */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '4px',
          background: 'rgba(15, 98, 254, 0.08)',
          borderLeft: '4px solid var(--ds-cyan)',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          color: 'var(--ds-text-primary)',
          marginBottom: '1rem',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '4px' }}>
          Step-by-Step Formula Computation:
        </div>
        <div>x&apos; = (x - x_min) / (x_max - x_min)</div>
        <div>x&apos; = ({currentVal} - {minVal}) / ({maxVal} - {minVal})</div>
        <div>x&apos; = {currentVal - minVal} / {range} = <strong>{clampedNorm.toFixed(4)}</strong> ({normPercentage.toFixed(1)}% along span)</div>
      </div>

      {/* Pedagogical Distinguish Alert */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
          padding: '0.875rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-secondary)',
        }}
      >
        <Information size={18} style={{ color: 'var(--ds-cyan)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--ds-text-primary)' }}>Crucial Distinction:</strong> Normalizing numbers (scaling scales into 0–1) is mathematical transformation for algorithms. This is separate from <em>format standardization</em> (e.g. trimming whitespace, converting text dates to datetime, or standardizing &apos;M&apos; to &apos;Male&apos;). Module 5 covers full feature scaling.
        </div>
      </div>
    </div>
  );

  function handleRestartOrReset() {
    handleReset();
  }
}
