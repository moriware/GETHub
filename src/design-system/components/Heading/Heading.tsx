import React from 'react';

import { Text } from '@/design-system/components/Text/Text';
import type { HeadingProps } from '@/design-system/components/Heading/Heading.types';

export function Heading({ children }: HeadingProps): React.JSX.Element {
  return <Text variant="headline">{children}</Text>;
}
