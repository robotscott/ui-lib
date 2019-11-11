export type LineChartData = LineChartDataNode[];

export interface LineChartDataNode {
  label: string;
  values: LineChartValuePoint[];
}

export interface LineChartValuePoint {
  date: Date;
  value: number;
}
