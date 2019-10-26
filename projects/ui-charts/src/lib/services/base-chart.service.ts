import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BaseChartSettings, ChartType, Margin } from '../models';
import { ChartTypeService } from '../models/chartType.model';
import { BarChartService } from './bar-chart.service';

@Injectable({
  providedIn: 'root'
})
export class BaseChartService {

  constructor(
    private barChartService: BarChartService
  ) { }

  public baseChart(type: ChartType): any {
    // Define chart service based on chart type
    const chartService = this.setChartService(type);

    // Initiate settings specific to chart type
    let settings = chartService.initSettings();

    // Default dimensional values
    this.setDimensions(settings);

    // Additional closure variables
    let baseChart;
    let standardizedData;

    function chart(selection) {
      selection.each(function(data) {
        // Standardize data for chart type
        standardizedData = chartService.standardizeData(data, settings);

        // Build chart base
        let svg = d3.select(this)
          .selectAll('svg')
          .data([standardizedData]);

        const svgEnter = svg.enter().append('svg');

        svgEnter.append('g').attr('class', 'chart');

        svg = svg.merge(svgEnter);

        // Set chart base dimensions
        // viewBox use for responsive scaling
        svg
          .attr(
            'viewBox',
            `
              0 0
              ${settings.width + settings.margin.left + settings.margin.right}
              ${settings.height + settings.margin.top + settings.margin.bottom}
            `
          );

        baseChart = svg
          .select('g.chart')
          .attr('transform', `translate(${settings.margin.left}, ${settings.margin.top})`);

        // Set axis
        chartService.updateSettingsWithBase(settings, baseChart);

        // Draw visual
        update();

      });
    }

    // Add setters and getters for base chart
    chart.data = function(_?: {}) {
      if (arguments.length) {
        standardizedData = chartService.standardizeData(_, settings);

        if (baseChart) {
          update();
        }
        return chart;
      }
      return standardizedData;
    };

    chart.type = function(_?: ChartType) {
      return arguments.length ? ((type = _), chart) : type;
    };

    chart.width = function(_?: number) {
      return arguments.length ? ((settings.width = _ - settings.margin.left - settings.margin.right), chart) : settings.width;
    };

    chart.height = function(_?: number) {
      return arguments.length ? ((settings.height = _ - settings.margin.top - settings.margin.bottom), chart) : settings.height;
    };

    chart.margin = this.marginGetSet(chart, settings);

    // Add setters and getters for chart type
    chartService.addSetGetFns(chart, settings);

    function update() {

      settings = chartService.updateChartSettings(settings, standardizedData);

      baseChart.selectAll('.bar')
        .data(standardizedData, d => d[1])
        .join(settings.onEnter, settings.onUpdate, exit => exit.remove());

      chartService.updateChart(settings);
    }

    return chart;
  }

  private setChartService(type: ChartType): ChartTypeService {
    switch (type) {
      case 'bar':
        return this.barChartService;
      default:
        throw new Error('Chart type must be set');
    }
  }

  private setDimensions(settings: BaseChartSettings): BaseChartSettings {
    settings.margin = { top: 0, right: 0, bottom: 0, left: 0 };
    settings.width = 300 - settings.margin.right - settings.margin.left;
    settings.height = 200 - settings.margin.top - settings.margin.bottom;
    return;
  }

  private marginGetSet(chart, settings: BaseChartSettings) {
    return function(_?: Margin) {
      if (arguments.length) {
        // Update height and width with new margins
        const outerWidth = settings.width + settings.margin.left + settings.margin.right;
        const outerHeight = settings.height + settings.margin.top + settings.margin.bottom;
        settings.width = outerWidth - _.left - _.right;
        settings.height = outerHeight - _.top - _.bottom;

        settings.margin = _;

        return chart;
      }
      return arguments.length ? ((settings.margin = _), chart) : settings.margin;
    };
  }
}
