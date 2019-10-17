import { Injectable } from '@angular/core';
import * as d3 from 'd3';

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AxisDef {
  key: string;
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseChartService {

  constructor() { }

  public baseChart(): any {

    // Default config values
    let margin: Margin = { top: 0, right: 0, bottom: 0, left: 0 };
    let width = 200 - margin.right - margin.left;
    let height = 100 - margin.top - margin.bottom;
    let x = d => d[0];
    let y = d => d[1];

    const getInnerDimensions = this.getInnerDimensions;

    function chart(selection) {
      selection.each(function(data, index) {

        const standardizedData: unknown[] = data.map(d => [x(d), y(d)]);

        // Scales
        const xScale = d3
          .scaleLinear()
          .domain([0, d3.max(standardizedData, d => d[0])])
          .range([0, innerWidth]);

        const yScale = d3
          .scaleBand()
          .domain(standardizedData.map(d => d[1]))
          .range([0, innerHeight])
          .padding(0.15);

        // Build chart base
        let svg = d3.select(this)
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

    chart.width = function(_?: number) {
      return arguments.length ? ((width = _ - margin.left - margin.right), chart) : width;
    };

    chart.height = function(_?: number) {
      return arguments.length ? ((height = _ - margin.top - margin.bottom), chart) : height;
    };

    chart.margin = function(_?: Margin) {
      if (arguments.length) {
        // Update widths with new margins
        const outerWidth = width + margin.left + margin.right;
        const outerHeight = width + margin.top + margin.bottom;
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

  // Remove margin from height and width to work with inner dimensions
  private getInnerDimensions(outerDimension: number, margin1: number, margin2: number): number {
    return outerDimension - margin1 - margin2;
  }
}
