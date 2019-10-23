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

    let xScale;
    let yScale;
    let onEnter;
    let onUpdate;
    let chartGroup;
    let standardizedData;

    const chartService = this.barChartService;
    const formatTicks = this.formatTicks;

    function chart(selection) {
      selection.each(function(data) {
        standardizedData = standardizeData(data);

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

        chartGroup = svg
          .select('g.chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);


        // Draw visual
        update();

      });
    }

    chart.data = function(_?) {
      if (arguments.length) {
        standardizedData = standardizeData(_);
        console.log('new data: ', standardizedData);

        if (chartGroup) {
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

    function update() {

      setScales();
      setJoinFns();

      // Set axis
      const xAxis = d3
        .axisBottom(xScale);

      const drawXAxis = chartGroup
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickFormat(formatTicks);

      const drawYAxis = chartGroup
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis);


      chartGroup.selectAll('.bar')
        .data(standardizedData, d => d)
        .join(onEnter, onUpdate, exit => exit.remove());
    }

    function standardizeData(data) {
      return data.map(d => [x(d), y(d)]);
    }

    function setScales() {
      xScale = chartService.getXScale(standardizedData, width);
      yScale = chartService.getYScale(standardizedData, height);
    }

    function setJoinFns() {
      onEnter = chartService.getEnterFn(xScale, yScale, height);
      onUpdate = chartService.getUpdateFn(xScale, yScale, height);
    }

    return chart;
  }

  private formatTicks(d: number): string {
    return d3
      .format('.2~s')(d)
      .replace('M', ' mil')
      .replace('G', ' bil')
      .replace('T', ' tril');
  }
}
