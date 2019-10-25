import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { AxesGraphSettings } from '../models/axesGraph.model';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor() { }

  public initChartSettings(
    settings: AxesGraphSettings,
    chartGroup,
    height: number
  ): AxesGraphSettings {
    return {
      ...settings,
      xAxis: d3
        .axisBottom(settings.xScale)
        .tickSizeOuter(0),
      drawXAxis: chartGroup
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`),
      yAxis: d3
        .axisLeft(settings.yScale)
        .ticks(5)
        .tickFormat(this.formatTicks),
      drawYAxis: chartGroup
        .append('g')
        .attr('class', 'y axis')
    };
  }

  public updateChartSettings(
    settings: AxesGraphSettings,
    data: {},
    width: number,
    height: number
  ): AxesGraphSettings {
    settings.xScale = this.getXScale(data, width);
    settings.yScale = this.getYScale(data, height);
    settings.onEnter = this.getEnterFn(settings.xScale, settings.yScale, height);
    settings.onUpdate = this.getUpdateFn(settings.xScale, settings.yScale, height);
    return settings;

  }

  public updateChart(
    settings: AxesGraphSettings,
    data: {},
    height: number,
    width: number
  ) {
    settings.xScale = this.getXScale(data, width);
    settings.yScale = this.getYScale(data, height);
  }

  private getXScale(data, width) {
    return d3
      .scaleBand()
      .domain(data.map(d => d[1]))
      .range([0, width])
      .padding(0.15);
  }

  private getYScale(data, height) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d): number => d[0])])
      .range([height, 0])
      .nice();
  }

  private getEnterFn(xScale, yScale, height) {
    return function(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'bar')
        .attr('transform', d => `translate(${xScale(d[1])}, ${yScale(d[0])})`);

      barsEnter
        .append('rect')
        .data(d => d)
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[0]))
        .style('fill', () => d3.interpolateSinebow(Math.random()));

      barsEnter
        .append('text')
        .text(d => d[1])
        .attr('y', xScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsEnter;
    };
  }

  private getUpdateFn(xScale, yScale, height) {
    return function(update) {
      const barsUpdate = update
        .transition()
        .attr('transform', d => `translate(${xScale(d[1])}, ${yScale(d[0])})`);

      barsUpdate
        .select('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[0]));

      return barsUpdate;
    };
  }

  private formatTicks(d: number): string {
    return d3
      .format('.2~s')(d)
      .replace('M', ' mil')
      .replace('G', ' bil')
      .replace('T', ' tril');
  }
}
