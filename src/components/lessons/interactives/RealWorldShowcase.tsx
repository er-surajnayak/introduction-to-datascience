'use client';

import React, { useState } from 'react';
import { Tag } from '@carbon/react';
import {
  Devices,
  Location,
  Restaurant,
  Wallet,
  Activity,
  Education,
  AudioConsole,
} from '@carbon/icons-react';

type ShowcaseKey = 'netflix' | 'spotify' | 'maps' | 'food' | 'banking' | 'cricket' | 'college';

export function RealWorldShowcase() {
  const [selectedKey, setSelectedKey] = useState<ShowcaseKey>('netflix');

  const showcaseItems: Record<
    ShowcaseKey,
    {
      name: string;
      icon: React.ReactNode;
      question: string;
      dataCollected: string;
      dataScienceTechnique: string;
      realWorldAction: string;
    }
  > = {
    netflix: {
      name: 'Netflix',
      icon: <Devices size={20} />,
      question: 'What movie or TV show will keep the viewer engaged tonight?',
      dataCollected: 'Watch duration, pause/rewind timestamps, device type, search queries, ratings, time of day.',
      dataScienceTechnique: 'Collaborative Filtering, Matrix Factorization, Dynamic Thumbnail Personalization.',
      realWorldAction: 'Ranks and serves personalized content rails and custom artwork tailored to individual taste profiles.',
    },
    spotify: {
      name: 'Spotify',
      icon: <AudioConsole size={20} />,
      question: 'What new song matches the listener’s current mood and acoustic preferences?',
      dataCollected: 'Audio spectrograms (danceability, acousticness, tempo BPM), playlist adds, 30-second skip rates.',
      dataScienceTechnique: 'Convolutional audio feature extraction & K-Nearest Neighbor similarity embedding.',
      realWorldAction: 'Generates the "Discover Weekly" playlist refreshed every Monday for 600+ million users.',
    },
    maps: {
      name: 'Google Maps',
      icon: <Location size={20} />,
      question: 'Which route is fastest right now considering live and upcoming traffic?',
      dataCollected: 'GPS telemetry from millions of active smartphones, historical day-of-week road speeds, construction alerts.',
      dataScienceTechnique: 'Graph Neural Networks, Dijkstra dynamic edge weighting, time-series velocity forecasting.',
      realWorldAction: 'Dynamically re-routes drivers around developing traffic jams in real time, saving billions of travel hours.',
    },
    food: {
      name: 'Food Delivery (Swiggy / Zomato)',
      icon: <Restaurant size={20} />,
      question: 'What is the precise delivery ETA and how should couriers be assigned?',
      dataCollected: 'Restaurant kitchen prep logs, driver GPS coordinates, weather radar feeds, traffic choke points.',
      dataScienceTechnique: 'Gradient Boosted Trees (XGBoost) for ETA prediction, Bipartite Matching for dispatch.',
      realWorldAction: 'Batches nearby orders and dispatches delivery partners precisely as food leaves the kitchen.',
    },
    banking: {
      name: 'UPI & Banking Fraud',
      icon: <Wallet size={20} />,
      question: 'Is this sudden ₹50,000 transaction legitimate or an unauthorized account takeover?',
      dataCollected: 'Device fingerprint, geolocation IP, transaction velocity (5 txns in 2 mins), recipient risk score.',
      dataScienceTechnique: 'Isolation Forests & Autoencoders for millisecond anomaly detection.',
      realWorldAction: 'Blocks suspicious payments in under 50 milliseconds before funds leave the account, requesting OTP verification.',
    },
    cricket: {
      name: 'Cricket Analytics (IPL)',
      icon: <Activity size={20} />,
      question: 'Which bowler matchup maximizes wicket probability against a specific batsman?',
      dataCollected: 'Hawkeye ball tracking (release speed, seam angle, pitch point, deviation), batsman wagon wheels.',
      dataScienceTechnique: 'Bayesian matchup modeling, pitch degradation clustering, survival analysis.',
      realWorldAction: 'Coaches adjust field placements and bowling changes during strategic timeouts.',
    },
    college: {
      name: 'College Student Success',
      icon: <Education size={20} />,
      question: 'Which students may need academic intervention before mid-term exams?',
      dataCollected: 'LMS login frequency, assignment completion rates, mock test scores, library card check-ins.',
      dataScienceTechnique: 'Logistic Regression risk scoring, cohort clustering, early-warning classification.',
      realWorldAction: 'Advisors schedule personalized tutoring sessions 4 weeks prior to semester exams.',
    },
  };

  const curr = showcaseItems[selectedKey];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Experience 4
          </span>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            Data Science in the Real World: Beyond the Notebook
          </h3>
        </div>
        <Tag type="purple" size="md">Everyday Systems</Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Data Science is not an academic theory confined to a classroom—it is the operational nervous system powering modern digital society.
      </p>

      {/* Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {(['netflix', 'spotify', 'maps', 'food', 'banking', 'cricket', 'college'] as ShowcaseKey[]).map((k) => {
          const item = showcaseItems[k];
          const isSel = selectedKey === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setSelectedKey(k)}
              style={{
                padding: '10px 8px',
                background: isSel ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
                border: isSel ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: isSel ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                fontWeight: isSel ? 600 : 400,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Showcase Profile */}
      <div
        style={{
          padding: '1.75rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <Tag type="cyan" size="md">
            {curr.name} Case Study
          </Tag>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            &ldquo;{curr.question}&rdquo;
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div
            style={{
              padding: '1rem',
              background: 'var(--cds-layer-01)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              1. Telemetry / Data Collected
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              {curr.dataCollected}
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              background: 'var(--cds-layer-01)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
              2. Data Science Technique
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              {curr.dataScienceTechnique}
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              background: 'var(--cds-layer-01)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--ds-emerald)', textTransform: 'uppercase', marginBottom: '4px' }}>
              3. Automated Real-World Action
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              {curr.realWorldAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
