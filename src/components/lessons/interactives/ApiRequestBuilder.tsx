'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Send,
  CloudMonitoring,
  Laptop,
  DataBase,
  CheckmarkOutline,
  Time,
  Renew,
} from '@carbon/icons-react';

interface EndpointConfig {
  endpoint: string;
  name: string;
  method: 'GET';
  paramKey: string;
  paramOptions: string[];
  description: string;
  responses: Record<string, Record<string, any>>;
}

const endpointCatalog: Record<string, EndpointConfig> = {
  '/weather': {
    endpoint: '/v1/weather',
    name: 'Meteorological Telemetry',
    method: 'GET',
    paramKey: 'city',
    paramOptions: ['Belagavi', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai'],
    description: 'Returns real-time temperature, humidity, and atmospheric conditions.',
    responses: {
      Belagavi: {
        city: 'Belagavi',
        temperature: 28.2,
        humidity: 72,
        condition: 'Cloudy',
        wind_speed_kmh: 14.1,
        station_id: 'IXG-MET-01',
      },
      Mumbai: {
        city: 'Mumbai',
        temperature: 31.4,
        humidity: 84,
        condition: 'Humid Haze',
        wind_speed_kmh: 19.5,
        station_id: 'BOM-MET-04',
      },
      Delhi: {
        city: 'Delhi',
        temperature: 34.1,
        humidity: 45,
        condition: 'Sunny',
        wind_speed_kmh: 9.8,
        station_id: 'DEL-MET-02',
      },
      Bengaluru: {
        city: 'Bengaluru',
        temperature: 25.6,
        humidity: 68,
        condition: 'Scattered Showers',
        wind_speed_kmh: 12.0,
        station_id: 'BLR-MET-07',
      },
      Chennai: {
        city: 'Chennai',
        temperature: 30.8,
        humidity: 79,
        condition: 'Partly Cloudy',
        wind_speed_kmh: 16.3,
        station_id: 'MAA-MET-03',
      },
    },
  },
  '/air-quality': {
    endpoint: '/v1/air-quality',
    name: 'Pollution Index',
    method: 'GET',
    paramKey: 'city',
    paramOptions: ['Delhi', 'Mumbai', 'Belagavi', 'Bengaluru'],
    description: 'Delivers particulate matter (PM2.5, PM10) and Air Quality Index (AQI).',
    responses: {
      Delhi: {
        city: 'Delhi',
        aqi: 218,
        category: 'Poor',
        pm2_5: 142.4,
        pm10: 220.1,
        primary_pollutant: 'PM2.5',
      },
      Mumbai: {
        city: 'Mumbai',
        aqi: 112,
        category: 'Moderate',
        pm2_5: 41.2,
        pm10: 89.0,
        primary_pollutant: 'PM10',
      },
      Belagavi: {
        city: 'Belagavi',
        aqi: 48,
        category: 'Good',
        pm2_5: 11.5,
        pm10: 32.8,
        primary_pollutant: 'O3',
      },
      Bengaluru: {
        city: 'Bengaluru',
        aqi: 65,
        category: 'Satisfactory',
        pm2_5: 18.2,
        pm10: 44.0,
        primary_pollutant: 'NO2',
      },
    },
  },
  '/stock-quotes': {
    endpoint: '/v1/stocks',
    name: 'Financial Exchange Telemetry',
    method: 'GET',
    paramKey: 'symbol',
    paramOptions: ['INFY', 'TCS', 'RELIANCE', 'WIPRO'],
    description: 'Retrieves live bid, ask, and day volume for equity tickers.',
    responses: {
      INFY: {
        symbol: 'INFY',
        exchange: 'NSE',
        price_inr: 1842.50,
        day_change_percent: 1.45,
        volume: 4892011,
      },
      TCS: {
        symbol: 'TCS',
        exchange: 'NSE',
        price_inr: 4120.00,
        day_change_percent: -0.32,
        volume: 1845012,
      },
      RELIANCE: {
        symbol: 'RELIANCE',
        exchange: 'NSE',
        price_inr: 2980.75,
        day_change_percent: 0.88,
        volume: 6291004,
      },
      WIPRO: {
        symbol: 'WIPRO',
        exchange: 'NSE',
        price_inr: 540.20,
        day_change_percent: 2.10,
        volume: 3210984,
      },
    },
  },
};

export function ApiRequestBuilder() {
  const [selectedEndpointKey, setSelectedEndpointKey] = useState<string>('/weather');
  const currentCatalog = endpointCatalog[selectedEndpointKey];

  const [selectedParamValue, setSelectedParamValue] = useState<string>(currentCatalog.paramOptions[0]);
  const [includeUnitsParam, setIncludeUnitsParam] = useState(true);

  // Request simulation state
  const [flowState, setFlowState] = useState<'idle' | 'sending' | 'processing' | 'receiving' | 'complete'>('idle');
  const [responsePayload, setResponsePayload] = useState<Record<string, any> | null>(
    currentCatalog.responses[currentCatalog.paramOptions[0]]
  );
  const [latencyMs, setLatencyMs] = useState(42);

  const fullUrl = `https://api.datascience.org${currentCatalog.endpoint}?${currentCatalog.paramKey}=${selectedParamValue}${
    includeUnitsParam && selectedEndpointKey === '/weather' ? '&units=metric' : ''
  }`;

  const handleEndpointChange = (newKey: string) => {
    setSelectedEndpointKey(newKey);
    const newCatalog = endpointCatalog[newKey];
    setSelectedParamValue(newCatalog.paramOptions[0]);
    setResponsePayload(newCatalog.responses[newCatalog.paramOptions[0]]);
    setFlowState('idle');
  };

  const handleSendRequest = () => {
    setFlowState('sending');
    const randomLatency = Math.floor(35 + Math.random() * 30);
    setLatencyMs(randomLatency);

    setTimeout(() => {
      setFlowState('processing');
    }, 400);

    setTimeout(() => {
      setFlowState('receiving');
    }, 800);

    setTimeout(() => {
      setFlowState('complete');
      const baseResponse = currentCatalog.responses[selectedParamValue] || {};
      if (selectedEndpointKey === '/weather' && includeUnitsParam) {
        setResponsePayload({ ...baseResponse, units: 'metric' });
      } else {
        setResponsePayload(baseResponse);
      }
    }, 1200);
  };

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
      {/* Header */}
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
            Interactive Experience 2
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            API Request Builder & Flow Visualizer
          </h3>
        </div>
        <Tag type="blue" size="md">
          Live REST Simulation
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Configure an HTTP request by selecting an <strong>endpoint</strong>, HTTP <strong>method</strong>, and <strong>query parameters</strong>. Click <em>Send Request</em> to watch the packet journey across the client-server boundary and inspect the returned JSON response.
      </p>

      {/* Control Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
          background: 'var(--cds-layer-01)',
          padding: '1.25rem',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        {/* Endpoint Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
            1. Resource Endpoint
          </label>
          <select
            value={selectedEndpointKey}
            onChange={(e) => handleEndpointChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              background: 'var(--cds-field-01)',
              color: 'var(--ds-text-primary)',
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
            }}
          >
            <option value="/weather">/v1/weather (Weather)</option>
            <option value="/air-quality">/v1/air-quality (Pollution)</option>
            <option value="/stock-quotes">/v1/stocks (Market)</option>
          </select>
        </div>

        {/* Method */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
            2. HTTP Method
          </label>
          <div
            style={{
              padding: '0.625rem 0.75rem',
              background: 'var(--cds-field-01)',
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 700 }}>GET</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>Safe Read</span>
          </div>
        </div>

        {/* Query Parameter Value */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
            3. Parameter ({currentCatalog.paramKey})
          </label>
          <select
            value={selectedParamValue}
            onChange={(e) => {
              setSelectedParamValue(e.target.value);
              setFlowState('idle');
            }}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              background: 'var(--cds-field-01)',
              color: 'var(--ds-text-primary)',
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
            }}
          >
            {currentCatalog.paramOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Action */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button
            kind="primary"
            size="md"
            renderIcon={flowState === 'sending' || flowState === 'processing' || flowState === 'receiving' ? Renew : Send}
            disabled={flowState === 'sending' || flowState === 'processing' || flowState === 'receiving'}
            onClick={handleSendRequest}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {flowState === 'sending' || flowState === 'processing' || flowState === 'receiving'
              ? 'Transmitting...'
              : 'Send Request'}
          </Button>
        </div>
      </div>

      {/* Formulated URL Bar */}
      <div
        style={{
          padding: '0.75rem 1rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--ds-text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '1.5rem',
          borderLeft: '4px solid var(--ds-cyan)',
          overflowX: 'auto',
        }}
      >
        <span style={{ color: 'var(--ds-emerald)', fontWeight: 700, flexShrink: 0 }}>GET</span>
        <span style={{ color: 'var(--ds-text-secondary)', wordBreak: 'break-all' }}>{fullUrl}</span>
      </div>

      {/* Animated Request-Response Pipeline Flow */}
      <div
        style={{
          padding: '1.5rem 1rem',
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            maxWidth: '650px',
            margin: '0 auto',
            gap: '1rem',
          }}
        >
          {/* Node 1: Client Laptop */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              minWidth: '80px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: flowState === 'idle' || flowState === 'complete' ? 'var(--ds-cyan)' : 'var(--cds-layer-03)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: flowState === 'sending' ? '0 0 12px var(--ds-cyan)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <Laptop size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginTop: '6px' }}>
              Your Client
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Python App</span>
          </div>

          {/* Connection Pipe (Outbound / Inbound) */}
          <div
            style={{
              flexGrow: 1,
              height: '4px',
              background: 'var(--cds-layer-03)',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {flowState === 'sending' && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  width: '40%',
                  height: '100%',
                  background: 'var(--ds-cyan)',
                  boxShadow: '0 0 8px var(--ds-cyan)',
                }}
              />
            )}
            {flowState === 'receiving' && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  width: '40%',
                  height: '100%',
                  background: 'var(--ds-emerald)',
                  boxShadow: '0 0 8px var(--ds-emerald)',
                }}
              />
            )}
          </div>

          {/* Node 2: API Gateway / Server */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              minWidth: '80px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: flowState === 'processing' ? 'var(--ds-purple)' : 'var(--cds-layer-03)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: flowState === 'processing' ? '0 0 12px var(--ds-purple)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <CloudMonitoring size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginTop: '6px' }}>
              API Server
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>REST Gateway</span>
          </div>

          {/* Connection Pipe to Database */}
          <div
            style={{
              flexGrow: 1,
              height: '4px',
              background: 'var(--cds-layer-03)',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {flowState === 'processing' && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--ds-purple)',
                }}
              />
            )}
          </div>

          {/* Node 3: Backend Database */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              minWidth: '80px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: flowState === 'processing' ? 'var(--ds-purple)' : 'var(--cds-layer-03)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <DataBase size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginTop: '6px' }}>
              Database
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Internal Data</span>
          </div>
        </div>

        {/* Status Indicator Sub-text */}
        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem' }}>
          {flowState === 'idle' && (
            <span style={{ color: 'var(--ds-text-muted)' }}>Ready. Click &quot;Send Request&quot; to execute.</span>
          )}
          {flowState === 'sending' && (
            <span style={{ color: 'var(--ds-cyan)', fontWeight: 600 }}>
              1. Sending HTTP GET packet across the network...
            </span>
          )}
          {flowState === 'processing' && (
            <span style={{ color: 'var(--ds-purple)', fontWeight: 600 }}>
              2. Server verified route, querying records for {selectedParamValue}...
            </span>
          )}
          {flowState === 'receiving' && (
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>
              3. Packaging JSON payload and returning HTTP 200 OK...
            </span>
          )}
          {flowState === 'complete' && (
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>
              ✓ Complete! Received 200 OK in {latencyMs} ms.
            </span>
          )}
        </div>
      </div>

      {/* Returned JSON Response Viewer */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'var(--cds-layer-02)',
            borderBottom: '1px solid var(--ds-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
              Server Response Body (Content-Type: application/json)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag type="green" size="sm">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckmarkOutline size={12} /> 200 OK
              </span>
            </Tag>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Time size={12} /> {latencyMs}ms
            </span>
          </div>
        </div>

        <pre
          style={{
            margin: 0,
            padding: '1.25rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--ds-text-primary)',
            background: 'var(--cds-field-01)',
            overflowX: 'auto',
          }}
        >
          <code>{JSON.stringify(responsePayload, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
