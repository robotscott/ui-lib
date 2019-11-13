export type LineChartData = LineChartDataNode[];

export interface LineChartDataNode {
  label: string;
  color?: string;
  value: LineChartValue;
}

export type LineChartValue = LineChartValuePoint[];

export interface LineChartValuePoint {
  date: Date | string;
  value: number;
}

