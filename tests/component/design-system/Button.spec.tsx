import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Button } from '@/presentation/components/button/Button';

describe('Button', () => {
  it('renderiza o texto informado', () => {
    const { getByText } = render(<Button label="Buscar" />);

    expect(getByText('Buscar')).toBeTruthy();
  });

  it('dispara onPress quando habilitado', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Abrir" onPress={onPress} />);

    fireEvent.press(getByText('Abrir'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('não dispara onPress quando disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Salvar" disabled onPress={onPress} />);

    fireEvent.press(getByText('Salvar'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('não dispara onPress quando está loading', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Enviar" loading onPress={onPress} />);

    fireEvent.press(getByText('Enviar'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
