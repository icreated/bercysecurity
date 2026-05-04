import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'issueStatus'
})
export class IssueStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'Nouveau ticket';
      case 'WAITING':
        return 'En attente de réponse client';
      default:
        return 'Fermé';
    }
  }

}
