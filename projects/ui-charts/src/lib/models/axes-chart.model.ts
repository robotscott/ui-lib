import { BaseChartSettings, BaseChartOptions } from './base-chart.model';

export interface AxesChartOptions extends BaseChartOptions {
  xAxis?: AxisDef;
  yAxis?: AxisDef;
  xTickTransform?: (d: number | string) => string;
  yTickTransform?: (d: number | string) => string;
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


export interface AxesChartSettings extends BaseChartSettings {
  x?: any;
  y?: any;
  xScale?: any;
  yScale?: any;
  drawXAxis?: any;
  drawYAxis?: any;
}
