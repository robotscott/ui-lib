import { BarValue } from './bar-chart.model';
import { LineValue } from './line-chart.model';

export type StandardizedData<T = StandardizedValues> = StandardizedNodeData<T>[];

export interface StandardizedNodeData<T> {
  label: string;
  color?: string;
  value: T;
}

export type StandardizedValues = BarValue | LineValue;


