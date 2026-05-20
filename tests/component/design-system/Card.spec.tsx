import { render } from '@testing-library/react-native';
import React from 'react';

import { Card } from '@/presentation/components/card/Card';
import { Text } from '@/presentation/components/text/Text';

describe('Card', () => {
  it('renderiza conteúdo filho', () => {
    const { getByText } = render(
      <Card>
        <Text>Conteúdo do card</Text>
      </Card>,
    );

    expect(getByText('Conteúdo do card')).toBeTruthy();
  });
});
