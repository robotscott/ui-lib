import { ChartType } from './chart-type.model';
import { Dimensions } from './dimensions.model';

export { Dimensions as BaseChartOptions };

export interface BaseChartSettings
  extends Dimensions {
  type?: ChartType;
  onEnter?: any;
  onUpdate?: any;
}
