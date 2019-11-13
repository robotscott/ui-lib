import * as d3 from 'd3';

import { BarChartService } from '../services/bar-chart.service';
import { LineChartService } from '../services/line-chart.service';
import { BaseChart, BaseChartOptions, BaseChartSettings } from './base-chart.model';
import { LineChartData } from './line-chart.model';

export interface AxesChart
  extends BaseChart {
  x?: any;
  y?: any;
  xTickTransform?: any;
  yTickTransform?: any;
}

export interface AxesChartOptions
  extends BaseChartOptions {
  xAxisDef?: AxisDef;
  yAxisDef?: AxisDef;
  xTickTransform?: (d: d3.AxisDomain) => string;
  yTickTransform?: (d: d3.AxisDomain) => string;
}

export interface AxesChartSettings
  extends BaseChartSettings,
  AxesChartOptions,
  AxisSettings,
  ScalesSettings {
  x?: any;
  y?: any;
}

export interface AxisSettings {
  drawXAxis?: any;
  drawYAxis?: any;
  xAxis?: d3.Axis<d3.AxisDomain>;
  yAxis?: d3.Axis<d3.AxisDomain>;
}

export interface ScalesSettings {
  xScale?: any;
  yScale?: any;
}

export interface AxisDef {
  key: string;
  label?: string;
}

export type AxesChartData = LineChartData;

export type AxesDataHandlerService = BarChartService | LineChartService;
