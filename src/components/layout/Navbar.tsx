'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  Tag,
  Modal,
  ProgressBar,
} from '@carbon/react';
import {
  ChartLine,
  Notification,
  Help,
  DataRefinery,
  Locked,
  CheckmarkOutline,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState<{ isOpen: boolean; title: string; desc: string }>({
    isOpen: false,
    title: '',
    desc: '',
  });

  const pathname = usePathname();
  const { completedCount, totalCount, overallProgress } = useCourseProgress();

  const handleOpenUnavailable = (title: string, desc: string) => {
    setComingSoonModal({
      isOpen: true,
      title,
      desc,
    });
  };

  return (
    <>
      <Header aria-label="DI Notes - Introduction to Data Science" className="ds-glass-panel">
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
          isActive={isSideNavExpanded}
          aria-expanded={isSideNavExpanded}
        />
        
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="DI NOTES">
            <span style={{ color: 'var(--ds-cyan)', fontWeight: 600, marginLeft: '4px' }}>
              DATA SCIENCE
            </span>
          </HeaderName>
        </Link>

        <HeaderNavigation aria-label="Course Navigation">
          <Link href="/" passHref legacyBehavior>
            <HeaderMenuItem isActive={pathname === '/'}>Dashboard</HeaderMenuItem>
          </Link>
          <HeaderMenuItem href="#modules">Modules</HeaderMenuItem>
          <HeaderMenuItem href="#journey">Learning Journey</HeaderMenuItem>
          <HeaderMenuItem
            href="#quick-access"
            onClick={(e) => {
              e.preventDefault();
              handleOpenUnavailable(
                'Question Bank',
                'The Question Bank contains 200+ semester exam & placement questions. It will be unlocked with full module solutions in Phase 2.'
              );
            }}
          >
            Question Bank
            <Tag type="cool-gray" size="sm" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>
              Soon
            </Tag>
          </HeaderMenuItem>
          <HeaderMenuItem
            href="#quick-access"
            onClick={(e) => {
              e.preventDefault();
              handleOpenUnavailable(
                'Quiz Arena',
                'The Quiz Arena features adaptive timed quizzes with step-by-step mathematical reasoning. Unlocking in Phase 2.'
              );
            }}
          >
            Quiz Arena
            <Tag type="cool-gray" size="sm" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>
              Soon
            </Tag>
          </HeaderMenuItem>
          <HeaderMenuItem
            href="#quick-access"
            onClick={(e) => {
              e.preventDefault();
              handleOpenUnavailable(
                'Ask DI (AI Mentor)',
                'Ask DI will be your interactive AI companion for debugging NumPy arrays, explaining statistical formulas, and reviewing homework. Coming in Phase 2.'
              );
            }}
          >
            Ask DI
            <Tag type="cyan" size="sm" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>
              Preview
            </Tag>
          </HeaderMenuItem>
        </HeaderNavigation>

        <HeaderGlobalBar>
          {/* Progress Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--ds-border-subtle)',
              marginRight: '8px',
              fontSize: '0.8125rem',
            }}
            className="cds--header__global-item"
            title={`Course Progress: ${completedCount} of ${totalCount} Modules completed`}
          >
            <DataRefinery size={16} style={{ color: 'var(--ds-cyan)' }} />
            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
              {completedCount}/{totalCount} DONE
            </span>
            <div style={{ width: '60px' }}>
              <ProgressBar
                value={overallProgress}
                max={100}
                size="small"
                hideLabel
                label="Overall Progress"
                status={overallProgress === 100 ? 'finished' : 'active'}
              />
            </div>
          </div>

          <ThemeToggle />

          <HeaderGlobalAction
            aria-label="Platform Info"
            tooltipAlignment="end"
            onClick={() =>
              handleOpenUnavailable(
                'About DI Notes — Data Science',
                'A dedicated interactive learning laboratory for 2nd-year engineering students. Covering Python, NumPy, Pandas, Statistics, Time Series, and Linear Regression with hands-on computational visualizers.'
              )
            }
          >
            <Help size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>

        {/* Mobile SideNav */}
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
          onOverlayClick={() => setIsSideNavExpanded(false)}
        >
          <SideNavItems>
            <Link href="/" passHref legacyBehavior>
              <SideNavLink
                isActive={pathname === '/'}
                onClick={() => setIsSideNavExpanded(false)}
              >
                Dashboard
              </SideNavLink>
            </Link>
            <SideNavLink
              href="#modules"
              onClick={() => setIsSideNavExpanded(false)}
            >
              Modules (5)
            </SideNavLink>
            <SideNavLink
              href="#journey"
              onClick={() => setIsSideNavExpanded(false)}
            >
              Learning Journey
            </SideNavLink>
            <SideNavLink
              href="#quick-access"
              onClick={() => {
                setIsSideNavExpanded(false);
                handleOpenUnavailable('Question Bank', 'Coming soon in Phase 2.');
              }}
            >
              Question Bank [Soon]
            </SideNavLink>
            <SideNavLink
              href="#quick-access"
              onClick={() => {
                setIsSideNavExpanded(false);
                handleOpenUnavailable('Quiz Arena', 'Coming soon in Phase 2.');
              }}
            >
              Quiz Arena [Soon]
            </SideNavLink>
            <SideNavLink
              href="#quick-access"
              onClick={() => {
                setIsSideNavExpanded(false);
                handleOpenUnavailable('Ask DI', 'Coming soon in Phase 2.');
              }}
            >
              Ask DI Assistant [Preview]
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Header>

      {/* Feature Notification Modal */}
      <Modal
        open={comingSoonModal.isOpen}
        modalHeading={comingSoonModal.title}
        primaryButtonText="Got it"
        onRequestClose={() => setComingSoonModal({ isOpen: false, title: '', desc: '' })}
        onRequestSubmit={() => setComingSoonModal({ isOpen: false, title: '', desc: '' })}
        size="sm"
        passiveModal={false}
      >
        <p style={{ marginTop: '1rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          {comingSoonModal.desc}
        </p>
      </Modal>
    </>
  );
}
