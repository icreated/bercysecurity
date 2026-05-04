import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IssueService } from '../../shared/services/issue.service';
import { EventService } from '../../shared/services/event.service';
import { AssetService } from '../../shared/services/asset.service';
import { SettingsService } from '../../shared/services/settings.service';
import { Issue } from '../../model/issue';

Chart.register(...registerables, ChartDataLabels);

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('severityCanvas') severityCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('issuesCanvas')   issuesCanvas:   ElementRef<HTMLCanvasElement>;
  @ViewChild('assetsCanvas')   assetsCanvas:   ElementRef<HTMLCanvasElement>;

  private issueService    = inject(IssueService);
  protected eventService  = inject(EventService);
  protected assetService  = inject(AssetService);
  private settingsService = inject(SettingsService);
  private cdr             = inject(ChangeDetectorRef);

  private get isDark(): boolean {
    return this.settingsService.current.ui.darkMode;
  }

  // Theme-aware color helpers
  private get textColor()       { return this.isDark ? '#e0e0e0' : '#333333'; }
  private get subTextColor()    { return this.isDark ? '#aaaaaa' : '#666666'; }
  private get gridColor()       { return this.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'; }
  private get borderColor()     { return this.isDark ? '#1e2023' : '#f4f4f4'; }
  private get centerTextColor() { return this.isDark ? '#ffffff' : '#1a1a2e'; }
  private get dataLabelColor()  { return this.isDark ? '#ffffff' : '#222222'; }

  private charts: Chart[] = [];

  // KPI tiles
  criticalEvents  = 0;
  openIssues      = 0;
  criticalAssets  = 0;
  topIssue: Issue | null = null;

  ngOnInit() {
    this.issueService.loadIssues(true);
    this.issueService.loadOpenIssues();
    this.eventService.loadEvents();
    this.assetService.loadAssets();

    this.criticalEvents = this.eventService.criticalCount;
    this.openIssues     = this.issueService.openIssues.length;
    this.criticalAssets = this.assetService.criticalCount;
    this.topIssue       = this.issueService.homeIssue ?? null;
    this.cdr.markForCheck();
  }

  ngAfterViewInit() {
    this.buildCharts();
  }

  ionViewWillEnter() {
    // Rebuild charts when returning to page (e.g. after theme change)
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    this.buildCharts();
  }

  private buildCharts() {
    this.buildSeverityChart();
    this.buildIssuesChart();
    this.buildAssetsChart();
  }

  ngOnDestroy() {
    this.charts.forEach(c => c.destroy());
  }

  // ── Chart 1: Events by severity (doughnut) ──────────────────────────────
  private buildSeverityChart() {
    const events = this.eventService.events;
    const total = events.length;
    const counts = [
      events.filter(e => e.severity === 'CRITICAL').length,
      events.filter(e => e.severity === 'HIGH').length,
      events.filter(e => e.severity === 'MEDIUM').length,
      events.filter(e => e.severity === 'LOW').length
    ];
    const colors = ['#eb445a', '#ffc409', '#6a64ff', '#92949c'];

    // Plugin: center text showing total
    const centerTextPlugin = {
      id: 'centerText',
      afterDraw: (chart: any) => {
        const { ctx, chartArea: { left, top, right, bottom } } = chart;
        const cx = (left + right) / 2;
        const cy = (top + bottom) / 2;
        ctx.save();
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = this.centerTextColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(total), cx, cy - 8);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = this.subTextColor;
        ctx.fillText('événements', cx, cy + 14);
        ctx.restore();
      }
    };

    const chart = new Chart(this.severityCanvas.nativeElement, {
      type: 'doughnut',
      plugins: [centerTextPlugin],
      data: {
        labels: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
        datasets: [{
          data: counts,
          backgroundColor: colors,
          hoverBackgroundColor: ['#ff6b7a', '#ffd44d', '#8a85ff', '#aaaab0'],
          borderWidth: 3,
          borderColor: this.borderColor,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        cutout: '62%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: this.textColor,
              font: { size: 12, weight: 'bold' },
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          datalabels: {
            color: '#fff',
            font: { size: 13, weight: 'bold' },
            formatter: (value: number) => value > 0 ? value : '',
            anchor: 'center',
            align: 'center'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  // ── Chart 2: Issues by status (horizontal bar) ──────────────────────────
  private buildIssuesChart() {
    const issues = this.issueService.issues;
    const open    = issues.filter(i => i.status === 'OPEN').length;
    const waiting = issues.filter(i => i.status === 'WAITING').length;
    const closed  = issues.filter(i => i.status === 'CLOSED').length;
    const chart = new Chart(this.issuesCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['  Ouverts', '  En attente', '  Fermés'],
        datasets: [{
          label: 'Tickets',
          data: [open, waiting, closed],
          backgroundColor: [
            'rgba(235,68,90,0.85)',
            'rgba(255,196,9,0.85)',
            'rgba(45,211,111,0.85)'
          ],
          borderColor: ['#eb445a', '#ffc409', '#2dd36f'],
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: this.dataLabelColor,
            font: { size: 14, weight: 'bold' },
            formatter: (v: number) => v
          }
        },
        scales: {
          x: {
            min: 0,
            ticks: { color: this.subTextColor, stepSize: 1, font: { size: 10 } },
            grid: { color: this.gridColor },
            border: { display: false }
          },
          y: {
            ticks: { color: this.textColor, font: { size: 13, weight: 'bold' } },
            grid: { display: false },
            border: { display: false }
          }
        },
        layout: { padding: { right: 30 } }
      }
    });
    this.charts.push(chart);
  }

  // ── Chart 3: Top 6 assets by risk score (horizontal bar) ────────────────
  private buildAssetsChart() {
    const top = this.assetService.assets.slice(0, 6);
    const bgColors = top.map(a =>
      a.riskScore >= 80 ? 'rgba(235,68,90,0.85)' :
      a.riskScore >= 60 ? 'rgba(255,196,9,0.85)' :
      a.riskScore >= 40 ? 'rgba(106,100,255,0.85)' : 'rgba(45,211,111,0.85)'
    );
    const borderColors = top.map(a =>
      a.riskScore >= 80 ? '#eb445a' :
      a.riskScore >= 60 ? '#ffc409' :
      a.riskScore >= 40 ? '#6a64ff' : '#2dd36f'
    );
    const chart = new Chart(this.assetsCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: top.map(a => '  ' + a.hostname.replace('STARK-', '')),
        datasets: [{
          label: 'Risk Score',
          data: top.map(a => a.riskScore),
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: this.dataLabelColor,
            font: { size: 13, weight: 'bold' },
            formatter: (v: number) => v + ' %'
          }
        },
        scales: {
          x: {
            min: 0, max: 100,
            ticks: { color: this.subTextColor, stepSize: 20, font: { size: 10 } },
            grid: { color: this.gridColor },
            border: { display: false }
          },
          y: {
            ticks: { color: this.textColor, font: { size: 11, weight: 'bold' } },
            grid: { display: false },
            border: { display: false }
          }
        },
        layout: { padding: { right: 50 } }
      }
    });
    this.charts.push(chart);
  }
}
