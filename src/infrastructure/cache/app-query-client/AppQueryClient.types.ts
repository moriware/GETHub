import type { DehydratedState } from '@tanstack/react-query';

export interface PersistedQueryClientState {
  version: number;
  dehydratedState: DehydratedState;
}
