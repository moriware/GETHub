import { DateFormatterService } from '@/application/services/DateFormatterService';
import type { Issue } from '@/domain/entities/Issue';
import type { IssueItemViewModel } from '@/presentation/view-models/issues/IssueItemViewModel';

export class IssueToViewModelMapper {
  private readonly formatter = new DateFormatterService('pt-BR');

  toItemViewModel(issue: Issue): IssueItemViewModel {
    return {
      id: issue.id,
      title: issue.title,
      author: issue.author.login,
      createdAtRelative: this.formatter.formatRelative(issue.createdAt),
      labels: issue.labels,
    };
  }
}
