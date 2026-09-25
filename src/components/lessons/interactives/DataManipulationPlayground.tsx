'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { OperationsRecord, Reset, Filter, ArrowsVertical, Add, Network_3 } from '@carbon/icons-react';

interface StudentRow {
  name: string;
  city: string;
  marks: number;
  attendance: number;
  bonus?: number;
  passed?: boolean;
}

const INITIAL_PLAYGROUND_DATA: StudentRow[] = [
  { name: 'Rahul', city: 'Mumbai', marks: 85, attendance: 92 },
  { name: 'Priya', city: 'Pune', marks: 91, attendance: 88 },
  { name: 'Arjun', city: 'Mumbai', marks: 76, attendance: 75 },
  { name: 'Sneha', city: 'Nashik', marks: 95, attendance: 96 },
  { name: 'Kabir', city: 'Pune', marks: 68, attendance: 81 },
];

export function DataManipulationPlayground() {
  const [filterChoice, setFilterChoice] = useState<'all' | 'marks80' | 'att85' | 'mumbai'>('all');
  const [sortChoice, setSortChoice] = useState<'default' | 'marks_desc' | 'marks_asc' | 'name_asc'>('default');
  const [addBonus, setAddBonus] = useState(false);
  const [addPassed, setAddPassed] = useState(false);
  const [groupByCity, setGroupByCity] = useState(false);
  const [aggMethod, setAggMethod] = useState<'mean' | 'sum' | 'max'>('mean');

  const handleReset = () => {
    setFilterChoice('all');
    setSortChoice('default');
    setAddBonus(false);
    setAddPassed(false);
    setGroupByCity(false);
  };

  // Pipeline construction
  let pipelineHistory: string[] = ['Raw Dataset (5 rows, 4 columns)'];

  // Step 1: Feature Creation
  let currentRows: StudentRow[] = INITIAL_PLAYGROUND_DATA.map((row) => ({
    ...row,
    bonus: addBonus ? row.marks + 5 : undefined,
    passed: addPassed ? row.marks >= 75 : undefined,
  }));

  if (addBonus) pipelineHistory.push('Created Column df["Bonus"] = df["Marks"] + 5');
  if (addPassed) pipelineHistory.push('Created Column df["Passed"] = df["Marks"] >= 75');

  // Step 2: Filtering
  if (filterChoice === 'marks80') {
    currentRows = currentRows.filter((r) => r.marks > 80);
    pipelineHistory.push('Filtered df[df["Marks"] > 80]');
  } else if (filterChoice === 'att85') {
    currentRows = currentRows.filter((r) => r.attendance > 85);
    pipelineHistory.push('Filtered df[df["Attendance"] > 85]');
  } else if (filterChoice === 'mumbai') {
    currentRows = currentRows.filter((r) => r.city === 'Mumbai');
    pipelineHistory.push('Filtered df[df["City"] == "Mumbai"]');
  }

  // Step 3: Sorting
  if (sortChoice === 'marks_desc') {
    currentRows = [...currentRows].sort((a, b) => b.marks - a.marks);
    pipelineHistory.push('Sorted df.sort_values("Marks", ascending=False)');
  } else if (sortChoice === 'marks_asc') {
    currentRows = [...currentRows].sort((a, b) => a.marks - b.marks);
    pipelineHistory.push('Sorted df.sort_values("Marks", ascending=True)');
  } else if (sortChoice === 'name_asc') {
    currentRows = [...currentRows].sort((a, b) => a.name.localeCompare(b.name));
    pipelineHistory.push('Sorted df.sort_values("Name")');
  }

  // GroupBy Aggregation if selected
  const getGroupedSummary = () => {
    const cities = Array.from(new Set(currentRows.map((r) => r.city)));
    return cities.map((c) => {
      const citySubset = currentRows.filter((r) => r.city === c);
      const marks = citySubset.map((s) => s.marks);
      const sum = marks.reduce((a, b) => a + b, 0);
      const mean = +(sum / marks.length).toFixed(2);
      const max = Math.max(...marks);
      return {
        city: c,
        count: citySubset.length,
        marksVal: aggMethod === 'mean' ? mean : aggMethod === 'sum' ? sum : max,
      };
    });
  };

  const groupedResult = getGroupedSummary();
  if (groupByCity) {
    pipelineHistory.push(`Grouped df.groupby("City")["Marks"].${aggMethod}()`);
  }

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
          <OperationsRecord size={20} style={{ color: 'var(--ds-cyan)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
            Interactive Data Manipulation Playground &amp; Pipeline Builder
          </h3>
        </div>
        <Button kind="ghost" size="sm" renderIcon={Reset} onClick={handleReset}>
          Reset Playground
        </Button>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Compose and execute your own custom data transformations. Watch the pipeline history stack update in real time and see the output DataFrame adapt instantly.
      </p>

      {/* Toolbar Controls Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.25rem',
        }}
      >
        {/* Filter Control */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '6px' }}>
            1. Filter Condition
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setFilterChoice('all')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: filterChoice === 'all' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: filterChoice === 'all' ? 'var(--ds-cyan-dim)' : 'transparent',
                color: filterChoice === 'all' ? 'var(--ds-cyan)' : 'inherit',
              }}
            >
              All Rows (No Filter)
            </button>
            <button
              onClick={() => setFilterChoice('marks80')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: filterChoice === 'marks80' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: filterChoice === 'marks80' ? 'var(--ds-cyan-dim)' : 'transparent',
                color: filterChoice === 'marks80' ? 'var(--ds-cyan)' : 'inherit',
              }}
            >
              Marks &gt; 80
            </button>
            <button
              onClick={() => setFilterChoice('att85')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: filterChoice === 'att85' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: filterChoice === 'att85' ? 'var(--ds-cyan-dim)' : 'transparent',
                color: filterChoice === 'att85' ? 'var(--ds-cyan)' : 'inherit',
              }}
            >
              Attendance &gt; 85%
            </button>
            <button
              onClick={() => setFilterChoice('mumbai')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: filterChoice === 'mumbai' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: filterChoice === 'mumbai' ? 'var(--ds-cyan-dim)' : 'transparent',
                color: filterChoice === 'mumbai' ? 'var(--ds-cyan)' : 'inherit',
              }}
            >
              City == &quot;Mumbai&quot;
            </button>
          </div>
        </div>

        {/* Sort Control */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)', textTransform: 'uppercase', marginBottom: '6px' }}>
            2. Sort Ordering
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setSortChoice('default')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: sortChoice === 'default' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: sortChoice === 'default' ? 'rgba(138, 63, 252, 0.15)' : 'transparent',
                color: sortChoice === 'default' ? 'var(--ds-purple)' : 'inherit',
              }}
            >
              Default Row Order
            </button>
            <button
              onClick={() => setSortChoice('marks_desc')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: sortChoice === 'marks_desc' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: sortChoice === 'marks_desc' ? 'rgba(138, 63, 252, 0.15)' : 'transparent',
                color: sortChoice === 'marks_desc' ? 'var(--ds-purple)' : 'inherit',
              }}
            >
              Marks ↓ (Descending)
            </button>
            <button
              onClick={() => setSortChoice('marks_asc')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: sortChoice === 'marks_asc' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: sortChoice === 'marks_asc' ? 'rgba(138, 63, 252, 0.15)' : 'transparent',
                color: sortChoice === 'marks_asc' ? 'var(--ds-purple)' : 'inherit',
              }}
            >
              Marks ↑ (Ascending)
            </button>
            <button
              onClick={() => setSortChoice('name_asc')}
              style={{
                padding: '5px 8px',
                borderRadius: '3px',
                textAlign: 'left',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: sortChoice === 'name_asc' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: sortChoice === 'name_asc' ? 'rgba(138, 63, 252, 0.15)' : 'transparent',
                color: sortChoice === 'name_asc' ? 'var(--ds-purple)' : 'inherit',
              }}
            >
              Name (A-Z)
            </button>
          </div>
        </div>

        {/* Feature Creation & GroupBy */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)', textTransform: 'uppercase', marginBottom: '6px' }}>
            3. Feature &amp; GroupBy
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Button
              size="sm"
              kind={addBonus ? 'primary' : 'tertiary'}
              onClick={() => setAddBonus(!addBonus)}
            >
              {addBonus ? '✓ Bonus (+5) Active' : '+ Bonus (+5)'}
            </Button>
            <Button
              size="sm"
              kind={addPassed ? 'primary' : 'tertiary'}
              onClick={() => setAddPassed(!addPassed)}
            >
              {addPassed ? '✓ Passed (>=75) Active' : '+ Passed (>=75)'}
            </Button>
            <Button
              size="sm"
              kind={groupByCity ? 'primary' : 'tertiary'}
              onClick={() => setGroupByCity(!groupByCity)}
            >
              {groupByCity ? '✓ GroupBy City Active' : 'Group by City'}
            </Button>
            {groupByCity && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                {(['mean', 'sum', 'max'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setAggMethod(m)}
                    style={{
                      padding: '3px 6px',
                      fontSize: '0.6875rem',
                      borderRadius: '3px',
                      border: aggMethod === m ? '1px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                      background: aggMethod === m ? 'rgba(36, 161, 72, 0.2)' : 'transparent',
                      color: 'var(--ds-text-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    .{m}()
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pipeline Operation History Stack */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderRadius: '4px',
          background: 'var(--cds-layer-02)',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '1.25rem',
          fontSize: '0.8125rem',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
          Data Pipeline Execution Stack:
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem' }}>
          {pipelineHistory.map((step, idx) => (
            <React.Fragment key={idx}>
              <span style={{ padding: '2px 6px', background: 'var(--ds-bg-core)', borderRadius: '3px', color: 'var(--ds-cyan)' }}>
                {step}
              </span>
              {idx < pipelineHistory.length - 1 && <span style={{ color: 'var(--ds-text-muted)' }}>➔</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Rendered Pipeline Output */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '4px',
          background: 'var(--ds-bg-core)',
          border: '1px solid var(--ds-border-subtle)',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)', textTransform: 'uppercase' }}>
            {groupByCity ? 'Aggregated GroupBy Summary Table' : `Transformed Dataset (${currentRows.length} Rows)`}
          </div>
          <Tag type="green" size="sm">Analysis Ready</Tag>
        </div>

        {groupByCity ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>City (Group Key)</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Student Count</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--ds-emerald)' }}>Marks ({aggMethod})</th>
              </tr>
            </thead>
            <tbody>
              {groupedResult.map((g) => (
                <tr key={g.city} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{g.city}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>{g.count}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'var(--ds-font-mono)', fontWeight: 700 }}>{g.marksVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Marks</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Attendance</th>
                {addBonus && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Bonus (+5)</th>}
                {addPassed && <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-purple)' }}>Passed</th>}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((r, idx) => (
                <tr key={r.name} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: '8px 12px' }}>{r.city}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>{r.marks}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)' }}>{r.attendance}%</td>
                  {addBonus && <td style={{ padding: '8px 12px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>{r.bonus}</td>}
                  {addPassed && <td style={{ padding: '8px 12px', color: 'var(--ds-purple)', fontWeight: 600 }}>{String(r.passed)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
