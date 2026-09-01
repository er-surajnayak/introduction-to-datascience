'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider } from '@carbon/react';
import { Lightning, DataStructured } from '@carbon/icons-react';

export function NumpyVectorizationBenchmark() {
  const [dataSize, setDataSize] = useState<number>(100000);
  const [rowStart, setRowStart] = useState<number>(0);
  const [rowEnd, setRowEnd] = useState<number>(2);
  const [colStart, setColStart] = useState<number>(1);
  const [colEnd, setColEnd] = useState<number>(3);

  // 4x4 sample matrix
  const matrix = [
    [12, 24, 36, 48],
    [15, 30, 45, 60],
    [18, 36, 54, 72],
    [21, 42, 63, 84],
  ];

  // Benchmark stats approximations based on array size
  const pythonTimeMs = (dataSize / 10000) * 3.8;
  const numpyTimeMs = (dataSize / 10000) * 0.042;
  const speedup = (pythonTimeMs / numpyTimeMs).toFixed(0);

  const pythonMemoryMb = ((dataSize * 8 * 8) / (1024 * 1024)).toFixed(2);
  const numpyMemoryMb = ((dataSize * 8) / (1024 * 1024)).toFixed(2);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Interactive Lab 1.7
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            NumPy Vectorization Benchmark & 2D Matrix Slicer
          </h3>
        </div>
        <Tag type="cyan" size="md">
          SIMD Accelerated
        </Tag>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Explore why NumPy executes array mathematics ~90x faster than standard Python loops, and practice 2D multidimensional array slicing syntax.
      </p>

      {/* Part 1: Vectorization Speed Test */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ds-text-primary)' }}>
            Part 1: Vector Addition Benchmark (N = {dataSize.toLocaleString()} Elements)
          </div>
          <Tag type="teal" size="sm">
            Speedup: ~{speedup}x Faster
          </Tag>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {[10000, 100000, 1000000].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setDataSize(size)}
              style={{
                padding: '6px 12px',
                background: dataSize === size ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                border: dataSize === size ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '3px',
                color: dataSize === size ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              N = {size.toLocaleString()}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Python Loop */}
          <div
            style={{
              padding: '1rem',
              background: 'var(--ds-bg-surface)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#fa4d56', fontWeight: 600, marginBottom: '4px' }}>
              Standard Python <code>for</code> Loop
            </div>
            <div style={{ fontSize: '1.25rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
              {pythonTimeMs.toFixed(2)} ms
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
              RAM Footprint: ~{pythonMemoryMb} MB (Object pointers)
            </div>
          </div>

          {/* NumPy Vectorized */}
          <div
            style={{
              padding: '1rem',
              background: 'var(--ds-bg-surface)',
              border: '1.5px solid var(--ds-cyan)',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
              NumPy Vectorized (<code>arr1 + arr2</code>)
            </div>
            <div style={{ fontSize: '1.25rem', fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)' }}>
              {numpyTimeMs.toFixed(3)} ms
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginTop: '4px' }}>
              RAM Footprint: ~{numpyMemoryMb} MB (Contiguous buffer)
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive 2D Matrix Slicer */}
      <div>
        <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>
          Part 2: Interactive 2D Matrix Slicer (<code>matrix[row_slice, col_slice]</code>)
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              <Slider
                id="row-start"
                labelText={`Row Start: ${rowStart}`}
                min={0}
                max={3}
                step={1}
                hideTextInput
                value={rowStart}
                onChange={({ value }) => setRowStart(Math.min(value, rowEnd - 1))}
              />
              <Slider
                id="row-end"
                labelText={`Row End: ${rowEnd}`}
                min={1}
                max={4}
                step={1}
                hideTextInput
                value={rowEnd}
                onChange={({ value }) => setRowEnd(Math.max(value, rowStart + 1))}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              <Slider
                id="col-start"
                labelText={`Col Start: ${colStart}`}
                min={0}
                max={3}
                step={1}
                hideTextInput
                value={colStart}
                onChange={({ value }) => setColStart(Math.min(value, colEnd - 1))}
              />
              <Slider
                id="col-end"
                labelText={`Col End: ${colEnd}`}
                min={1}
                max={4}
                step={1}
                hideTextInput
                value={colEnd}
                onChange={({ value }) => setColEnd(Math.max(value, colStart + 1))}
              />
            </div>

            <div
              style={{
                padding: '10px 14px',
                background: 'var(--ds-bg-surface-elevated)',
                border: '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.875rem',
                color: 'var(--ds-cyan)',
              }}
            >
              Python Syntax: <strong>matrix[{rowStart}:{rowEnd}, {colStart}:{colEnd}]</strong>
            </div>
          </div>

          {/* 4x4 Matrix Visual Grid */}
          <div
            style={{
              padding: '1rem',
              background: 'var(--ds-bg-surface)',
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              maxWidth: '280px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '6px',
              }}
            >
              {matrix.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const isSelected =
                    rIdx >= rowStart && rIdx < rowEnd && cIdx >= colStart && cIdx < colEnd;

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      style={{
                        padding: '12px 6px',
                        background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                        border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                        borderRadius: '3px',
                        textAlign: 'center',
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.875rem',
                        fontWeight: isSelected ? 700 : 400,
                        color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {val}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
