import { Injectable } from '@angular/core';
import * as jsonAssets from '../../data/assets.json';
import { Asset } from '../../model/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assets: Asset[] = [];

  loadAssets() {
    const all: Asset[] = (jsonAssets as any).default;
    this.assets = all.sort((a, b) => b.riskScore - a.riskScore);
  }

  get criticalCount(): number {
    return this.assets.filter(a => a.riskScore >= 80).length;
  }

  riskColor(score: number): string {
    if (score >= 80) return 'danger';
    if (score >= 60) return 'warning';
    if (score >= 40) return 'tertiary';
    return 'success';
  }

  typeIcon(type: string): string {
    switch (type) {
      case 'FIREWALL': return 'shield-outline';
      case 'SERVER': return 'server-outline';
      case 'WORKSTATION': return 'laptop-outline';
      default: return 'hardware-chip-outline';
    }
  }
}

