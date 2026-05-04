import { Injectable, inject } from '@angular/core';
import { SettingsService } from './settings.service';

export interface Translations {
  // Tab bar
  tabHome: string;
  tabEvents: string;
  tabIssues: string;
  tabAssets: string;
  tabContracts: string;
  tabSettings: string;
  // Events page
  eventsTitle: string;
  eventsAll: string;
  eventsCritical: string;
  eventsHigh: string;
  eventsEmpty: string;
  eventsRawLog: string;
  eventsMitre: string;
  eventsCount: string;
  // Issues page
  issuesTitle: string;
  issuesOpen: string;
  issuesAll: string;
  // Assets page
  assetsTitle: string;
  assetsAtRisk: string;
  assetsVulns: string;
  assetsOpenIssues: string;
  // Contracts page
  contractsTitle: string;
  contractActive: string;
  contractExpired: string;
  contractPending: string;
  // Home page
  homeTitle: string;
  homeCriticalEvents: string;
  homeOpenIssues: string;
  homeCriticalAssets: string;
  homePriorityTicket: string;
  homeEventsBySeverity: string;
  homeTicketsByStatus: string;
  homeTopAssets: string;
  homeTotal: string;
  homeCritiques: string;
  homeOpen: string;
  homeWaiting: string;
  homeClosed: string;
  homeEvents: string;
  // Settings
  settingsTitle: string;
  settingsUI: string;
  settingsSecurity: string;
}

const FR: Translations = {
  tabHome: 'Accueil',
  tabEvents: 'Événements',
  tabIssues: 'Tickets',
  tabAssets: 'Actifs',
  tabContracts: 'Contrats',
  tabSettings: 'Paramètres',

  eventsTitle: 'Événements SIEM',
  eventsAll: 'Tous',
  eventsCritical: 'Critique',
  eventsHigh: 'Élevé',
  eventsEmpty: 'Aucun événement',
  eventsRawLog: 'Log brut',
  eventsMitre: 'MITRE',
  eventsCount: 'occurrences',

  issuesTitle: 'Tickets',
  issuesOpen: 'Tickets ouverts',
  issuesAll: 'Tous les tickets',

  assetsTitle: 'Inventaire des actifs',
  assetsAtRisk: 'à risque',
  assetsVulns: 'CVE',
  assetsOpenIssues: 'tickets',

  contractsTitle: 'Contrats',
  contractActive: 'Actif',
  contractExpired: 'Expiré',
  contractPending: 'En attente',

  homeTitle: 'BERCYSECURITY — SOC',
  homeCriticalEvents: 'Évén. CRITICAL',
  homeOpenIssues: 'Tickets ouverts',
  homeCriticalAssets: 'Actifs critiques',
  homePriorityTicket: 'Ticket prioritaire',
  homeEventsBySeverity: 'Événements par sévérité',
  homeTicketsByStatus: 'Tickets par statut',
  homeTopAssets: 'Top actifs — Risk Score',
  homeTotal: 'total',
  homeCritiques: 'critiques',
  homeOpen: 'Ouverts',
  homeWaiting: 'En attente',
  homeClosed: 'Fermés',
  homeEvents: 'événements',

  settingsTitle: 'Paramètres',
  settingsUI: 'Interface',
  settingsSecurity: 'Sécurité',
};

const EN: Translations = {
  tabHome: 'Home',
  tabEvents: 'Events',
  tabIssues: 'Tickets',
  tabAssets: 'Assets',
  tabContracts: 'Contracts',
  tabSettings: 'Settings',

  eventsTitle: 'SIEM Events',
  eventsAll: 'All',
  eventsCritical: 'Critical',
  eventsHigh: 'High',
  eventsEmpty: 'No events',
  eventsRawLog: 'Raw log',
  eventsMitre: 'MITRE',
  eventsCount: 'occurrences',

  issuesTitle: 'Tickets',
  issuesOpen: 'Open tickets',
  issuesAll: 'All tickets',

  assetsTitle: 'Asset Inventory',
  assetsAtRisk: 'at risk',
  assetsVulns: 'CVEs',
  assetsOpenIssues: 'tickets',

  contractsTitle: 'Contracts',
  contractActive: 'Active',
  contractExpired: 'Expired',
  contractPending: 'Pending',

  homeTitle: 'BERCYSECURITY — SOC',
  homeCriticalEvents: 'CRITICAL Events',
  homeOpenIssues: 'Open Tickets',
  homeCriticalAssets: 'Critical Assets',
  homePriorityTicket: 'Priority ticket',
  homeEventsBySeverity: 'Events by severity',
  homeTicketsByStatus: 'Tickets by status',
  homeTopAssets: 'Top assets — Risk Score',
  homeTotal: 'total',
  homeCritiques: 'critical',
  homeOpen: 'Open',
  homeWaiting: 'Waiting',
  homeClosed: 'Closed',
  homeEvents: 'events',

  settingsTitle: 'Settings',
  settingsUI: 'Interface',
  settingsSecurity: 'Security',
};

@Injectable({ providedIn: 'root' })
export class I18nService {

  private settingsService = inject(SettingsService);

  get t(): Translations {
    return this.settingsService.current.ui.language === 'en' ? EN : FR;
  }
}
