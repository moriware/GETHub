export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  uri: string;
  size?: AvatarSize;
}
