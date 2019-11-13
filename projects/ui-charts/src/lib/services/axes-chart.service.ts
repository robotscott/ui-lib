import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import {
  AxesChart,
  AxesChartOptions,
  AxesChartSettings,
  AxesDataHandlerService,
  ChartType,
  ChartTypeService,
  AxesChartData,
  AxisSettings,
  ScalesSettings,
} from '../models';
import { BarChartService } from './bar-chart.service';
import { LineChartService } from './line-chart.service';

@Injectable({
  providedIn: 'root'
})
export class AxesChartService implements ChartTypeService {

  constructor(
    private barChartService: BarChartService,
    private lineChartService: LineChartService
  ) { }

  public handleOptionsUpdate(chart, options: AxesChartOptions) {
    // chart.x(options.xAxisDef ? d => d[options.xAxisDef.key] : undefined);
    // chart.y(options.yAxisDef ? d => d[options.yAxisDef.key] : undefined);
    chart.xTickTransform(options.xTickTransform);
    chart.yTickTransform(options.yTickTransform);
    return chart;
  }

  // public standardizeData(data, { x, y }: AxesChartSettings) {
  //   return data.map(d => [x(d), y(d)]);
  // }

  public initChartTypeSettings(
    type: ChartType,
    settings: AxesChartSettings,
    baseChart
  ): AxesChartSettings {
    const axis = this.initAxis(settings, baseChart);
    // const  =
    return {
      type,
      ...this.initAxis(settings, baseChart)
    };
    // return this.initAxis(settings, baseChart);
  }

  public addSetGetFns(chart: AxesChart, settings: AxesChartSettings): AxesChart {
    // chart.x = function(_?: (d: any) => any) {
    //   return arguments.length ? ((settings.x = _), chart) : settings.x;
    // };

    // chart.y = function(_?: (d: any) => any) {
    //   return arguments.length ? ((settings.y = _), chart) : settings.y;
    // };

    chart.xTickTransform = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.xTickTransform = _), chart) : settings.xTickTransform;
    };

    chart.yTickTransform = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.yTickTransform = _), chart) : settings.yTickTransform;
    };

    return chart;
  }

  public updateSettings(
    settings: AxesChartSettings,
    data: AxesChartData
  ): AxesChartSettings {
    const scales = this.setScales(settings, data);
    const joinFns = this.setJoinFns({ ...settings, ...scales });
    return { ...scales, ...joinFns };

  }

  public updateChart(
    settings: AxesChartSettings,
  ): AxesChartSettings {
    return this.updateAxis(settings);
  }

  public setJoinFns(settings: AxesChartSettings): AxesChartSettings {
    const dataHandlerService = this.setDataHandlerService(settings.type);
    const onEnter = dataHandlerService.getEnterFn(settings);
    const onUpdate = dataHandlerService.getUpdateFn(settings);
    return { onEnter, onUpdate };
  }

  private setScales(
    settings: AxesChartSettings, data: AxesChartData
  ): ScalesSettings {
    console.log(data);
    const dataHandlerService = this.setDataHandlerService(settings.type);
    const xScale = dataHandlerService.getXScale(data, settings.width);
    const yScale = dataHandlerService.getYScale(data, settings.height);
    return { xScale, yScale };
  }

  private initAxis(
    { xScale, yScale, xTickTransform, yTickTransform, height }: AxesChartSettings,
    baseChart
  ): AxisSettings {
    const xAxis = d3
      .axisBottom(xScale)
      .tickSizeOuter(0)
      .tickFormat(
        yTickTransform
      );
    const drawXAxis = baseChart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`);
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(
        xTickTransform
      );
    const drawYAxis = baseChart
      .append('g')
      .attr('class', 'y axis');
    return { xAxis, drawXAxis, yAxis, drawYAxis };
  }

  private updateAxis(settings: AxesChartSettings): AxesChartSettings {
    settings.drawYAxis.call(settings.yAxis.scale(settings.yScale));
    settings.drawXAxis.call(settings.xAxis.scale(settings.xScale));
    return settings;
  }

  private setDataHandlerService(type: ChartType): AxesDataHandlerService {
    switch (type) {
      case 'bar':
        return this.barChartService;
      case 'line':
        return this.lineChartService;
      default:
        throw new Error('Chart type must be set');
    }
  }
}
