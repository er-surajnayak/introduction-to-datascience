'use client';

import React from 'react';
import { HeaderGlobalAction } from '@carbon/react';
import { Sun, Moon } from '@carbon/icons-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <HeaderGlobalAction
        aria-label="Toggle Carbon theme"
        tooltipAlignment="end"
      >
        <Moon size={20} />
      </HeaderGlobalAction>
    );
  }

  const isLight = theme === 'white';

  return (
    <HeaderGlobalAction
      aria-label={`Switch to ${isLight ? 'Dark (Gray 100)' : 'Light (White)'} theme`}
      tooltipAlignment="end"
      onClick={toggleTheme}
    >
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
    </HeaderGlobalAction>
  );
}
