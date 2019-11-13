import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import {
  AxesChart,
  AxesChartData,
  AxesChartOptions,
  AxesChartSettings,
  AxesDataHandlerService,
  AxisSettings,
  ChartType,
  ChartTypeService,
  ScalesSettings,
  JoinFunctions,
  StandardizedNodeData,
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
    chart.x(options.xAxisDef ? (d: StandardizedNodeData) => d.value[options.xAxisDef.key] : undefined);
    chart.y(options.yAxisDef ? (d: StandardizedNodeData) => d.value[options.yAxisDef.key] : undefined);
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
    baseChart,
    data
  ): AxesChartSettings {
    const axis = this.initAxis({ ...settings, type }, baseChart);
    const chartSettings = this.updateSettings({ ...settings, type }, data);
    return {
      type,
      ...axis,
      ...chartSettings
    };
    // return this.initAxis(settings, baseChart);
  }

  public addSetGetFns(chart: AxesChart, settings: AxesChartSettings): AxesChart {
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

  public updateSettings(
    { x, y, type, width, height }: AxesChartSettings,
    data: AxesChartData
  ): AxesChartSettings {
    const scales = this.setScales({ x, y, type, width, height }, data);
    const joinFns = this.setJoinFns({ x, y, type, height, ...scales });
    return { ...scales, ...joinFns };

  }

  public updateChart(
    settings: AxesChartSettings,
  ) {
    this.updateAxis(settings);
  }

  public setJoinFns({ x, y, type, xScale, yScale, height }: AxesChartSettings): JoinFunctions {
    const dataHandlerService = this.setDataHandlerService(type);
    const onEnter = dataHandlerService.getEnterFn({ x, y, xScale, yScale, height });
    const onUpdate = dataHandlerService.getUpdateFn({ x, y, xScale, yScale, height });
    return { onEnter, onUpdate };
  }

  private setScales(
    { x, y, type, width, height }: AxesChartSettings,
    data: AxesChartData
  ): ScalesSettings {
    console.log(type, data);
    const dataHandlerService = this.setDataHandlerService(type);
    const xScale = dataHandlerService.getXScale(y, data, width);
    const yScale = dataHandlerService.getYScale(x, data, height);
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

  private updateAxis({ drawXAxis, xAxis, xScale, drawYAxis, yAxis, yScale }: AxesChartSettings) {
    console.log('update', { drawXAxis, xAxis, xScale, drawYAxis, yAxis, yScale })
    drawXAxis.call(xAxis.scale(xScale));
    drawYAxis.call(yAxis.scale(yScale));
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
