import { Dimensions } from './dimensions.model';
import { ChartType } from './chart-type.model';

export { Dimensions as BaseChartOptions };

export interface BaseChartSettings extends
  Dimensions {
  type?: ChartType;
  onEnter?: any;
  onUpdate?: any;
}
