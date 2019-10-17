import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { BaseChartService } from './services/base-chart.service';
import { D3UtilsService } from './services/d3-utils.service';

const fox = [
  {
    studio: 'fox',
    title: 'Avatar',
    titleShort: 'Avatar',
    revenue: 2787965087,
  },
  {
    studio: 'fox',
    title: 'Ice Age: Dawn of the Dinosaurs',
    titleShort: 'Ice Age 3',
    revenue: 887739201,
  },
  {
    studio: 'fox',
    title: 'Ice Age: The Meltdown',
    titleShort: 'Ice Age 2',
    revenue: 714361864,
  },
];

const disney = [
  {
    studio: 'disney',
    title: 'Pirates of the Caribbean: Dead Man\'s Chest',
    titleShort: 'Pirates 2',
    revenue: 1134195026,
  },
  {
    studio: 'disney',
    title: 'Pirates of the Caribbean: At World\'s End',
    titleShort: 'Pirates 3',
    revenue: 997970603,
  },
  {
    studio: 'disney',
    title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    titleShort: 'Narnia 1',
    revenue: 821667244,
  },
];

@Component({
  selector: 'ui-charts',
  template: `
    <button (click)="click()">Toggle</button>
    <div class="chart-container" #chartContainer></div>
  `,
  styles: [`
    :host ::ng-deep svg { border: 1px solid #ccc }
  `]
})
export class UiChartsComponent implements OnInit, AfterViewInit {

  @ViewChild('chartContainer', {static: false}) private chartContainer: ElementRef;

  private myChart;
  private toggle = false;
  private drawProps: { chartContainer: HTMLElement; datum: any; myChart; };

  constructor(
    private d3UtilsService: D3UtilsService,
    private baseChartService: BaseChartService
  ) { }

  ngAfterViewInit(): void {
    this.myChart = this.baseChartService.baseChart();

    this.drawProps = {
      chartContainer: this.chartContainer.nativeElement,
      datum: fox,
      myChart: this.myChart
    };

    this.drawChart(this.drawProps);
  }

  ngOnInit() {
    // this.myChart = this.baseChartService.baseChart();

    // this.drawProps = {
    //   chartContainer: this.chartContainer.nativeElement,
    //   datum: fox,
    //   myChart: this.myChart
    // };

    // this.drawChart(this.drawProps);
  }

  public click() {
    const newWidth = this.toggle ? 200 : 400;

    this.myChart.width(newWidth);

    this.drawChart(this.drawProps);

    this.toggle = !this.toggle;
  }

  private drawChart({ chartContainer, datum, myChart }: { chartContainer: HTMLElement; datum: any; myChart; }): void {
    console.log(myChart);
    d3.select(chartContainer)
      .datum(datum)
      .call(myChart);
  }

}
