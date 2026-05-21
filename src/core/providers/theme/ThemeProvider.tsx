import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { THEME_MODE_STORAGE_KEY } from '@/core/providers/theme/ThemeProvider.constants';
import {
  createThemeContextValue,
  parsePersistedThemeMode,
  resolveThemeMode,
} from '@/core/providers/theme/ThemeProvider.functions';
import type {
  AppThemeProviderProps,
  ThemeContextValue,
} from '@/core/providers/theme/ThemeProvider.types';
import { storage } from '@/infrastructure/storage/Storage.constants';
import type { ThemeMode } from '@/shared/types/theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: AppThemeProviderProps): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(resolveThemeMode(colorScheme));
  const [isModeHydrated, setIsModeHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrateThemeMode(): Promise<void> {
      try {
        const persistedMode = parsePersistedThemeMode(
          await storage.getString(THEME_MODE_STORAGE_KEY),
        );

        if (isMounted && persistedMode) {
          setMode(persistedMode);
        }
      } catch {
        // Ignora falha de leitura e mantém fallback baseado no sistema.
      } finally {
        if (isMounted) {
          setIsModeHydrated(true);
        }
      }
    }

    void hydrateThemeMode();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isModeHydrated) {
      return;
    }

    async function persistThemeMode(): Promise<void> {
      try {
        await storage.set(THEME_MODE_STORAGE_KEY, mode);
      } catch {
        // Ignora falha de escrita para não interromper a experiência do usuário.
      }
    }

    void persistThemeMode();
  }, [isModeHydrated, mode]);

  const value = useMemo<ThemeContextValue>(() => createThemeContextValue(mode, setMode), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext precisa ser usado dentro de um AppThemeProvider.');
  }

  return context;
}
