import React from 'react';

import type { HeadingProps } from '@/presentation/components/heading/Heading.types';
import { Text } from '@/presentation/components/text/Text';

export function Heading({ children }: HeadingProps): React.JSX.Element {
  return <Text variant="headline">{children}</Text>;
}
