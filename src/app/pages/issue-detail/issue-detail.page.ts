import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IssueService} from "../../shared/services/issue.service";
import * as jsonComments from "../../data/comments.json";
import {Issue} from "../../model/issue";
import {Comment} from "../../model/comment";

@Component({
  standalone: false,
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.page.html',
  styleUrls: ['./issue-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueDetailPage implements OnInit {

  private issueService = inject(IssueService);
  private route = inject(ActivatedRoute);

  issue: Issue;
  comments: Comment[] = [];
  segment = "comments";
  isNewCommentOpened = false;
  newComment: Comment;

  ngOnInit() {
    let issueId = +this.route.snapshot.paramMap.get('id');
    this.issue = this.issueService.getIssue(issueId);
    this.loadComments();
  }

  loadComments() {
    const comments = (jsonComments as any).default;
    this.comments = comments.filter((c: Comment) => c.issueId === this.issue?.id);
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  createNewComment() {
    this.isNewCommentOpened = true;
    this.newComment = {
      sender: 'Tony STARK',
      date: new Date().toDateString(),
    }
  }

  saveNewComment(comment: Comment) {
    this.isNewCommentOpened = false;
    this.comments.unshift(comment);
  }

}
