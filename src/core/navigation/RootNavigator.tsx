import {
  createHeaderShortcutStyle,
  shouldShowDesignSystemShortcut,
} from '@/core/navigation/RootNavigator.functions';
import { AppPressable } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export function RootNavigator(): React.JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerTitleAlign: 'left',
        contentStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.headerBackground },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: shouldShowDesignSystemShortcut(route.name)
          ? () => (
              <AppPressable
                onPress={() => {
                  router.push('/explore');
                }}
                style={({ pressed }) => createHeaderShortcutStyle(theme, pressed)}>
                <Text tone="primary" variant="label">
                  Design
                </Text>
              </AppPressable>
            )
          : undefined,
      })}>
      <Stack.Screen name="index" options={{ title: 'Repositories' }} />
      <Stack.Screen name="repository/[owner]/[name]" options={{ title: 'Details' }} />
      <Stack.Screen name="repository/[owner]/[name]/issues" options={{ title: 'Issues' }} />
      <Stack.Screen name="explore" options={{ title: 'Design System' }} />
    </Stack>
  );
}
