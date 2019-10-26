import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesGraphSettings } from '../models/axesGraph.model';
import { ChartTypeService } from '../models/chartType.model';

@Injectable({
  providedIn: 'root'
})
export class BarChartService implements ChartTypeService {

  constructor() { }

  public initSettings(): AxesGraphSettings {
    return {
      x: d => d[0],
      y: d => d[1]
    };
  }

  public updateSettingsWithBase(
    settings: AxesGraphSettings,
    baseChart,
  ): AxesGraphSettings {
    settings.xAxis = d3
      .axisBottom(settings.xScale)
      .tickSizeOuter(0);
    settings.drawXAxis = baseChart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${settings.height})`);
    settings.yAxis = d3
      .axisLeft(settings.yScale)
      .ticks(5)
      .tickFormat(this.formatTicks);
    settings.drawYAxis = baseChart
      .append('g')
      .attr('class', 'y axis');
    return settings;
  }

  public addSetGetFns(chart, settings) {
    chart.x = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.x = _), chart) : settings.x;
    };

    chart.y = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.y = _), chart) : settings.y;
    };

    return chart;
  }

  public standardizeData(data, { x, y }: AxesGraphSettings) {
    return data.map(d => [x(d), y(d)]);
  }

  public updateChartSettings(
    settings: AxesGraphSettings,
    data: {}
  ): AxesGraphSettings {
    settings.xScale = this.getXScale(data, settings.width);
    settings.yScale = this.getYScale(data, settings.height);
    settings.onEnter = this.getEnterFn(settings);
    settings.onUpdate = this.getUpdateFn(settings);
    return settings;

  }

  public updateChart(
    settings: AxesGraphSettings,
  ) {
    settings.drawYAxis.call(settings.yAxis.scale(settings.yScale));
    settings.drawXAxis.call(settings.xAxis.scale(settings.xScale));
    return settings;
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

  private getEnterFn({ xScale, yScale, height }: AxesGraphSettings) {
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

  private getUpdateFn({ xScale, yScale, height }: AxesGraphSettings) {
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
