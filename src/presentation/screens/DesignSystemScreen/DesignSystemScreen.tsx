import React from 'react';
import { ScrollView } from 'react-native';

import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Badge } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
import { Card } from '@/design-system/components/Card/Card';
import { Heading } from '@/design-system/components/Heading/Heading';
import { Input } from '@/design-system/components/Input/Input';
import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';
import { Screen } from '@/presentation/components/common/Screen';
import { useAppTheme } from '@/presentation/hooks/theme/useAppTheme';
import { createDesignSystemScreenStyles } from '@/presentation/screens/DesignSystemScreen/styles';

export function DesignSystemScreen(): React.JSX.Element {
  const theme = useTheme();
  const styles = createDesignSystemScreenStyles(theme);
  const { mode, toggleMode } = useAppTheme();

  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Heading>Design System Showcase</Heading>
        <Text tone="muted">Current theme: {mode}</Text>

        <Button label="Toggle theme" variant="outline" onPress={toggleMode} />

        <Card>
          <AppView style={styles.content}>
            <Text variant="title">Buttons</Text>
            <AppView style={styles.row}>
              <Button label="Primary" />
              <Button label="Outline" variant="outline" />
              <Button label="Ghost" variant="ghost" />
              <Button label="Loading" loading />
              <Button label="Disabled" disabled />
            </AppView>
          </AppView>
        </Card>

        <Card>
          <AppView style={styles.content}>
            <Text variant="title">Input</Text>
            <Input label="Repository" placeholder="react native" helperText="Search by name" />
            <Input label="With error" value="" error="Required field" />
          </AppView>
        </Card>

        <Card>
          <AppView style={styles.content}>
            <Text variant="title">Badges & Avatar</Text>
            <AppView style={styles.row}>
              <Badge label="bug" />
              <Badge label="enhancement" />
              <Badge label="help wanted" />
            </AppView>
            <AppView style={styles.row}>
              <Avatar size="sm" uri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
              <Avatar size="md" uri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
              <Avatar size="lg" uri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
            </AppView>
          </AppView>
        </Card>
      </ScrollView>
    </Screen>
  );
}
