import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private settingsService = inject(SettingsService);

  ngOnInit() {
    const s = this.settingsService.current;
    this.settingsService.applyTheme(s.ui.darkMode);
    this.settingsService.applyFontSize(s.ui.fontSize);
    this.settingsService.applyCompact(s.ui.compactView);
  }
}