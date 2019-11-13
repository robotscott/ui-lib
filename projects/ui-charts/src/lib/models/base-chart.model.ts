import { ChartType } from './chart-type.model';
import { Dimensions } from './dimensions.model';

export { Dimensions as BaseChartOptions };

export interface BaseChartSettings
  extends Dimensions,
  JoinFunctions {
  type?: ChartType;
}

export interface BaseChart {
  (selection: d3.Selection<any, {}, null, undefined>): void;
  data?: (_?: {}) => any;
  handleOptionsUpdate?: (options: any) => void;
}

export interface JoinFunctions {
  onEnter?(setings: BaseChartSettings): BaseChartSettings;
  onUpdate?(settings: BaseChartSettings): BaseChartSettings;
}
