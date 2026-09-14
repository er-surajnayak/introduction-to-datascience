'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  User,
  Restaurant,
  DeliveryTruck,
  DataBase,
  ArrowRight,
  CheckmarkFilled,
  Information,
  Play,
  Restart,
} from '@carbon/icons-react';

interface AnalogyStep {
  stepNum: number;
  title: string;
  restaurantRole: string;
  softwareRole: string;
  restaurantDetail: string;
  softwareDetail: string;
  activeEntity: 'customer' | 'waiter' | 'kitchen' | 'food';
}

const steps: AnalogyStep[] = [
  {
    stepNum: 1,
    title: '1. Ordering from the Menu',
    restaurantRole: 'Dining Customer (You)',
    softwareRole: 'Your Python Script or Client App',
    restaurantDetail: 'You look at the menu choices and state: "I want the special salad with no onions."',
    softwareDetail: 'Your app selects an endpoint and formulates a request: GET /weather?city=Belagavi&units=metric.',
    activeEntity: 'customer',
  },
  {
    stepNum: 2,
    title: '2. Carrying the Request',
    restaurantRole: 'The Waiter (The Messenger)',
    softwareRole: 'The API (Application Programming Interface)',
    restaurantDetail: 'The waiter takes your exact order and carries it securely to the kitchen doors.',
    softwareDetail: 'The API routes your request across the network, verifying headers, parameters, and credentials.',
    activeEntity: 'waiter',
  },
  {
    stepNum: 3,
    title: '3. Cooking in the Kitchen',
    restaurantRole: 'The Kitchen & Chefs',
    softwareRole: 'Remote Server & Private Database',
    restaurantDetail: 'The chefs access refrigerators and stoves (private kitchen) to prepare your dish.',
    softwareDetail: 'The backend server queries its internal SQL/NoSQL databases and calculates the latest readings.',
    activeEntity: 'kitchen',
  },
  {
    stepNum: 4,
    title: '4. Delivering the Dish',
    restaurantRole: 'The Finished Meal on a Plate',
    softwareRole: 'The JSON Response (Structured Data)',
    restaurantDetail: 'The waiter carries a covered plate containing your freshly prepared food back to your table.',
    softwareDetail: 'The server returns an HTTP 200 OK response carrying a structured JSON payload ready for analysis.',
    activeEntity: 'food',
  },
];

export function ApiRestaurantAnalogy() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const currentStep = steps[activeStepIdx];

  const handleNext = () => {
    setActiveStepIdx((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStepIdx((prev) => (prev - 1 + steps.length) % steps.length);
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
            Interactive Experience 1
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            The Restaurant Analogy: Customer, Waiter, Kitchen & Meal
          </h3>
        </div>
        <Tag type="teal" size="md">
          Conceptual Mental Model
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        You cannot walk directly into a private restaurant kitchen to raid the refrigerator. Similarly, an application cannot reach directly into a remote company&apos;s internal database. An <strong>API is the waiter</strong> that safely negotiates your request and delivers the data.
      </p>

      {/* 4 Interactive Visual Nodes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '2rem',
        }}
      >
        {[
          { id: 'customer', label: 'Customer', sub: 'Client App', icon: User, step: 0 },
          { id: 'waiter', label: 'Waiter', sub: 'The API', icon: DeliveryTruck, step: 1 },
          { id: 'kitchen', label: 'Kitchen', sub: 'Server / DB', icon: DataBase, step: 2 },
          { id: 'food', label: 'Meal Delivered', sub: 'JSON Response', icon: Restaurant, step: 3 },
        ].map((node) => {
          const IconComp = node.icon;
          const isActive = currentStep.activeEntity === node.id;
          const isPassed = activeStepIdx >= node.step;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveStepIdx(node.step)}
              style={{
                background: isActive
                  ? 'var(--ds-cyan-dim)'
                  : isPassed
                  ? 'var(--cds-layer-02)'
                  : 'var(--cds-layer-01)',
                border: isActive
                  ? '2px solid var(--ds-cyan)'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                padding: '1rem 0.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--ds-cyan)' : 'var(--cds-layer-03)',
                  color: isActive ? '#ffffff' : 'var(--ds-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
              >
                <IconComp size={20} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                {node.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', marginTop: '2px' }}>
                {node.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Comparison Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.stepNum}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'var(--cds-layer-01)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              {currentStep.title}
            </h4>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
              Step {currentStep.stepNum} of 4
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* Restaurant Side */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                borderLeft: '3px solid #ff832b',
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#ff832b', fontWeight: 600, marginBottom: '4px' }}>
                Restaurant Metaphor: {currentStep.restaurantRole}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {currentStep.restaurantDetail}
              </p>
            </div>

            {/* Software Engineering Side */}
            <div
              style={{
                padding: '1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                borderLeft: '3px solid var(--ds-cyan)',
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                Software Reality: {currentStep.softwareRole}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {currentStep.softwareDetail}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls & Critical Distinction Callout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            kind="secondary"
            size="sm"
            onClick={handlePrev}
            disabled={activeStepIdx === 0}
          >
            Previous
          </Button>
          <Button
            kind="primary"
            size="sm"
            renderIcon={activeStepIdx === steps.length - 1 ? Restart : ArrowRight}
            onClick={handleNext}
          >
            {activeStepIdx === steps.length - 1 ? 'Restart Cycle' : 'Next Step'}
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
          <Information size={14} style={{ color: 'var(--ds-cyan)' }} />
          <span>The API is the communication interface, NOT the database or the user interface.</span>
        </div>
      </div>
    </div>
  );
}
