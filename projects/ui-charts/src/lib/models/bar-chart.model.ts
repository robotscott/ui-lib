import { AxisCoordinate } from './axes-chart.model';
import { StandardizedData, StandardizedNodeData } from './standardized-data.model';

export type BarChartData = StandardizedData<BarValue>;
export type BarNodeData = StandardizedNodeData<BarValue>;
export type BarValue = AxisCoordinate;
