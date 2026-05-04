import {Injectable} from '@angular/core';
import * as jsonIssues from '../../data/issues.json';

import {Issue} from "../../model/issue";
import StatusEnum = Issue.StatusEnum;

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  openIssues: Issue[] = [];
  issues: Issue[] = [];
  homeIssue: Issue;

  loadOpenIssues() {
    const issues: Issue[] = (jsonIssues as any).default;
    this.openIssues = issues.filter(issue => issue.status !== StatusEnum.Closed);
    this.homeIssue = this.getHomeIssue(this.openIssues);
  }

  loadIssues(all = true) {
    const issues: Issue[] = (jsonIssues as any).default;
    this.issues = all ? issues : issues.filter(issue => issue.status !== StatusEnum.Closed);
  }

  getIssue(id: number): Issue {
    return this.issues.find(issue => issue.id === id);
  }

  private getHomeIssue(issues: Issue[]): Issue {
    if (issues) {
      issues.sort((a, b) => (a.priority.value > b.priority.value) ? 1 : -1);
      return issues[0];
    }

  }

}
