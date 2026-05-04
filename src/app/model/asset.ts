export enum AssetType {
  FIREWALL = 'FIREWALL',
  SERVER = 'SERVER',
  WORKSTATION = 'WORKSTATION'
}

export enum AssetCriticality {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Asset {
  id: number;
  hostname: string;
  ip: string;
  type: AssetType | string;
  os: string;
  criticality: AssetCriticality | string;
  riskScore: number;
  lastSeen: string;
  contract: string;
  vulnerabilities: number;
  openIssues: number;
  tags: string[];
}
