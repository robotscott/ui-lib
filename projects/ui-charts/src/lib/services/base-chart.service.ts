import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { Margin, ChartType } from '../models';
import { BarChartService } from './bar-chart.service';

@Injectable({
  providedIn: 'root'
})
export class BaseChartService {

  constructor(
    private barChartService: BarChartService
  ) { }

  public baseChart(): any {

    // Default config values
    let type: ChartType;
    let margin: Margin = { top: 0, right: 0, bottom: 0, left: 0 };
    let width = 300 - margin.right - margin.left;
    let height = 200 - margin.top - margin.bottom;
    let x = d => d[0];
    let y = d => d[1];

    const genDataHandlers = this.barChartService.barChart;

    function chart(selection) {

      selection.each(function(data) {
        const standardizedData: any[] = data.map(d => [x(d), y(d)]);

        const { onEnter, onUpdate } = genDataHandlers({ standardizedData, width, height });

        // Build chart base
        let svg = d3.select(this)
          .selectAll('svg')
          .data([standardizedData]);

        const svgEnter = svg.enter().append('svg');

        svgEnter.append('g').attr('class', 'chart');

        svg = svg.merge(svgEnter);

        // Set chart base dimensions
        svg
          .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

        const g = svg
          .select('g.chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Draw visual
        g.selectAll('.bar')
          .data(standardizedData, d => d[1])
          .join(onEnter, onUpdate, exit => exit.remove());
      });
    }

    chart.type = function(_?: ChartType) {
      return arguments.length ? ((type = _), chart) : type;
    };

    chart.width = function(_?: number) {
      return arguments.length ? ((width = _ - margin.left - margin.right), chart) : width;
    };

    chart.height = function(_?: number) {
      return arguments.length ? ((height = _ - margin.top - margin.bottom), chart) : height;
    };

    chart.margin = function(_?: Margin) {
      if (arguments.length) {
        // Update height and width with new margins
        const outerWidth = width + margin.left + margin.right;
        const outerHeight = height + margin.top + margin.bottom;
        width = outerWidth - _.left - _.right;
        height = outerHeight - _.top - _.bottom;

        margin = _;

        return chart;
      }
      return arguments.length ? ((margin = _), chart) : margin;
    };

    chart.x = function(_?: (d: any) => any) {
      return arguments.length ? ((x = _), chart) : x;
    };

    chart.y = function(_?: (d: any) => any) {
      return arguments.length ? ((y = _), chart) : y;
    };

    return chart;
  }
}
