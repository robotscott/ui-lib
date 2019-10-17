import { Injectable } from '@angular/core';
import * as d3 from 'd3';

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Injectable({
  providedIn: 'root'
})
export class BaseChartService {

  constructor() { }

  public baseChart() {

    // Default config values
    let margin: Margin = { top: 10, right: 10, bottom: 10, left: 10 };
    let width = 200;
    let height = 100;
    let x = (d: any[]) => d[0];
    let y = (d: any[]) => d[1];

    function chart(selection) {
      selection.each(function(data, index) {

        const standardizedData = data;

        // Build chart base
        let svg  = d3.select(this)
          .selectAll('svg')
          .data([standardizedData]);

        const svgEnter = svg.enter().append('svg');

        svgEnter.append('g').attr('class', 'chart');

        svg = svg.merge(svgEnter);

        // Set chart base dimensions
        svg
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

        const g = svg
          .select('g.chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
      });
    }

    chart.width = function (_?: number) {
      return arguments.length ? ((width = _), chart) : width;
    };

    chart.height = function (_?: number) {
      return arguments.length ? ((height = _), chart) : height;
    };

    chart.margin = function (_?: Margin) {
      return arguments.length ? ((margin = _), chart) : margin;
    };

    chart.x = function (_: (d: any[]) => any) {
      return arguments.length ? ((x = _), chart) : x;
    };

    chart.y = function (_: (d: any[]) => any) {
      return arguments.length ? ((y = _), chart) : y;
    };

    return chart;
  }
}
