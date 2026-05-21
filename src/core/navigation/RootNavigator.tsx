import { DesignButton } from '@/presentation/components/design-button/DesignButton';
import { useTheme } from '@/presentation/hooks/theme/useTheme';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export function RootNavigator(): React.JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'left',
        contentStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Repositories',
          headerRight: () => (
            <DesignButton
              theme={theme}
              onPress={() => {
                router.push('/explore');
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="repository/[owner]/[name]" options={{ title: 'Details' }} />
      <Stack.Screen name="repository/[owner]/[name]/issues" options={{ title: 'Issues' }} />
      <Stack.Screen name="explore" options={{ title: 'Design System' }} />
    </Stack>
  );
}
