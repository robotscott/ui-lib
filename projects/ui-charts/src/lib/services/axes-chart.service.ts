import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesChartSettings, ChartType, ChartTypeService, DataHandlerService } from '../models';
import { BarChartService } from './bar-chart.service';

@Injectable({
  providedIn: 'root'
})
export class AxesChartService implements ChartTypeService {

  constructor(
    private barChartService: BarChartService
  ) { }

  public handleChartTypeOptions(myChart, options) {
    myChart.x(options.xAxisDef ? d => d[options.xAxisDef.key] : undefined);
    myChart.y(options.yAxisDef ? d => d[options.yAxisDef.key] : undefined);
    myChart.xTickTransform(options.xTickTransform || this.xTickTransform);
    myChart.yTickTransform(options.yTickTransform);
  }

  public standardizeData(data, { x, y }: AxesChartSettings) {
    return data.map(d => [x(d), y(d)]);
  }

  public updateSettingsWithBase(
    settings: AxesChartSettings,
    baseChart
  ): AxesChartSettings {
    return this.initAxis(settings, baseChart);
  }

  public addSetGetFns(chart, settings: AxesChartSettings) {
    chart.x = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.x = _), chart) : settings.x;
    };

    chart.y = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.y = _), chart) : settings.y;
    };

    chart.xTickTransform = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.xTickTransform = _), chart) : settings.xTickTransform;
    };

    chart.yTickTransform = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.yTickTransform = _), chart) : settings.yTickTransform;
    };

    return chart;
  }

  public updateChartSettings(
    settings: AxesChartSettings,
    data: {}
  ): AxesChartSettings {
    return this.setScales(settings, data);

  }

  public updateChart(
    settings: AxesChartSettings,
  ) {
    return this.updateAxis(settings);
  }

  public setJoinFns(settings: AxesChartSettings): AxesChartSettings {
    const dataHandlerService = this.setDataHandlerService(settings.type);
    const onEnter = dataHandlerService.getEnterFn(settings);
    const onUpdate = dataHandlerService.getUpdateFn(settings);
    return {...settings, onEnter, onUpdate};
  }

  private setScales(
    settings: AxesChartSettings, data: {}
  ): AxesChartSettings {
    const xScale = this.getXScale(data, settings.width);
    const yScale = this.getYScale(data, settings.height);
    return {...settings, xScale, yScale};
  }

  private initAxis(
    settings: AxesChartSettings,
    baseChart
  ): AxesChartSettings {
    settings.xAxis = d3
      .axisBottom(settings.xScale)
      .tickSizeOuter(0)
      .tickFormat(
        settings.yTickTransform
      );
    settings.drawXAxis = baseChart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${settings.height})`);
    settings.yAxis = d3
      .axisLeft(settings.yScale)
      .ticks(5)
      .tickFormat(
        settings.xTickTransform
      );
    settings.drawYAxis = baseChart
      .append('g')
      .attr('class', 'y axis');
    return settings;
  }

  private updateAxis(settings: AxesChartSettings): AxesChartSettings {
    settings.drawYAxis.call(settings.yAxis.scale(settings.yScale));
    settings.drawXAxis.call(settings.xAxis.scale(settings.xScale));
    return settings;
  }


  private getXScale(data, width) {
    return d3
      .scaleBand()
      .domain(data.map(d => d[1]))
      .range([0, width])
      .padding(0.15);
  }

  private getYScale(data, height) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d): number => d[0])])
      .range([height, 0])
      .nice();
  }

  private setDataHandlerService(type: ChartType): DataHandlerService {
    switch (type) {
      case 'bar':
        return this.barChartService;
      default:
        throw new Error('Chart type must be set');
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
