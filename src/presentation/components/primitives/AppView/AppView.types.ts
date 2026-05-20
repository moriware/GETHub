import type { ViewProps } from 'react-native';

export type AppViewSurface = 'transparent' | 'background' | 'surface' | 'header';

export interface AppViewProps extends ViewProps {
  surface?: AppViewSurface;
}
