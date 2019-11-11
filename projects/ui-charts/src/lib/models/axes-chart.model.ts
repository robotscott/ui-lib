import { BaseChartSettings, BaseChartOptions } from './base-chart.model';
import { Axis, AxisDomain } from 'd3';

export interface AxesChartOptions extends BaseChartOptions {
  xAxisDef?: AxisDef;
  yAxisDef?: AxisDef;
  xTickTransform?: (d: AxisDomain) => string;
  yTickTransform?: (d: AxisDomain) => string;
}

export interface AxesChartSettings extends
  BaseChartSettings,
  AxesChartOptions {
  x?: any;
  y?: any;
  xScale?: any;
  yScale?: any;
  drawXAxis?: any;
  drawYAxis?: any;
  xAxis?: Axis<AxisDomain>;
  yAxis?: Axis<AxisDomain>;
}

export interface AxisDef {
  key: string;
  label?: string;
}

export type AxesSettingsKeys =
  'x' |
  'y' |
  'xScale' |
  'yScale' |
  'drawXAxis' |
  'drawYAxis' |
  'xAxis' |
  'yAxis' |
  'xTickTransform' |
  'yTickTransform';

// export type AxesGraphSettings = {
//   [K in AxesSettingsKeys]?: any;
// };


