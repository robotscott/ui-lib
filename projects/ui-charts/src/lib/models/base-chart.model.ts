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

export interface ChartOptions {
  chartType?: ChartType;
  xAxis?: AxisDef;
  yAxis?: AxisDef;
  width?: number;
  height?: number;
  margin?: Margin;
}
