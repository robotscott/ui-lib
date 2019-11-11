import { Injectable } from '@angular/core';
import { BaseChartSettings, BaseChartOptions, Margin } from '../models';
import { Selection, BaseType } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class DimensionsService {

  private readonly defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };
  private readonly defaultWidth = 300;
  private readonly defaultHeight = 200;

  constructor() { }

  public handleOptionsUpdate(chart, options) {
    chart.width(options.width);
    chart.height(options.height);
    chart.margin(options.margin);
    return chart;
  }

  public getDefaultChartDimensions(): BaseChartSettings {

    const margin = this.defaultMargin;
    const width = this.defaultWidth - this.defaultMargin.right - this.defaultMargin.left;
    const height = this.defaultHeight - this.defaultMargin.top - this.defaultMargin.bottom;

    return { margin, width, height };
  }

  public setWidthHeight<T>(svg, { width, height, margin }: BaseChartSettings): T {
    // viewBox use for responsive scaling
    svg
      .attr(
        'viewBox',
        `
          0 0
          ${width + margin.left + margin.right}
          ${height + margin.top + margin.bottom}
        `
      );
    return svg;
  }

  public setDimensionsWithMargin(margin: Margin, settings: BaseChartSettings): BaseChartSettings {
    const outerWidth = settings.width + settings.margin.left + settings.margin.right;
    const outerHeight = settings.height + settings.margin.top + settings.margin.bottom;
    settings.width = outerWidth - margin.left - margin.right;
    settings.height = outerHeight - margin.top - margin.bottom;

    return settings;
  }

  public applyChartMargins(chartGroup, settings) {
    return chartGroup.attr('transform', `translate(${settings.margin.left}, ${settings.margin.top})`);
  }

  public addSetGetFns(chart, settings) {
    chart.width = function(_?: number) {
      return arguments.length ? ((settings.width = _ - settings.margin.left - settings.margin.right), chart) : settings.width;
    };

    chart.height = function(_?: number) {
      return arguments.length ? ((settings.height = _ - settings.margin.top - settings.margin.bottom), chart) : settings.height;
    };

    chart.margin = function(_?: Margin) {
      if (arguments.length) {
        // Update height and width with new margins
        const outerWidth = settings.width + settings.margin.left + settings.margin.right;
        const outerHeight = settings.height + settings.margin.top + settings.margin.bottom;
        settings.width = outerWidth - settings.margin.left - settings.margin.right;
        settings.height = outerHeight - settings.margin.top - settings.margin.bottom;

        settings.margin = _;

        return chart;
      }
      return settings.margin;
    };
  }
}
