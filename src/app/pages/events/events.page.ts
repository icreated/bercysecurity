import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { I18nService } from '../../shared/services/i18n.service';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  standalone: false,
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsPage implements OnInit {

  protected eventService    = inject(EventService);
  protected i18n            = inject(I18nService);
  protected settingsService = inject(SettingsService);
  segment = 'all';

  get showRaw(): boolean {
    return this.settingsService.current.ui.showRawEvents;
  }

  ngOnInit() {
    this.eventService.loadEvents();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
    const severity = this.segment === 'all' ? undefined : this.segment.toUpperCase();
    this.eventService.loadEvents(severity);
  }

  doRefresh(event: any) {
    setTimeout(() => {
      const severity = this.segment === 'all' ? undefined : this.segment.toUpperCase();
      this.eventService.loadEvents(severity);
      event.target.complete();
    }, 1500);
  }
}
