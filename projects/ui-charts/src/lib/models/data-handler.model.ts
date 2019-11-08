import { ChartTypeSettings } from './chart-type.model';

export interface DataHandlerService {
  getEnterFn(settings: ChartTypeSettings);
  getUpdateFn(settings: ChartTypeSettings);
}
