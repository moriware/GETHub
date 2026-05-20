import React from 'react';
import { ScrollView } from 'react-native';

import { Avatar } from '@/presentation/components/avatar/Avatar';
import { Badge } from '@/presentation/components/badge/Badge';
import { Button } from '@/presentation/components/button/Button';
import { Card } from '@/presentation/components/card/Card';
import { Screen } from '@/presentation/components/common/Screen';
import { Heading } from '@/presentation/components/heading/Heading';
import { Input } from '@/presentation/components/input/Input';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';
import { createDesignSystemScreenStyles } from '@/presentation/screens/DesignSystemScreen/styles';

export function DesignSystemScreen(): React.JSX.Element {
  const { mode, toggleMode, theme } = useTheme();
  const styles = createDesignSystemScreenStyles(theme);

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
              <Avatar
                size="sm"
                uri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              />
              <Avatar
                size="md"
                uri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              />
              <Avatar
                size="lg"
                uri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              />
            </AppView>
          </AppView>
        </Card>
      </ScrollView>
    </Screen>
  );
}
