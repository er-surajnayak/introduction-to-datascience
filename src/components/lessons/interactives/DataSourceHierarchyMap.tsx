'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  CloudApp,
  Activity,
  DataBase,
  CheckmarkFilled,
  WarningAlt,
  Help,
  Information,
} from '@carbon/icons-react';

interface SourceNode {
  id: string;
  name: string;
  category: 'Online' | 'Physical' | 'Systems';
  provenance: 'Primary' | 'Secondary' | 'Both';
  whatItIs: string;
  example: string;
  typicalDataTypes: string[];
  potentialLimitations: string[];
  bestUseCases: string;
}

const sourceCatalog: SourceNode[] = [
  // ONLINE
  {
    id: 'apis',
    name: 'REST / Streaming APIs',
    category: 'Online',
    provenance: 'Secondary',
    whatItIs: 'Official programmatic gateways exposing structured JSON payloads over HTTP.',
    example: 'Open-Meteo weather API, AlphaVantage financial ticker feed.',
    typicalDataTypes: ['Numerical (Continuous/Discrete)', 'Datetime', 'Categorical (Nominal)'],
    potentialLimitations: [
      'Rate limiting (429 Too Many Requests)',
      'API authentication & paywalls',
      'Breaking schema updates by provider',
    ],
    bestUseCases: 'Live automated data ingestion with predictable, contract-backed schemas.',
  },
  {
    id: 'websites',
    name: 'Websites (Web Scraping)',
    category: 'Online',
    provenance: 'Secondary',
    whatItIs: 'Public HTML webpages designed for human browsing, parsed with tools like BeautifulSoup.',
    example: 'E-commerce price catalogs, real-estate listings, movie review archives.',
    typicalDataTypes: ['Unstructured Text', 'Categorical (Nominal/Ordinal)', 'Formatted Currency Strings'],
    potentialLimitations: [
      'Fragile to CSS/DOM redesigns',
      'Anti-scraping Cloudflare blocks & CAPTCHAs',
      'Potential Terms of Service / robots.txt legal risks',
    ],
    bestUseCases: 'Extracting valuable public data when no official API exists.',
  },
  {
    id: 'open_data',
    name: 'Open Data Repositories',
    category: 'Online',
    provenance: 'Secondary',
    whatItIs: 'Curated public portals publishing downloadable datasets in CSV, Parquet, or JSON.',
    example: 'data.gov, Kaggle Datasets, World Bank open economic records.',
    typicalDataTypes: ['Structured Tabular Matrices', 'Datetime', 'Categorical', 'Numerical'],
    potentialLimitations: [
      'Infrequent update cadence (stale data)',
      'Varied documentation quality and missing dictionaries',
      'Potential historical sampling bias',
    ],
    bestUseCases: 'Academic benchmarks, macroeconomic research, and machine learning training baselines.',
  },

  // PHYSICAL
  {
    id: 'surveys',
    name: 'Surveys & Questionnaires',
    category: 'Physical',
    provenance: 'Primary',
    whatItIs: 'Direct self-reported questionnaires administered to human participants.',
    example: 'Campus cafeteria satisfaction survey, employee engagement poll.',
    typicalDataTypes: ['Categorical (Ordinal: Likert scale)', 'Unstructured Text (Comments)', 'Categorical (Nominal)'],
    potentialLimitations: [
      'Response bias (only highly pleased or angry people reply)',
      'Subjective interpretation of questions',
      'Low response completion rates and missing answers',
    ],
    bestUseCases: 'Measuring human perception, opinions, satisfaction, and qualitative sentiment.',
  },
  {
    id: 'sensors',
    name: 'IoT Hardware Sensors',
    category: 'Physical',
    provenance: 'Primary',
    whatItIs: 'Physical transducers converting environmental phenomena into electrical telemetry.',
    example: 'Soil moisture sensors, hospital patient vital monitors, industrial vibration probes.',
    typicalDataTypes: ['Continuous Numerical (Voltage, Temp)', 'High-Frequency Datetime', 'Sensor Identifiers'],
    potentialLimitations: [
      'Hardware calibration drift over time',
      'Network dropouts causing missing timestamp gaps',
      'High noise ratio requiring rolling window smoothing',
    ],
    bestUseCases: 'Objective, real-time physical monitoring, predictive maintenance, and robotics.',
  },
  {
    id: 'experiments',
    name: 'Controlled Experiments / A/B Tests',
    category: 'Physical',
    provenance: 'Primary',
    whatItIs: 'Scientific trials where independent variables are systematically manipulated.',
    example: 'Clinical pharmaceutical trials, e-commerce checkout A/B button tests.',
    typicalDataTypes: ['Numerical (Conversion rates, Recovery days)', 'Boolean (Converted True/False)', 'Group (Control/Treatment)'],
    potentialLimitations: [
      'High cost and complex ethical compliance',
      'Hawthorne effect (participants alter behavior when watched)',
      'Requires strict statistical sample size power calculation',
    ],
    bestUseCases: 'Establishing definitive causal relationships (A causes B) rather than mere correlation.',
  },

  // SYSTEMS
  {
    id: 'databases',
    name: 'Relational Databases (SQL / NoSQL)',
    category: 'Systems',
    provenance: 'Primary',
    whatItIs: 'Core transactional data stores maintaining application records and operational entities.',
    example: 'PostgreSQL banking core, MongoDB user profile collection.',
    typicalDataTypes: ['Structured Columns', 'Primary/Foreign Identifiers', 'Datetime', 'Categorical', 'Numerical'],
    potentialLimitations: [
      'Access requires read-replica permission to prevent locking production',
      'Complex entity-relationship joins across 20+ tables',
      'PII (Personally Identifiable Information) data masking required',
    ],
    bestUseCases: 'High-integrity, ACID-compliant historical business records and ground-truth metrics.',
  },
  {
    id: 'logs',
    name: 'Server & Application Logs',
    category: 'Systems',
    provenance: 'Primary',
    whatItIs: 'Continuous semi-structured chronological event text files generated by running software.',
    example: 'Nginx web server access logs, Kubernetes pod error traces.',
    typicalDataTypes: ['Semi-Structured Text', 'Datetime Timestamps', 'IP Address Identifiers', 'HTTP Status Codes'],
    potentialLimitations: [
      'Enormous file volume (gigabytes per hour)',
      'Requires regex parsing and log aggregation pipelines (Elasticsearch)',
      'High proportion of routine informational noise',
    ],
    bestUseCases: 'Cybersecurity anomaly detection, infrastructure debugging, and user clickstream reconstruction.',
  },
  {
    id: 'transactions',
    name: 'Transactional Event Streams',
    category: 'Systems',
    provenance: 'Primary',
    whatItIs: 'Real-time event logs of completed business exchanges.',
    example: 'Point-of-Sale (POS) cash register records, UPI payment gateway receipts.',
    typicalDataTypes: ['Numerical (Currency Amount)', 'Datetime (Timestamp)', 'Identifiers (MerchantID, TxnID)'],
    potentialLimitations: [
      'Must reconcile refunds, cancellations, and chargebacks',
      'Temporal spikes during flash sales and holidays',
    ],
    bestUseCases: 'Revenue forecasting, fraud detection, and inventory reconciliation.',
  },
];

