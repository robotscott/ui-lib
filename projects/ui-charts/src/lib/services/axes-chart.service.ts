import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import {
  AxesChart,
  AxesChartOptions,
  AxesChartSettings,
  AxesDataHandlerService,
  AxisSettings,
  ChartType,
  ChartTypeService,
  ScalesSettings,
  JoinFunctions,
  StandardizedNodeData,
  StandardizedData,
  AxisCoordinate,
  BarValue,
  LineValue,
  AxisValue,
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

  public addSetGetFns(
    settings: AxesChartSettings,
    chart: AxesChart
  ): AxesChart {
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

  public handleOptionsUpdate(
    { xAxisDef, yAxisDef, xTickTransform, yTickTransform }: AxesChartOptions,
    chart: AxesChart
  ) {
    chart.x(xAxisDef ? (d: StandardizedNodeData<AxisCoordinate>) => d[xAxisDef.key] : undefined);
    chart.y(yAxisDef ? (d: StandardizedNodeData<AxisCoordinate>) => d[yAxisDef.key] : undefined);
    chart.xTickTransform(xTickTransform);
    chart.yTickTransform(yTickTransform);
    return chart;
  }

  public initChartTypeSettings(
    type: ChartType,
    settings: AxesChartSettings,
    baseChart,
    data
  ): AxesChartSettings {
    const settingsWithType = { ...settings, type };
    const axis = this.initAxis(settingsWithType, baseChart);
    const chartSettings = this.setDrawingFns(settingsWithType, data);
    return {
      ...settingsWithType,
      ...axis,
      ...chartSettings
    };
  }

  public setDrawingFns(
    settings: AxesChartSettings,
    data: StandardizedData
  ): AxesChartSettings {
    const scales = this.setScales(settings, data);
    const joinFns = this.setJoinFns({ ...settings, ...scales });
    return { ...scales, ...joinFns };

  }

  public updateChart(
    settings: AxesChartSettings,
  ) {
    this.updateAxis(settings);
  }

  public setJoinFns(settings: AxesChartSettings): JoinFunctions {
    const dataHandlerService = this.setDataHandlerService(settings);
    const onEnter = dataHandlerService.getEnterFn(settings);
    const onUpdate = dataHandlerService.getUpdateFn(settings);
    return { onEnter, onUpdate };
  }

  private setScales(
    settings: AxesChartSettings,
    data: StandardizedData<AxisValue>
  ): ScalesSettings {
    const dataHandlerService = this.setDataHandlerService(settings);
    const xScale = dataHandlerService.getXScale(settings, data);
    const yScale = dataHandlerService.getYScale(settings, data);
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

  private updateAxis(
    { drawXAxis, xAxis, xScale, drawYAxis, yAxis, yScale }: AxesChartSettings
  ) {
    drawXAxis.call(xAxis.scale(xScale));
    drawYAxis.call(yAxis.scale(yScale));
  }

  private setDataHandlerService({ type }: AxesChartSettings): AxesDataHandlerService {
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
