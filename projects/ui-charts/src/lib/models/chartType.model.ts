import { AxesGraphSettings } from './axesGraph.model';

type ChartTypeSettings =
  AxesGraphSettings;

export interface ChartTypeService {
  initSettings(): ChartTypeSettings;
  updateSettingsWithBase(
    settings: ChartTypeSettings,
    baseChart
  ): ChartTypeSettings;
  addSetGetFns(chart, settings);
  standardizeData(data: {}, {x, y}: ChartTypeSettings);
  updateChartSettings(settings: ChartTypeSettings, data: {}): ChartTypeSettings;
  updateChart(settings: ChartTypeSettings): ChartTypeSettings;
}
