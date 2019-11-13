import { AxisDomain } from 'd3';

export type BarChartData = BarChartDataNode[];

export interface BarChartDataNode {
  label: AxisDomain;
  value: number;
  color?: string;
}

export interface BarChartValue
  extends X,
  Y { }

interface X {
  [x: string]: any;
}

interface Y {
  [y: string]: any;
}
