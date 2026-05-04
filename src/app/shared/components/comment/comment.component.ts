import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject} from '@angular/core';
import {Issue} from "../../../model/issue";
import {Comment} from "../../../model/comment";
import {IssueService} from "../../services/issue.service";


@Component({
  standalone: false,
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

  private issueService = inject(IssueService);

  @Input()
  issue: Issue;
  @Input()
  comment: Comment;
  @Output()
  close: EventEmitter<boolean> = new EventEmitter();
  @Output()
  save: EventEmitter<Comment> = new EventEmitter();

  ngOnInit() {}

  voidCommit() {
    this.close.emit(true);
  }

  saveComment() {
    this.save.emit(this.comment);
  }

}