export function DataSourceHierarchyMap() {
  const [selectedSourceId, setSelectedSourceId] = useState<string>('apis');
  const [provenanceFilter, setProvenanceFilter] = useState<'All' | 'Primary' | 'Secondary'>('All');

  const selectedSource = sourceCatalog.find((s) => s.id === selectedSourceId) || sourceCatalog[0];

  const onlineSources = sourceCatalog.filter((s) => s.category === 'Online');
  const physicalSources = sourceCatalog.filter((s) => s.category === 'Physical');
  const systemsSources = sourceCatalog.filter((s) => s.category === 'Systems');

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
          <Tag type="magenta" size="md">
            Interactive 05
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Source Architecture Map
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Provenance Filter:</span>
          {(['All', 'Primary', 'Secondary'] as const).map((prov) => (
            <button
              key={prov}
              onClick={() => setProvenanceFilter(prov)}
              style={{
                padding: '3px 8px',
                fontSize: '0.6875rem',
                borderRadius: '2px',
                border: provenanceFilter === prov ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: provenanceFilter === prov ? 'var(--ds-cyan-dim)' : 'transparent',
                color: provenanceFilter === prov ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                cursor: 'pointer',
              }}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Where Does Data Originate? Explore the Source Ecosystem
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Data originates across three core operational realms: <strong>Online Feeds</strong>, <strong>Physical Captures</strong>, and <strong>Internal Enterprise Systems</strong>. Click any node below to inspect its data types, engineering advantages, and potential quality limitations.
      </p>

      {/* 3-Column Source Hierarchy Map */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '14px',
          marginBottom: '1.5rem',
        }}
      >
        {/* ONLINE REALM */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <CloudApp size={18} style={{ color: 'var(--ds-cyan)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              1. Online Feeds
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {onlineSources.map((src) => {
              const isSelected = src.id === selectedSourceId;
              const isDimmed = provenanceFilter !== 'All' && src.provenance !== provenanceFilter;
              return (
                <button
                  key={src.id}
                  onClick={() => setSelectedSourceId(src.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                    color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    opacity: isDimmed ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: isSelected ? 600 : 400 }}>
                    {src.name}
                  </span>
                  <Tag type="cool-gray" size="sm" style={{ margin: 0 }}>
                    {src.provenance}
                  </Tag>
                </button>
              );
            })}
          </div>
        </div>

        {/* PHYSICAL REALM */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Activity size={18} style={{ color: 'var(--ds-purple)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              2. Physical Captures
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {physicalSources.map((src) => {
              const isSelected = src.id === selectedSourceId;
              const isDimmed = provenanceFilter !== 'All' && src.provenance !== provenanceFilter;
              return (
                <button
                  key={src.id}
                  onClick={() => setSelectedSourceId(src.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: isSelected ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                    background: isSelected ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                    color: isSelected ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    opacity: isDimmed ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: isSelected ? 600 : 400 }}>
                    {src.name}
                  </span>
                  <Tag type="purple" size="sm" style={{ margin: 0 }}>
                    {src.provenance}
                  </Tag>
                </button>
              );
            })}
          </div>
        </div>

        {/* SYSTEMS REALM */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <DataBase size={18} style={{ color: 'var(--ds-teal)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              3. Internal Systems
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {systemsSources.map((src) => {
              const isSelected = src.id === selectedSourceId;
              const isDimmed = provenanceFilter !== 'All' && src.provenance !== provenanceFilter;
              return (
                <button
                  key={src.id}
                  onClick={() => setSelectedSourceId(src.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: isSelected ? '2px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
                    background: isSelected ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface)',
                    color: isSelected ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    opacity: isDimmed ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: isSelected ? 600 : 400 }}>
                    {src.name}
                  </span>
                  <Tag type="teal" size="sm" style={{ margin: 0 }}>
                    {src.provenance}
                  </Tag>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Source Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSource.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              padding: '1.5rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                  {selectedSource.category} Realm • {selectedSource.provenance} Data
                </span>
                <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {selectedSource.name}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <Tag type="cyan" size="md">
                  {selectedSource.category}
                </Tag>
                <Tag type={selectedSource.provenance === 'Primary' ? 'green' : 'cool-gray'} size="md">
                  {selectedSource.provenance}
                </Tag>
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              <strong>What it is:</strong> {selectedSource.whatItIs}
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', marginBottom: '1.25rem' }}>
              <strong>Real-World Example:</strong> <code style={{ color: 'var(--ds-cyan)' }}>{selectedSource.example}</code>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {/* Typical Data Types */}
              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-emerald)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '6px' }}>
                  Typical Data Types Generated
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedSource.typicalDataTypes.map((t, i) => (
                    <div key={i} style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckmarkFilled size={12} style={{ color: 'var(--ds-emerald)' }} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Limitations */}
              <div style={{ padding: '12px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-amber)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '6px' }}>
                  Potential Limitations & Failure Modes
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedSource.potentialLimitations.map((lim, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <WarningAlt size={12} style={{ color: 'var(--ds-amber)', marginTop: '2px', flexShrink: 0 }} />
                      <span>{lim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
