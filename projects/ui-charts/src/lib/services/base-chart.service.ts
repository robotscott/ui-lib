import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { BaseChartSettings, ChartType, BaseChart, StandardizedData, BaseChartOptions, StandardizedValueType } from '../models';
import { ChartTypeService } from '../models/chart-type.model';
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
    let settings: BaseChartSettings = this.initBaseSettings();
    const initBaseChart = this.initBaseChart(dimensionsService);

    // Additional closure variables
    let baseChart;
    let data;
    // const updateSettings = this.setUpdateSettings(chartService);
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
        settings = {
          ...settings,
          ...chartService.updateSettings(settings, data)
        };

        if (baseChart) {
          update(baseChart, data, settings);
        }
        return chart;
      }
      return data;
    };

    // Add setters and getters for dimensions
    dimensionsService.addSetGetFns(chart, settings);

    // Add setters and getters for chart type
    chartService.addSetGetFns(chart, settings);

    // Add options update handler
    chart.handleOptionsUpdate = function(options) {
      dimensionsService.handleOptionsUpdate(chart, options);
      chartService.handleOptionsUpdate(chart, options);
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

  // private setUpdateSettings(chartService) {
  //   return function(data: StandardizedData, settings) {
  //     return {
  //       ...settings,
  //       ...chartService.updateSettings(settings, data)
  //     };
  //   };
  // }

  private setUpdateFn(chartService) {
    return function(baseChart, data: StandardizedData, settings) {
      console.log(settings);
      baseChart.selectAll('.data-node')
        .data(data, d => settings.y(d))
        .join(settings.onEnter, settings.onUpdate, exit => exit.remove());

      chartService.updateChart(settings);
    };
  }


}
