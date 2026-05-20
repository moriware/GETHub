import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

/**
 * Resolve o estilo opcional informado no componente genérico de Pressable.
 */
export function resolveProvidedPressableStyle(
  style: PressableProps['style'],
  state: PressableStateCallbackType,
): StyleProp<ViewStyle> {
  if (typeof style === 'function') {
    return style(state);
  }

  return style;
}
