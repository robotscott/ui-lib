import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { AxisDef, BaseChartService, Margin } from './services/base-chart.service';

interface ChartOptions {
  xAxis?: AxisDef;
  yAxis?: AxisDef;
  width?: number;
  height?: number;
  margin?: Margin;
}
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
    this.drawChart();
  }

  @Input()
  set options(options: ChartOptions) {
    this.myChart.x(options.xAxis ? d => d[options.xAxis.key] : undefined);
    this.myChart.y(options.yAxis ? d => d[options.yAxis.key] : undefined);
    this.myChart.width(options.width);
    this.myChart.height(options.height);
    this.myChart.margin(options.margin);
    this.drawChart();
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private drawChart(): void {
    const randomColor = d3.interpolateSinebow(Math.random());
    console.log(randomColor)
    if (this.chartContainer) { // only draw chart when element is ready
      d3
        .select(this.chartContainer.nativeElement)
        .datum(this.datum)
        .call(this.myChart);
    }
  }

}
