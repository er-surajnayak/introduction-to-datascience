'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  LogoInstagram,
  ShoppingCart,
  Education,
  CloudApp,
  Finance,
  CheckmarkFilled,
  Help,
  ArrowRight,
} from '@carbon/icons-react';

interface DomainExample {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  accent: string;
  description: string;
  items: {
    field: string;
    sampleValue: string;
    pythonType: string;
    dsType: string;
    nature: string;
  }[];
}

const domains: DomainExample[] = [
  {
    id: 'instagram',
    name: 'Instagram Feeds',
    icon: LogoInstagram,
    accent: '#a56eff',
    description: 'Social engagement, content media & follower telemetry',
    items: [
      { field: 'Likes Count', sampleValue: '14,820', pythonType: 'int', dsType: 'Numerical (Discrete)', nature: 'Count of user interactions' },
      { field: 'Post Caption', sampleValue: '"Sunset in Gokarna! #weekend"', pythonType: 'str', dsType: 'Text', nature: 'Unstructured natural language' },
      { field: 'Post Timestamp', sampleValue: '2026-09-24 17:45:00', pythonType: 'str / datetime', dsType: 'Datetime', nature: 'Temporal event coordinate' },
      { field: 'Is Verified Account', sampleValue: 'True', pythonType: 'bool', dsType: 'Boolean', nature: 'Binary verification status' },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon Store',
    icon: ShoppingCart,
    accent: '#f1c21b',
    description: 'E-commerce transactions, customer reviews & pricing catalogs',
    items: [
      { field: 'Product Price', sampleValue: '₹1,499.00', pythonType: 'float', dsType: 'Numerical (Continuous)', nature: 'Monetary measurement' },
      { field: 'Customer Rating', sampleValue: '4.6 / 5.0', pythonType: 'float', dsType: 'Numerical / Ordinal', nature: 'Ranked satisfaction metric' },
      { field: 'Category', sampleValue: '"Electronics"', pythonType: 'str', dsType: 'Categorical (Nominal)', nature: 'Unordered department group' },
      { field: 'Product ASIN (ID)', sampleValue: '"B08N5WRWNW"', pythonType: 'str', dsType: 'Identifier', nature: 'Unique SKU barcode key' },
    ],
  },
  {
    id: 'college',
    name: 'College ERP',
    icon: Education,
    accent: '#33b1ff',
    description: 'Student records, academic evaluation & department enrollments',
    items: [
      { field: 'USN / Student ID', sampleValue: '2026-CSE-104', pythonType: 'str', dsType: 'Identifier', nature: 'Unique entity identifier' },
      { field: 'Marks (out of 100)', sampleValue: '88', pythonType: 'int', dsType: 'Numerical (Discrete/Cont)', nature: 'Academic score measurement' },
      { field: 'Letter Grade', sampleValue: '"A+"', pythonType: 'str', dsType: 'Categorical (Ordinal)', nature: 'Ordered rank tier (A+ > A > B)' },
      { field: 'Department', sampleValue: '"Computer Science"', pythonType: 'str', dsType: 'Categorical (Nominal)', nature: 'Academic branch group' },
    ],
  },
  {
    id: 'weather',
    name: 'Weather Station',
    icon: CloudApp,
    accent: '#00b4a4',
    description: 'Environmental IoT sensors, meteorological telemetry & forecasts',
    items: [
      { field: 'Ambient Temperature', sampleValue: '28.63 °C', pythonType: 'float', dsType: 'Numerical (Continuous)', nature: 'Continuous physical variable' },
      { field: 'Relative Humidity', sampleValue: '72 %', pythonType: 'int', dsType: 'Numerical (Continuous)', nature: 'Percentage saturation scale' },
      { field: 'Precipitation Alert', sampleValue: 'False', pythonType: 'bool', dsType: 'Boolean', nature: 'Active rain warning indicator' },
      { field: 'Sensor Station ID', sampleValue: '"IXG-MET-09"', pythonType: 'str', dsType: 'Identifier', nature: 'Hardware telemetry label' },
    ],
  },
  {
    id: 'bank',
    name: 'Banking Gateway',
    icon: Finance,
    accent: '#24a148',
    description: 'Financial transactions, account balances & fraud detection',
    items: [
      { field: 'Transaction Amount', sampleValue: '₹12,450.50', pythonType: 'float', dsType: 'Numerical (Continuous)', nature: 'Financial currency flow' },
      { field: 'Account Number', sampleValue: '984729104857', pythonType: 'int / str', dsType: 'Identifier', nature: 'Routing key (Not a quantity!)' },
      { field: 'Payment Channel', sampleValue: '"UPI"', pythonType: 'str', dsType: 'Categorical (Nominal)', nature: 'UPI / NEFT / IMPS / Card' },
      { field: 'Is Fraudulent Flag', sampleValue: 'False', pythonType: 'bool', dsType: 'Boolean', nature: 'Supervised ML target label' },
    ],
  },
];

export function DataTypeEverywhereExplorer() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('instagram');
  const currentDomain = domains.find((d) => d.id === selectedDomainId) || domains[0];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Interactive 01
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Is Everywhere
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
          Real-World Data Classification
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Are All Pieces of Data the Same Kind of Data?
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Every modern digital system ingests millions of data points every second. Explore different real-world industries below to see how identical looking numbers or text strings represent entirely different analytical dimensions.
      </p>

      {/* Domain Selector Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {domains.map((dom) => {
          const isSelected = dom.id === selectedDomainId;
          const IconComp = dom.icon;
          return (
            <button
              key={dom.id}
              onClick={() => setSelectedDomainId(dom.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: isSelected ? `2px solid ${dom.accent}` : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-bg-surface-elevated)' : 'transparent',
                color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <IconComp size={18} style={{ color: dom.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: isSelected ? 600 : 400 }}>
                {dom.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Domain Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDomain.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              borderLeft: `4px solid ${currentDomain.accent}`,
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: currentDomain.accent, textTransform: 'uppercase', marginBottom: '4px' }}>
              Industry Domain
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              {currentDomain.name} — {currentDomain.description}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}
          >
            {currentDomain.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  background: 'var(--ds-bg-surface)',
                  borderRadius: '4px',
                  border: '1px solid var(--ds-border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                    {item.field}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.75rem',
                      background: 'var(--ds-bg-surface-elevated)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                      color: 'var(--ds-cyan)',
                    }}
                  >
                    {item.sampleValue}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
                  {item.nature}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px dashed var(--ds-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>
                    Python: <code style={{ color: 'var(--ds-text-secondary)' }}>{item.pythonType}</code>
                  </span>
                  <Tag type="cool-gray" size="sm" style={{ margin: 0 }}>
                    {item.dsType}
                  </Tag>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.25rem',
          background: 'var(--ds-cyan-dim)',
          border: '1px solid var(--ds-cyan)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <Help size={18} style={{ color: 'var(--ds-cyan)', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
          <strong>The Core Takeaway:</strong> A rating like <code>4.6</code>, a price like <code>₹1,499</code>, an account ID like <code>984729104857</code>, and a date like <code>2026-09-24</code> may all look like numbers or text strings to a programming compiler, but in Data Science they represent entirely distinct operational realities. Understanding this distinction is why we classify data.
        </div>
      </div>
    </div>
  );
}
