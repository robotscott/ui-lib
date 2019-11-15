import { AxesChartSettings } from './axes-chart.model';
import { StandardizedData } from './standardized-data.model';

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

export type ChartTypeSettings =
  AxesChartSettings;

export interface ChartTypeService {
  initChartTypeSettings(type: ChartType, settings: ChartTypeSettings, baseChart, data: StandardizedData): ChartTypeSettings;
  addSetGetFns(settings: ChartTypeSettings, chart);
  handleOptionsUpdate(chart, options);
  setDrawingFns(settings: ChartTypeSettings, data: StandardizedData): ChartTypeSettings;
  setJoinFns(settings: ChartTypeSettings): ChartTypeSettings;
  updateChart(settings: ChartTypeSettings): void;
}
