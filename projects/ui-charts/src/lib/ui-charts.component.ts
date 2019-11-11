import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { ChartType } from './models';
import { BaseChartService } from './services/base-chart.service';

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

  private chartElement;
  private myChart;
  private initData: {};

  @ViewChild('chartContainer', { static: false }) private chartContainer: ElementRef;

  constructor(
    private baseChartService: BaseChartService
  ) { }

  @Input()
  set type(type: ChartType) {
    this.myChart = this.baseChartService.baseChart(type);
  }

  @Input()
  set data(data: {}) {
    this.initData = data;
    if (this.chartElement) {
      this.myChart.data(data);
    }
  }

  @Input()
  set options(options) {
    if (this.myChart) {
      this.myChart.width(options.width);
      this.myChart.height(options.height);
      this.myChart.margin(options.margin);
      this.myChart.x(options.xAxisDef ? d => d[options.xAxisDef.key] : undefined);
      this.myChart.y(options.yAxisDef ? d => d[options.yAxisDef.key] : undefined);
      this.myChart.xTickTransform(this.xTickTransform);
      this.myChart.yTickTransform(undefined);
    }
  }

  ngAfterViewInit(): void {
    this.setChartElement();
  }

  private setChartElement(): void {
    if (this.myChart) {
      this.chartElement = d3
        .select(this.chartContainer.nativeElement)
        .datum(this.initData)
        .call(this.myChart);
    }
  }


  /*
  TEMPORARY ASSIGNED HERE WHILE DECIDING HOW TO IMPLEMENT TICK TRANSFORMATION
   */
  private xTickTransform(d: number): string {
    return d3
      .format('.2~s')(d)
      .replace('M', ' mil')
      .replace('G', ' bil')
      .replace('T', ' tril');
  }
}
