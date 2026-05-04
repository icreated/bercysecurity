import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  standalone: false,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage implements OnInit {

  protected settingsService = inject(SettingsService);
  private alertCtrl         = inject(AlertController);
  private cdr               = inject(ChangeDetectorRef);

  segment = 'ui';

  // expose snapshots for template binding
  ui       = { ...this.settingsService.current.ui };
  security = { ...this.settingsService.current.security };

  readonly timeoutOptions = [
    { value: 5,  label: '5 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 heure' }
  ];

  readonly tabOptions = [
    { value: 'home',      label: 'Accueil' },
    { value: 'events',   label: 'Événements' },
    { value: 'issues',   label: 'Tickets' },
    { value: 'assets',   label: 'Actifs' },
    { value: 'contracts',label: 'Contrats' }
  ];

  ngOnInit() {
    this.settingsService.applyTheme(this.ui.darkMode);
    this.settingsService.applyFontSize(this.ui.fontSize);
  }

  segmentChanged(e: any) {
    this.segment = e.detail.value;
  }

  // ─ UI handlers ───────────────────────────────────────────────
  toggleDarkMode(e: any) {
    this.ui.darkMode = e.detail.checked;
    this.settingsService.updateUi({ darkMode: this.ui.darkMode });
    this.cdr.markForCheck();
  }

  setFontSize(size: 'small' | 'medium' | 'large') {
    this.ui.fontSize = size;
    this.settingsService.updateUi({ fontSize: size });
    this.cdr.markForCheck();
  }

  toggleCompact(e: any) {
    this.ui.compactView = e.detail.checked;
    this.settingsService.updateUi({ compactView: this.ui.compactView });
    this.settingsService.applyCompact(this.ui.compactView);
  }

  toggleRawEvents(e: any) {
    this.ui.showRawEvents = e.detail.checked;
    this.settingsService.updateUi({ showRawEvents: this.ui.showRawEvents });
  }

  setDefaultTab(e: any) {
    this.ui.defaultTab = e.detail.value;
    this.settingsService.updateUi({ defaultTab: this.ui.defaultTab });
  }

  setLanguage(lang: 'fr' | 'en') {
    this.ui.language = lang;
    this.settingsService.updateUi({ language: lang });
    this.cdr.markForCheck();
  }

  // ─ Security handlers ───────────────────────────────────────────
  toggleMfa(e: any) {
    this.security.mfaEnabled = e.detail.checked;
    this.settingsService.updateSecurity({ mfaEnabled: this.security.mfaEnabled });
  }

  toggleBiometric(e: any) {
    this.security.biometricLock = e.detail.checked;
    this.settingsService.updateSecurity({ biometricLock: this.security.biometricLock });
  }

  toggleIncognito(e: any) {
    this.security.incognitoMode = e.detail.checked;
    this.settingsService.updateSecurity({ incognitoMode: this.security.incognitoMode });
  }

  toggleTls(e: any) {
    this.security.tlsPinning = e.detail.checked;
    this.settingsService.updateSecurity({ tlsPinning: this.security.tlsPinning });
  }

  toggleNotifications(e: any) {
    this.security.alertNotifications = e.detail.checked;
    this.settingsService.updateSecurity({ alertNotifications: this.security.alertNotifications });
  }

  toggleCriticalOnly(e: any) {
    this.security.criticalAlertsOnly = e.detail.checked;
    this.settingsService.updateSecurity({ criticalAlertsOnly: this.security.criticalAlertsOnly });
  }

  toggleAutoLock(e: any) {
    this.security.autoLockOnBackground = e.detail.checked;
    this.settingsService.updateSecurity({ autoLockOnBackground: this.security.autoLockOnBackground });
  }

  setTimeout(e: any) {
    this.security.sessionTimeout = +e.detail.value;
    this.settingsService.updateSecurity({ sessionTimeout: this.security.sessionTimeout });
  }

  async resetAll() {
    const alert = await this.alertCtrl.create({
      header: 'Réinitialiser',
      message: 'Remettre tous les paramètres aux valeurs par défaut ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Réinitialiser',
          role: 'destructive',
          handler: () => {
            this.settingsService.reset();
            this.ui       = { ...this.settingsService.current.ui };
            this.security = { ...this.settingsService.current.security };
            this.cdr.markForCheck();
          }
        }
      ]
    });
    await alert.present();
  }

  get appVersion() { return '2.4.1'; }
  get socAgent()   { return 'BercySecurity SOC v4'; }

  get securityScore(): number {
    const s = this.security;
    let score = 0;
    if (s.mfaEnabled)            score += 25;
    if (s.biometricLock)         score += 15;
    if (s.tlsPinning)            score += 20;
    if (s.incognitoMode)         score += 10;
    if (s.autoLockOnBackground)  score += 15;
    if (s.alertNotifications)    score += 10;
    if (s.sessionTimeout <= 15)  score += 5;
    return score;
  }
}
