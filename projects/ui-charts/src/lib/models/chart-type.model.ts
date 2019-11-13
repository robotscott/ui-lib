import { AxesChartSettings } from './axes-chart.model';

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

export type ChartTypeSettings =
  AxesChartSettings;

export interface ChartTypeService {
  initChartTypeSettings(type: ChartType, settings: ChartTypeSettings, baseChart, data): ChartTypeSettings;
  addSetGetFns(chart, settings);
  handleOptionsUpdate(chart, options);
  // standardizeData(data: {}, { x, y }: ChartTypeSettings);
  updateSettings(settings: ChartTypeSettings, data: {}): ChartTypeSettings;
  setJoinFns(settings: ChartTypeSettings): ChartTypeSettings;
  updateChart(settings: ChartTypeSettings): void;
  // updateChart(settings: ChartTypeSettings): ChartTypeSettings;
}
