import { BaseChartSettings } from './base-chart.model';

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

export interface AxesGraphSettings extends BaseChartSettings {
  x?: any;
  y?: any;
  xScale?: any;
  yScale?: any;
  drawXAxis?: any;
  drawYAxis?: any;
  xAxis?: any;
  yAxis?: any;
  xTickTransform?(d): number | string;
  yTickTransform?(d): number | string;
}
