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
        <Heading>Design System</Heading>
        <Text tone="muted">Tema atual: {mode}</Text>

        <Button label="Alternar tema" variant="outline" onPress={toggleMode} />

        <Card>
          <AppView style={styles.content}>
            <Text variant="title">Botões</Text>
            <AppView style={styles.row}>
              <Button label="Primário" />
              <Button label="Contorno" variant="outline" />
              <Button label="Fantasma" variant="ghost" />
              <Button label="Carregando" loading />
              <Button label="Desativado" disabled />
            </AppView>
          </AppView>
        </Card>

        <Card>
          <AppView style={styles.content}>
            <Text variant="title">Entrada</Text>
            <Input label="Repositório" placeholder="react native" helperText="Buscar por nome" />
            <Input label="Com erro" value="" error="Campo obrigatório" />
          </AppView>
        </Card>

        <Card>
          <AppView style={styles.content}>
            <Text variant="title">Badges e Avatar</Text>
            <AppView style={styles.row}>
              <Badge label="bug" />
              <Badge label="melhoria" />
              <Badge label="precisa de ajuda" />
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
