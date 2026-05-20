export interface RepositoryDetailsViewModel {
  id: number;
  fullName: string;
  description: string | null;
  ownerName: string;
  ownerAvatarUrl: string;
  language: string | null;
  starsLabel: string;
  forksLabel: string;
  watchersLabel: string;
}
