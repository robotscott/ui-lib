import { AxisValue } from './axes-chart.model';

export type StandardizedData<T = StandardizedValues> = StandardizedNodeData<T>[];

export interface StandardizedNodeData<T = StandardizedValues> {
  label: string;
  color?: string;
  value: T;
}

export type StandardizedValues = AxisValue;
