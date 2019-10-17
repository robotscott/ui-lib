import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { AxisDef, BaseChartService, Margin } from './services/base-chart.service';

@Component({
  selector: 'ui-charts',
  template: `
    <div class="chart-container" #chartContainer></div>
  `,
  styles: [`
    :host ::ng-deep svg { border: 1px solid #ccc }
  `]
})
export class UiChartsComponent implements AfterViewInit {

  private datum: {};

  @ViewChild('chartContainer', { static: false }) private chartContainer: ElementRef;

  private chartReady = false;
  private myChart;

  constructor(
    private baseChartService: BaseChartService
  ) {
    this.myChart = this.baseChartService.baseChart();
  }

  @Input()
  set data(data: {}) {
    this.datum = data;
    this.updateChart();
  }
  @Input()
  set xAxis(xAxis: AxisDef) {
    this.myChart.x(d => d[xAxis.key]);
    this.updateChart();
  }
  @Input()
  set yAxis(yAxis: AxisDef) {
    this.myChart.y(d => d[yAxis.key]);
    this.updateChart();
  }
  @Input()
  set width(width: number) {
    this.myChart.width(width);
    this.updateChart();
  }
  @Input()
  set height(height: number) {
    this.myChart.height(height);
    this.updateChart();
  }
  @Input()
  set margin(margin: Margin) {
    this.myChart.margin(margin);
    this.updateChart();
  }

  ngAfterViewInit(): void {
    this.drawChart();
    this.chartReady = true;
  }

  private updateChart() {
    if (this.chartReady) {
      this.drawChart();
    }
  }

  private drawChart(): void {
    d3.select(this.chartContainer.nativeElement)
      .datum(this.datum)
      .call(this.myChart);
  }

}
