import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {IssueService} from "../../shared/services/issue.service";
import {ActivatedRoute} from "@angular/router";
import {Issue} from "../../model/issue";

@Component({
  standalone: false,
  selector: 'app-new-comment',
  templateUrl: './new-comment.page.html',
  styleUrls: ['./new-comment.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCommentPage implements OnInit {

  private issueService = inject(IssueService);
  private route = inject(ActivatedRoute);

  isNewIssue = true;
  issue: Issue;

  ngOnInit() {
    const issueId = +this.route.snapshot.paramMap.get('id');
    this.isNewIssue = issueId <= 0;
    this.issue = this.issueService.getIssue(issueId);
  }

}
