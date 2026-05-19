import React from 'react';

import { NavigationThemeProvider } from '@/core/navigation/NavigationThemeProvider';
import { RootNavigator } from '@/core/navigation/RootNavigator';
import { QueryProvider } from '@/core/providers/QueryProvider';
import { SafeAreaProvider } from '@/core/providers/SafeAreaProvider';
import { ThemeProvider } from '@/core/providers/ThemeProvider';

export default function Layout(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationThemeProvider>
          <QueryProvider>
            <RootNavigator />
          </QueryProvider>
        </NavigationThemeProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
