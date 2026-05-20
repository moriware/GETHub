import type { PressableProps } from 'react-native';

export type AppPressableSurface = 'transparent' | 'background' | 'surface';

export interface AppPressableProps extends PressableProps {
  surface?: AppPressableSurface;
}
