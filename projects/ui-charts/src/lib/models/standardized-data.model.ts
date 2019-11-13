import { BarChartValue } from './bar-chart.model';
import { LineChartValuePoint, LineChartValue } from './line-chart.model';

export type StandardizedData<T extends StandardizedValueType = StandardizedValueType> = StandardizedNodeData<T>[];
// export type StandardizedData<T extends StandardizedValueType> = StandardizedNodeData<T>[];

export interface StandardizedNodeData<T extends StandardizedValueType = StandardizedValueType> {
  label: string;
  color?: string;
  value: T;
}

export type StandardizedValueType = BarChartValue | LineChartValue;
