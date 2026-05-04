export enum SiemEventType {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  MALWARE = 'MALWARE',
  DNS = 'DNS',
  EMAIL = 'EMAIL',
  VULN = 'VULN'
}

export enum SiemEventSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface SiemEvent {
  id: number;
  timestamp: string;
  type: SiemEventType | string;
  severity: SiemEventSeverity | string;
  title: string;
  sourceIp: string;
  sourceCountry: string;
  destIp: string | null;
  destPort: number | null;
  protocol: string;
  sensor: string;
  contract: string;
  mitreTactic: string;
  mitreTechnique: string;
  count: number;
  raw: string;
  issueId: number | null;
}
