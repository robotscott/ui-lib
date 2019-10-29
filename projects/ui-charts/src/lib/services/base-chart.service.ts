import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BaseChartSettings, ChartType, Margin } from '../models';
import { ChartTypeService } from '../models/chart-type.model';
import { BarChartService } from './bar-chart.service';
import { DimensionsService } from './dimensions.service';

@Injectable({
  providedIn: 'root'
})
export class BaseChartService {

  constructor(
    private barChartService: BarChartService,
    private dimensionsService: DimensionsService
  ) { }

  public baseChart(type: ChartType): any {
    // Define chart service based on chart type
    const chartService = this.setChartService(type);
    const dimensionsService = this.dimensionsService;
    const initBaseChart = this.initBaseChart(this.dimensionsService);

    const settings: BaseChartSettings = this.initSettings();

    // Additional closure variables
    let baseChart;
    let standardizedData;
    const update = this.setUpdateFn(chartService, settings);

    function chart(selection) {
      selection.each(function(data) {
        // Standardize data for chart type
        standardizedData = chartService.standardizeData(data, settings);

        // Build chart base
        baseChart = initBaseChart(this, standardizedData, type, settings);

        // Update setting for chart type that require baseChart
        chartService.updateSettingsWithBase(settings, baseChart);

        // Draw visual
        update(baseChart, standardizedData);

      });
    }

    // Add setters and getters for base chart
    chart.data = function(_?: {}) {
      if (arguments.length) {
        standardizedData = chartService.standardizeData(_, settings);

        if (baseChart) {
          update(baseChart, standardizedData);
        }
        return chart;
      }
      return standardizedData;
    };

    // Add setters and getters for dimensions
    dimensionsService.addSetGetFns(chart, settings);

    // Add setters and getters for chart type
    chartService.addSetGetFns(chart, settings);

    return chart;
  }

  private initBaseChart(dimensionsService) {
    return function(container, standardizedData, type, settings) {
      let svg = d3.select(container)
        .selectAll('svg')
        .data([standardizedData]);

      const svgEnter = svg.enter().append('svg');

      svgEnter.append('g').attr('class', 'chart ' + type);

      svg = svg.merge(svgEnter);

      // Set chart base dimensions
      dimensionsService.setWidthHeight(svg, settings);

      const baseChart = dimensionsService.applyChartMargins(
        svg.select('g.chart'),
        settings
      );

      return baseChart;
    };
  }

  private setChartService(type: ChartType): ChartTypeService {
    switch (type) {
      case 'bar':
        return this.barChartService;
      default:
        throw new Error('Chart type must be set');
    }
  }

  private initSettings(): BaseChartSettings {
    const settings = {};

    // add default dimensions
    this.dimensionsService.setDefaultChartDimensions(settings);
    return settings;
  }

  private setUpdateFn(chartService, settings) {
    return function(baseChart, standardizedData) {
      chartService.updateChartSettings(settings, standardizedData);
      chartService.setJoinFns(settings);

      baseChart.selectAll('.data-node')
        .data(standardizedData, d => d[1])
        .join(settings.onEnter, settings.onUpdate, exit => exit.remove());

      chartService.updateChart(settings);
    };
  }


}
