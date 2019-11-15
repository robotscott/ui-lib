import { Injectable } from '@angular/core';

import { BaseChartSettings, Dimensions, Margin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DimensionsService {

  private readonly defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };
  private readonly defaultWidth = 300;
  private readonly defaultHeight = 200;

  constructor() { }

  public handleOptionsUpdate({ width, height, margin }: Dimensions, chart) {
    chart.width(width);
    chart.height(height);
    chart.margin(margin);
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

  public applyChartMargins(chartGroup, settings) {
    return chartGroup.attr('transform', `translate(${settings.margin.left}, ${settings.margin.top})`);
  }

  public addSetGetFns(settings: Dimensions, chart) {
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
