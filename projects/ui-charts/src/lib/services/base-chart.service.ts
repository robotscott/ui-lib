import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BaseChart, BaseChartOptions, BaseChartSettings, ChartType, StandardizedData } from '../models';
import { ChartTypeService, ChartTypeSettings } from '../models/chart-type.model';
import { AxesChartService } from './axes-chart.service';
import { DimensionsService } from './dimensions.service';

@Injectable({
  providedIn: 'root'
})
export class BaseChartService {

  constructor(
    private axesChartService: AxesChartService,
    private dimensionsService: DimensionsService
  ) { }

  public baseChart(type: ChartType): BaseChart {

    // Define chart service based on chart type
    const chartService = this.setChartService(type);
    const dimensionsService = this.dimensionsService;
    let settings: ChartTypeSettings = this.initBaseSettings();
    const initBaseChart = this.initBaseChart(dimensionsService);

    // Additional closure variables
    let baseChart;
    let data;
    const update = this.setUpdateFn(chartService);

    function chart(selection: d3.Selection<any, {}, null, undefined>) {
      selection.each(function(initData: StandardizedData) {
        data = initData;

        // Build chart base
        baseChart = initBaseChart(this, data, type, settings);

        // Update setting for chart type that require baseChart
        settings = {
          ...settings,
          ...chartService.initChartTypeSettings(type, settings, baseChart, data)
        };

        // Draw visual
        update(baseChart, data, settings);

      });
    }

    // Add setters and getters for base chart
    chart.data = function(_?: StandardizedData) {
      if (arguments.length) {
        data = _;

        // Update chart drawing functions
        settings = {
          ...settings,
          ...chartService.setDrawingFns(settings, data)
        };

        if (baseChart) {
          update(baseChart, data, settings);
        }
        return chart;
      }
      return data;
    };

    // Add setters and getters for dimensions
    dimensionsService.addSetGetFns(settings, chart);

    // Add setters and getters for chart type
    chartService.addSetGetFns(settings, chart);

    // Add options update handler
    chart.handleOptionsUpdate = function(options) {
      dimensionsService.handleOptionsUpdate(options, chart);
      chartService.handleOptionsUpdate(options, chart);
    };

    return chart;
  }

  private initBaseChart(dimensionsService) {
    return function(
      container: d3.BaseType,
      data: StandardizedData,
      type: ChartType,
      options: BaseChartOptions
    ) {
      let svg = d3.select(container)
        .selectAll('svg')
        .data([data]);

      const svgEnter = svg.enter().append('svg');

      svgEnter.append('g').attr('class', 'chart ' + type);

      svg = svg.merge(svgEnter);

      // Set chart base dimensions
      dimensionsService.setWidthHeight(svg, options);

      const baseChart = dimensionsService.applyChartMargins(
        svg.select('g.chart'),
        options
      );

      return baseChart;
    };
  }

  private setChartService(type: ChartType): ChartTypeService {
    switch (type) {
      case 'bar':
        return this.axesChartService;
      case 'line':
        return this.axesChartService;
      default:
        throw new Error('Chart type must be set');
    }
  }

  private initBaseSettings(): BaseChartSettings {
    return this.dimensionsService.getDefaultChartDimensions();
  }

  private setUpdateFn(chartService) {
    return function(baseChart, data: StandardizedData, settings) {
      baseChart.selectAll('.data-node')
        .data(data, d => d.label)
        .join(settings.onEnter, settings.onUpdate, exit => exit.remove());

      chartService.updateChart(settings);
    };
  }


}
