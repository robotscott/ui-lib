import { AxisDomain } from 'd3';

export type BarChartData = BarChartDataNode[];

export interface BarChartDataNode {
  label: AxisDomain;
  value: number;
  color?: string;
}
