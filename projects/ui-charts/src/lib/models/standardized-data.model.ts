import { BarChartValue } from './bar-chart.model';
import { LineChartValuePoint, LineChartValue } from './line-chart.model';

export type StandardizedData<T = StandardizedValueType> = StandardizedNodeData<T>[];

export interface StandardizedNodeData<T> {
  label: string;
  color?: string;
  value: T;
}

export type StandardizedValueType = BarChartValue | LineChartValue;
