import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {IssueService} from "../../shared/services/issue.service";
import { I18nService } from '../../shared/services/i18n.service';

@Component({
  standalone: false,
  selector: 'app-issues',
  templateUrl: './issues.page.html',
  styleUrls: ['./issues.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssuesPage implements OnInit {

  protected issueService = inject(IssueService);
  protected i18n         = inject(I18nService);

  segment = "openIssues";

  ngOnInit() {
    this.issueService.loadIssues(false);
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
    this.issueService.loadIssues(this.segment === 'allIssues')
  }

  doRefresh(event) {
    setTimeout(() => {
      this.issueService.loadIssues();
      event.target.complete();
    }, 2000);
  }

}
