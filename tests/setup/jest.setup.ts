import { jest } from '@jest/globals';

jest.mock('@/presentation/hooks/theme/useTheme', () => ({
  useTheme: () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { lightTheme } = require('@/design/theme/lightTheme');

    return {
      theme: lightTheme,
      mode: 'light',
      setMode: jest.fn(),
      toggleMode: jest.fn(),
    };
  },
}));
