export type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

export interface AxisDef {
  key: string;
  label?: string;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface DimensionSettings {
  width?: number;
  height?: number;
  margin?: Margin;
}

export interface BaseChartSettings extends
  DimensionSettings {
  onEnter?: any;
  onUpdate?: any;
}

export interface UIChartOptions {
  chartType?: ChartType;
  xAxis?: AxisDef;
  yAxis?: AxisDef;
  width?: number;
  height?: number;
  margin?: Margin;
}
