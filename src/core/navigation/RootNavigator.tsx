import { useTheme } from '@/design-system/theme/useTheme';
import { Stack } from 'expo-router';
import React from 'react';

export function RootNavigator(): React.JSX.Element {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'left',
        contentStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Repositories' }} />
      <Stack.Screen
        name="repository/[owner]/[name]"
        options={{ title: 'Details' }}
      />
      <Stack.Screen
        name="repository/[owner]/[name]/issues"
        options={{ title: 'Issues' }}
      />
      <Stack.Screen name="explore" options={{ title: 'Design System' }} />
    </Stack>
  );
}
