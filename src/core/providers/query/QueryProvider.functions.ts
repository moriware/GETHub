import type { AppStateStatus } from 'react-native';

export function shouldPersistQueryCache(nextState: AppStateStatus): boolean {
  return nextState !== 'active';
}
