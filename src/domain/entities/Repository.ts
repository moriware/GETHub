import type { Owner } from '@/domain/entities/Owner';

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  owner: Owner;
}
