import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../shared/services/issue.service';
import { I18nService } from '../shared/services/i18n.service';
import { SettingsService } from '../shared/services/settings.service';

@Component({
  standalone: false,
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPage implements OnInit {

  protected issueService    = inject(IssueService);
  protected i18n            = inject(I18nService);
  private settingsService   = inject(SettingsService);
  private router            = inject(Router);

  ngOnInit(): void {
    this.issueService.loadOpenIssues();
    const defaultTab = this.settingsService.current.ui.defaultTab;
    if (defaultTab && defaultTab !== 'home') {
      this.router.navigate(['/tabs', defaultTab]);
    }
  }
}
