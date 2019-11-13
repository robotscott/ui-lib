import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { ChartType, StandardizedData, StandardizedValueType } from './models';
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
  private initData: StandardizedData<StandardizedValueType>;

  @ViewChild('chartContainer', { static: false }) private chartContainer: ElementRef;

  constructor(
    private baseChartService: BaseChartService
  ) { }

  @Input()
  set type(type: ChartType) {
    this.myChart = this.baseChartService.baseChart(type);
  }

  @Input()
  set data(data: StandardizedData<StandardizedValueType>) {
    this.initData = data;
    if (this.chartElement) {
      this.myChart.data(data);
    }
  }

  @Input()
  set options(options) {
    if (this.myChart) {
      this.myChart.handleOptionsUpdate(options);
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
  // private xTickTransform(d: number): string {
  //   return d3
  //     .format('.2~s')(d)
  //     .replace('M', ' mil')
  //     .replace('G', ' bil')
  //     .replace('T', ' tril');
  // }
}
