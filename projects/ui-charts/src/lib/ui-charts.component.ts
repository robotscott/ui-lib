import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { BaseChartService } from './services/base-chart.service';
import { ChartOptions } from './models';

@Component({
  selector: 'ui-chart',
  template: `
    <div class="chart-container" #chartContainer></div>
  `,
  styles: [`
    .chart-container { border: 1px solid #ccc }
  `]
})
export class UiChartsComponent implements AfterViewInit {

  private myChart;
  private datum: {};

  @ViewChild('chartContainer', { static: false }) private chartContainer: ElementRef;

  constructor(
    private baseChartService: BaseChartService
  ) {
    this.myChart = this.baseChartService.baseChart();
  }

  @Input()
  set data(data: {}) {
    this.datum = data;
    this.myChart.data(data);
    // if (this.chartContainer) {
    //   this.myChart.data(data);
    // }
  }

  @Input()
  set options(options: ChartOptions) {
    this.myChart.x(options.xAxis ? d => d[options.xAxis.key] : undefined);
    this.myChart.y(options.yAxis ? d => d[options.yAxis.key] : undefined);
    this.myChart.width(options.width);
    this.myChart.height(options.height);
    this.myChart.margin(options.margin);
  }

  ngAfterViewInit(): void {
    d3
      .select(this.chartContainer.nativeElement)
      .datum(this.datum)
      .call(this.myChart);
  }
}
