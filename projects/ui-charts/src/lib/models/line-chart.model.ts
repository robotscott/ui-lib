import { AxisCoordinate } from './axes-chart.model';
import { StandardizedData, StandardizedNodeData } from './standardized-data.model';

export type LineChartData = StandardizedData<LineValue>;
export type LineNodeData = StandardizedNodeData<LineValue>;
export type LineValue = AxisCoordinate[];

