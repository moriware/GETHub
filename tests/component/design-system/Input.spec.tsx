import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Input } from '@/presentation/components/input/Input';

describe('Input', () => {
  it('renderiza label e helperText', () => {
    const { getByText } = render(
      <Input label="Nome" helperText="Digite seu nome" placeholder="Nome completo" />,
    );

    expect(getByText('Nome')).toBeTruthy();
    expect(getByText('Digite seu nome')).toBeTruthy();
  });

  it('prioriza mensagem de erro quando error existe', () => {
    const { getByText, queryByText } = render(
      <Input
        label="Email"
        helperText="Use um email válido"
        error="Email obrigatório"
        placeholder="Digite seu email"
      />,
    );

    expect(getByText('Email obrigatório')).toBeTruthy();
    expect(queryByText('Use um email válido')).toBeNull();
  });

  it('chama onChangeText ao digitar', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Pesquisar repositórios" onChangeText={onChangeText} />,
    );

    fireEvent.changeText(getByPlaceholderText('Pesquisar repositórios'), 'react');

    expect(onChangeText).toHaveBeenCalledWith('react');
  });
});
