import { Injectable } from '@angular/core';
import * as jsonEvents from '../../data/events.json';
import { SiemEvent, SiemEventSeverity } from '../../model/siem-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: SiemEvent[] = [];

  loadEvents(severity?: string) {
    const all: SiemEvent[] = (jsonEvents as any).default;
    this.events = severity ? all.filter(e => e.severity === severity) : all;
    this.events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  get criticalCount(): number {
    return this.events.filter(e => e.severity === SiemEventSeverity.CRITICAL).length;
  }

  severityColor(severity: string): string {
    switch (severity) {
      case SiemEventSeverity.CRITICAL: return 'danger';
      case SiemEventSeverity.HIGH: return 'warning';
      case SiemEventSeverity.MEDIUM: return 'tertiary';
      default: return 'medium';
    }
  }

  typeIcon(type: string): string {
    switch (type) {
      case 'NETWORK': return 'globe-outline';
      case 'AUTH': return 'key-outline';
      case 'MALWARE': return 'bug-outline';
      case 'DNS': return 'server-outline';
      case 'EMAIL': return 'mail-outline';
      case 'VULN': return 'warning-outline';
      default: return 'alert-circle-outline';
    }
  }
}

