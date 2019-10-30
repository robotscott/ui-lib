import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesGraphSettings } from '../models/axes-graph.model';
import { ChartTypeService } from '../models/chart-type.model';
import { AxesService } from './axes.service';

@Injectable({
  providedIn: 'root'
})
export class BarChartService implements ChartTypeService {

  constructor(
    private axesService: AxesService
  ) { }

  public standardizeData(data, { x, y }: AxesGraphSettings) {
    return data.map(d => [x(d), y(d)]);
  }

  public updateSettingsWithBase(
    settings: AxesGraphSettings,
    baseChart
  ): AxesGraphSettings {
    return this.axesService.initAxis(settings, baseChart);
  }

  public addSetGetFns(chart, settings) {
    chart.x = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.x = _), chart) : settings.x;
    };

    chart.y = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.y = _), chart) : settings.y;
    };

    chart.xTickTransform = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.xTickTransform = _), chart) : settings.xTickTransform;
    };

    chart.yTickTransform = function(_?: (d: any) => any) {
      return arguments.length ? ((settings.yTickTransform = _), chart) : settings.yTickTransform;
    };

    return chart;
  }

  public updateChartSettings(
    settings: AxesGraphSettings,
    data: {}
  ): AxesGraphSettings {
    return this.axesService.setScales(settings, data);

  }

  public setJoinFns(settings: AxesGraphSettings): AxesGraphSettings {
    settings.onEnter = this.getEnterFn(settings);
    settings.onUpdate = this.getUpdateFn(settings);
    return settings;
  }

  public updateChart(
    settings: AxesGraphSettings,
  ) {
    return this.axesService.updateAxis(settings);
  }

  private getEnterFn({ xScale, yScale, height }: AxesGraphSettings) {
    return function(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'data-node')
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
