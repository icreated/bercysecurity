import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractTypeDirective} from './directives/contract-type.directive';
import {IssuePriorityDirective} from "./directives/issue-priority.directive";
import {IssueStatusPipe} from './pipes/issue-status.pipe';
import {CommentComponent} from "./components/comment/comment.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ContractTypeDirective, IssuePriorityDirective, IssueStatusPipe, CommentComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ContractTypeDirective,
    IssuePriorityDirective,
    IssueStatusPipe,
    CommentComponent
  ]
})
export class SharedModule { }
