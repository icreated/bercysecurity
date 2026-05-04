import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SecuritySettings {
  sessionTimeout: number;       // minutes: 5, 15, 30, 60
  mfaEnabled: boolean;
  biometricLock: boolean;
  incognitoMode: boolean;       // no screenshots, blur on background
  tlsPinning: boolean;
  alertNotifications: boolean;
  criticalAlertsOnly: boolean;
  autoLockOnBackground: boolean;
}

export interface UiSettings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  compactView: boolean;
  showRawEvents: boolean;
  defaultTab: string;
  language: 'fr' | 'en';
}

export interface AppSettings {
  ui: UiSettings;
  security: SecuritySettings;
}

const STORAGE_KEY = 'bercy_settings';

const DEFAULTS: AppSettings = {
  ui: {
    darkMode: true,
    fontSize: 'medium',
    compactView: false,
    showRawEvents: false,
    defaultTab: 'home',
    language: 'fr'
  },
  security: {
    sessionTimeout: 15,
    mfaEnabled: true,
    biometricLock: false,
    incognitoMode: true,
    tlsPinning: true,
    alertNotifications: true,
    criticalAlertsOnly: false,
    autoLockOnBackground: true
  }
};

@Injectable({ providedIn: 'root' })
export class SettingsService {

  private _settings = new BehaviorSubject<AppSettings>(this.load());
  settings$ = this._settings.asObservable();

  get current(): AppSettings {
    return this._settings.getValue();
  }

  get darkMode(): boolean {
    return this.current.ui.darkMode;
  }

  updateUi(patch: Partial<UiSettings>) {
    const next: AppSettings = {
      ...this.current,
      ui: { ...this.current.ui, ...patch }
    };
    this.save(next);
  }

  updateSecurity(patch: Partial<SecuritySettings>) {
    const next: AppSettings = {
      ...this.current,
      security: { ...this.current.security, ...patch }
    };
    this.save(next);
  }

  reset() {
    this.save({ ...DEFAULTS });
  }

  private load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ui: { ...DEFAULTS.ui, ...parsed.ui },
          security: { ...DEFAULTS.security, ...parsed.security }
        };
      }
    } catch {}
    return { ...DEFAULTS, ui: { ...DEFAULTS.ui }, security: { ...DEFAULTS.security } };
  }

  private save(s: AppSettings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    this._settings.next(s);
    this.applyTheme(s.ui.darkMode);
    this.applyFontSize(s.ui.fontSize);
    this.applyCompact(s.ui.compactView);
  }

  applyTheme(dark: boolean) {
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
  }

  applyFontSize(size: string) {
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
    document.documentElement.classList.add(`font-${size}`);
  }

  applyCompact(compact: boolean) {
    document.body.classList.toggle('compact', compact);
  }
}
