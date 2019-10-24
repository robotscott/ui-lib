export type AxesSettingsKeys =
  'xScale' |
  'yScale' |
  'drawXAxis' |
  'drawYAxis' |
  'xAxis' |
  'yAxis' |
  'onEnter' |
  'onUpdate';

export type AxesGraphSettings = {
  [K in AxesSettingsKeys]?: any;
};
