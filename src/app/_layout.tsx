import React from 'react';

import { RootNavigator } from '@/core/navigation/RootNavigator';
import { NavigationThemeProvider } from '@/core/providers/navigation-theme/NavigationThemeProvider';
import { QueryProvider } from '@/core/providers/query/QueryProvider';
import { SafeAreaProvider } from '@/core/providers/safe-area/SafeAreaProvider';
import { AppThemeProvider } from '@/core/providers/theme/ThemeProvider';

export default function Layout(): React.JSX.Element {
  return (
    <AppThemeProvider>
      <SafeAreaProvider>
        <NavigationThemeProvider>
          <QueryProvider>
            <RootNavigator />
          </QueryProvider>
        </NavigationThemeProvider>
      </SafeAreaProvider>
    </AppThemeProvider>
  );
}
