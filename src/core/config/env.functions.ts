import Constants from 'expo-constants';

import type { AppEnv, ExpoExtraConfig } from '@/core/config/env.types';

/**
 * Lê as configurações extras do Expo definidas em app config.
 */
export function resolveExpoExtraConfig(): ExpoExtraConfig {
  return (Constants.expoConfig?.extra ?? {}) as ExpoExtraConfig;
}

/**
 * Monta as variáveis de ambiente consolidadas da aplicação.
 */
export function buildAppEnv(extra: ExpoExtraConfig): AppEnv {
  return {
    githubToken: process.env.EXPO_PUBLIC_GITHUB_TOKEN ?? extra.githubToken ?? '',
    githubBaseUrl:
      process.env.EXPO_PUBLIC_GITHUB_BASE_URL ?? extra.githubBaseUrl ?? 'https://api.github.com',
  };
}
