import { AxesChartSettings } from './axes-chart.model';

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

export type ChartTypeSettings =
  AxesChartSettings;

export interface ChartTypeService {
  updateSettingsWithBase(
    settings: ChartTypeSettings,
    baseChart
  ): ChartTypeSettings;
  addSetGetFns(chart, settings);
  standardizeData(data: {}, {x, y}: ChartTypeSettings);
  updateChartSettings(settings: ChartTypeSettings, data: {}): ChartTypeSettings;
  updateChart(settings: ChartTypeSettings): ChartTypeSettings;
  setJoinFns(settings: ChartTypeSettings): ChartTypeSettings;
}
