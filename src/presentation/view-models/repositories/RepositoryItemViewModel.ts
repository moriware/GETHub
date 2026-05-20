export interface RepositoryItemViewModel {
  id: number;
  fullName: string;
  description: string | null;
  ownerLogin: string;
  language: string | null;
  starsLabel: string;
}
