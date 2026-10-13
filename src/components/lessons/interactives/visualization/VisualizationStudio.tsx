'use client';

import React, { useState } from 'react';
import {
  Tag,
  Button,
  Select,
  SelectItem,
  TextInput,
  Checkbox,
  Slider,
  CodeSnippet,
  InlineNotification,
} from '@carbon/react';
import { Renew, PlayFilledAlt, Code, ChartLine } from '@carbon/icons-react';
import {
  ChartConfig,
  generatePythonCode,
  isChartCompatible,
  calculateBoxPlotStats,
  computeHistogramBins,
  computeKdeDensity,
  computeCorrelationMatrix,
} from '@/lib/visualizationUtils';

const DATASETS = {
  students: {
    name: 'Student Performance (N = 8)',
    columns: [
      { name: 'Student', type: 'categorical' as const, values: ['Rahul', 'Priya', 'Arjun', 'Sneha', 'Kabir', 'Meera', 'Riya', 'Aman'] },
      { name: 'Class', type: 'categorical' as const, values: ['A', 'A', 'B', 'A', 'B', 'A', 'B', 'B'] },
      { name: 'StudyHours', type: 'numeric' as const, values: [3, 5, 2, 6, 4, 7, 5, 3] },
      { name: 'Marks', type: 'numeric' as const, values: [65, 82, 55, 92, 74, 95, 85, 62] },
      { name: 'Attendance', type: 'numeric' as const, values: [78, 88, 70, 96, 84, 92, 90, 75] },
    ],
  },
  ecommerce: {
    name: 'E-commerce Growth (N = 6)',
    columns: [
      { name: 'Month', type: 'categorical' as const, values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      { name: 'Revenue', type: 'numeric' as const, values: [120, 145, 138, 170, 195, 220] },
      { name: 'Orders', type: 'numeric' as const, values: [80, 95, 90, 110, 125, 145] },
      { name: 'AdSpend', type: 'numeric' as const, values: [20, 24, 22, 28, 31, 35] },
    ],
  },
};

const DEFAULT_CONFIG: ChartConfig = {
  library: 'matplotlib',
  chartType: 'line',
  datasetId: 'students',
  xVariable: 'Student',
  yVariable: 'Marks',
  hueVariable: 'none',
  title: 'Student Performance Overview',
  xLabel: 'Student',
  yLabel: 'Exam Marks',
  showGrid: true,
  showLegend: true,
  marker: 'o',
  lineStyle: '-',
  lineWidth: 2,
  orientation: 'vertical',
  bins: 5,
  bandwidth: 1.0,
};

export function VisualizationStudio() {
  const [config, setConfig] = useState<ChartConfig>({ ...DEFAULT_CONFIG });
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const dataset = DATASETS[config.datasetId as keyof typeof DATASETS] || DATASETS.students;
  const colX = dataset.columns.find((c) => c.name === config.xVariable) || dataset.columns[0];
  const colY = dataset.columns.find((c) => c.name === config.yVariable);

  const compat = isChartCompatible(config.chartType, colX.type, colY?.type);

  const handleReset = () => {
    setConfig({ ...DEFAULT_CONFIG });
  };

  const pythonCode = generatePythonCode(config);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="magenta" size="md">Section 3.3.23</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Main Hero Studio</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Full Interactive Plotting Engine & Python Exporter
        </span>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Visualization Studio: Design, Preview, and Export
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Configure any visualization across Matplotlib and Seaborn. Choose your dataset, map visual encodings, customize canvas decorators, and instantly inspect both the rendered live chart and matching production Python code.
      </p>

      {/* Main Studio Grid: Controls Panel (Left) + Display Area (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Configuration Panel */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
              Studio Configuration
            </span>
            <Button kind="ghost" size="sm" renderIcon={Renew} onClick={handleReset}>
              Reset Studio
            </Button>
          </div>

          {/* Dataset & Library Pickers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Select
              id="studio-dataset"
              labelText="Select Dataset"
              size="sm"
              value={config.datasetId}
              onChange={(e) => {
                const newDatasetId = e.target.value;
                const newDs = DATASETS[newDatasetId as keyof typeof DATASETS];
                setConfig({
                  ...config,
                  datasetId: newDatasetId,
                  xVariable: newDs.columns[0].name,
                  yVariable: newDs.columns[1]?.name,
                });
              }}
            >
              <SelectItem value="students" text="Student Performance" />
              <SelectItem value="ecommerce" text="E-Commerce Growth" />
            </Select>

            <Select
              id="studio-lib"
              labelText="Plotting Library"
              size="sm"
              value={config.library}
              onChange={(e) => setConfig({ ...config, library: e.target.value as any })}
            >
              <SelectItem value="matplotlib" text="Matplotlib (ax.*)" />
              <SelectItem value="seaborn" text="Seaborn (sns.*)" />
            </Select>
          </div>

          {/* Chart Type */}
          <Select
            id="studio-chart-type"
            labelText="Chart Type"
            size="sm"
            value={config.chartType}
            onChange={(e) => setConfig({ ...config, chartType: e.target.value as any })}
          >
            <SelectItem value="line" text="Line Chart (Trend)" />
            <SelectItem value="bar" text="Bar Chart (Comparison)" />
            <SelectItem value="histogram" text="Histogram (Distribution Bins)" />
            <SelectItem value="scatter" text="Scatter Plot (Relationship)" />
            <SelectItem value="box" text="Box Plot (Spread & Outliers)" />
            <SelectItem value="pie" text="Pie Chart (Composition)" />
            <SelectItem value="count" text="Count Plot (Category Tally)" />
            <SelectItem value="kde" text="KDE Plot (Smooth Density)" />
            <SelectItem value="violin" text="Violin Plot (Shape & Contours)" />
            <SelectItem value="heatmap" text="Heatmap (Correlation Matrix)" />
          </Select>

          {/* X & Y Variable Encodings */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Select
              id="studio-x-var"
              labelText="X Variable (Horizontal)"
              size="sm"
              value={config.xVariable}
              onChange={(e) => setConfig({ ...config, xVariable: e.target.value })}
            >
              {dataset.columns.map((c) => (
                <SelectItem key={c.name} value={c.name} text={`${c.name} (${c.type})`} />
              ))}
            </Select>

            <Select
              id="studio-y-var"
              labelText="Y Variable (Vertical)"
              size="sm"
              value={config.yVariable}
              onChange={(e) => setConfig({ ...config, yVariable: e.target.value })}
            >
              {dataset.columns.map((c) => (
                <SelectItem key={c.name} value={c.name} text={`${c.name} (${c.type})`} />
              ))}
            </Select>
          </div>

          {/* Hue Parameter (Seaborn) */}
          {config.library === 'seaborn' && (
            <Select
              id="studio-hue"
              labelText="Hue Grouping (Category Color)"
              size="sm"
              value={config.hueVariable || 'none'}
              onChange={(e) => setConfig({ ...config, hueVariable: e.target.value })}
            >
              <SelectItem value="none" text="None (Single Cohort)" />
              {dataset.columns.filter((c) => c.type === 'categorical').map((c) => (
                <SelectItem key={c.name} value={c.name} text={c.name} />
              ))}
            </Select>
          )}

          {/* Titles & Labels */}
          <TextInput
            id="studio-title"
            labelText="Chart Title"
            size="sm"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <TextInput
              id="studio-x-label"
              labelText="X-Axis Label"
              size="sm"
              value={config.xLabel}
              onChange={(e) => setConfig({ ...config, xLabel: e.target.value })}
            />
            <TextInput
              id="studio-y-label"
              labelText="Y-Axis Label"
              size="sm"
              value={config.yLabel}
              onChange={(e) => setConfig({ ...config, yLabel: e.target.value })}
            />
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: '16px', paddingTop: '4px' }}>
            <Checkbox
              id="studio-grid-cb"
              labelText="Gridlines"
              checked={config.showGrid}
              onChange={(_, { checked }) => setConfig({ ...config, showGrid: checked })}
            />
            <Checkbox
              id="studio-legend-cb"
              labelText="Legend"
              checked={config.showLegend}
              onChange={(_, { checked }) => setConfig({ ...config, showLegend: checked })}
            />
          </div>
        </div>

        {/* Right: Preview & Code Tabs */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-core)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Subheader Switcher */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                kind={activeTab === 'preview' ? 'primary' : 'secondary'}
                size="sm"
                renderIcon={ChartLine}
                onClick={() => setActiveTab('preview')}
              >
                Live Chart Preview
              </Button>
              <Button
                kind={activeTab === 'code' ? 'primary' : 'secondary'}
                size="sm"
                renderIcon={Code}
                onClick={() => setActiveTab('code')}
              >
                Python Source Code
              </Button>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
              {config.library.toUpperCase()} &bull; {config.chartType.toUpperCase()}
            </span>
          </div>

          {/* Schema Incompatibility Alert */}
          {!compat.compatible && (
            <div style={{ marginBottom: '12px' }}>
              <InlineNotification
                kind="warning"
                title="Configuration Incompatible"
                subtitle={compat.reason || 'This chart type requires different column data types.'}
                hideCloseButton
              />
            </div>
          )}

          {/* Tab 1: Rendered SVG Chart */}
          {activeTab === 'preview' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <svg viewBox="0 0 460 240" style={{ width: '100%', height: 'auto', maxHeight: '240px' }} role="img" aria-label="Visualization Studio Live Preview">
                {/* Title */}
                <text x="230" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="var(--ds-text-primary)">
                  {config.title}
                </text>

                {/* Grid */}
                {config.showGrid && (
                  <g stroke="var(--ds-border-subtle)" strokeDasharray="3 3">
                    <line x1="60" y1="40" x2="420" y2="40" />
                    <line x1="60" y1="90" x2="420" y2="90" />
                    <line x1="60" y1="140" x2="420" y2="140" />
                    <line x1="60" y1="180" x2="420" y2="180" />
                  </g>
                )}

                {/* Axes */}
                <line x1="60" y1="30" x2="60" y2="180" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
                <line x1="60" y1="180" x2="420" y2="180" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

                {/* Labels */}
                <text x="240" y="214" textAnchor="middle" fontSize="11" fill="var(--ds-text-secondary)">
                  {config.xLabel}
                </text>
                <text x="18" y="110" textAnchor="middle" fontSize="11" transform="rotate(-90 18 110)" fill="var(--ds-text-secondary)">
                  {config.yLabel}
                </text>

                {/* Specific Chart Rendering based on chartType */}
                {(() => {
                  if (config.chartType === 'line' || config.chartType === 'scatter') {
                    const numValues = (colY?.values as number[]) || [10, 20, 15, 25, 30];
                    const maxVal = Math.max(...numValues, 10);
                    const points = numValues.map((val, idx) => {
                      const x = 80 + idx * (300 / (numValues.length - 1 || 1));
                      const y = 180 - (val / maxVal) * 140;
                      return { x, y, val };
                    });

                    const pathD = points.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

                    return (
                      <g>
                        {config.chartType === 'line' && (
                          <path d={pathD} fill="none" stroke="var(--ds-blue)" strokeWidth={config.lineWidth} />
                        )}
                        {points.map((p, idx) => (
                          <circle key={idx} cx={p.x} cy={p.y} r={config.chartType === 'scatter' ? 6 : 4} fill="var(--ds-cyan)" stroke="#ffffff" strokeWidth="1.5" />
                        ))}
                      </g>
                    );
                  }

                  if (config.chartType === 'bar' || config.chartType === 'count') {
                    const numValues =
                      config.chartType === 'count'
                        ? [3, 2, 1, 2]
                        : ((colY?.values as number[]) || [20, 35, 45, 60]).slice(0, 5);
                    const labels = (colX?.values as string[]).slice(0, numValues.length);
                    const maxVal = Math.max(...numValues, 10);

                    return (
                      <g>
                        {numValues.map((val, idx) => {
                          const barW = 34;
                          const x = 85 + idx * 60;
                          const barH = (val / maxVal) * 130;
                          const y = 180 - barH;
                          return (
                            <g key={idx}>
                              <rect x={x} y={y} width={barW} height={barH} fill="var(--ds-blue)" rx="2" />
                              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="10" fill="var(--ds-text-primary)">{val}</text>
                              <text x={x + barW / 2} y="194" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">{labels[idx]}</text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  }

                  if (config.chartType === 'histogram' || config.chartType === 'kde') {
                    const rawValues = (colX?.values as number[]).filter((v) => Number.isFinite(v));
                    const bins = computeHistogramBins(rawValues.length ? rawValues : [40, 50, 60, 70, 80], 5);
                    const maxCount = Math.max(...bins.map((b) => b.count), 1);

                    return (
                      <g>
                        {bins.map((b, idx) => {
                          const barW = 60;
                          const x = 80 + idx * barW;
                          const barH = (b.count / maxCount) * 125;
                          const y = 180 - barH;
                          return (
                            <g key={idx}>
                              <rect x={x} y={y} width={barW} height={barH} fill="var(--ds-blue)" stroke="#ffffff" strokeWidth="1" opacity={config.chartType === 'kde' ? 0.35 : 1} />
                              <text x={x + barW / 2} y="194" textAnchor="middle" fontSize="9" fill="var(--ds-text-muted)">{Math.round(b.binStart)}–{Math.round(b.binEnd)}</text>
                            </g>
                          );
                        })}
                        {config.chartType === 'kde' && (
                          <path d="M 80 170 Q 170 60 260 110 T 380 170" fill="none" stroke="var(--ds-purple)" strokeWidth="3" />
                        )}
                      </g>
                    );
                  }

                  // Default Fallback Preview
                  return (
                    <g>
                      <rect x="120" y="70" width="80" height="70" fill="var(--ds-blue)" opacity="0.6" rx="2" />
                      <rect x="240" y="50" width="80" height="90" fill="var(--ds-purple)" opacity="0.6" rx="2" />
                      <line x1="120" y1="105" x2="200" y2="105" stroke="#ffffff" strokeWidth="2" />
                      <line x1="240" y1="95" x2="320" y2="95" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          ) : (
            // Tab 2: Exportable Python Code
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <CodeSnippet type="multi" feedback="Copied Python code">
                {pythonCode}
              </CodeSnippet>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
