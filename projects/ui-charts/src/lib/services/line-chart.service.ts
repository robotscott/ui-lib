import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesChartSettings, AxisSettings } from '../models/axes-chart.model';
import { DataHandlerService } from '../models/data-handler.model';
import { LineChartData } from '../models/line-chart.model';
import { BaseChartSettings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LineChartService implements DataHandlerService {

  constructor() { }

  public getEnterFn({ x, y, xScale, yScale, height }: AxesChartSettings) {

    const lineGen = this.getLineGen(xScale, yScale);

    return function(enter) {
      console.log(this.lineGen);

      const linesEnter = enter
        .append('path')
        .attr('class', d => 'data-node line')
        .attr('d', d => lineGen(d.values))
        .style('fill', 'none')
        .style('stroke', d => d.color || d3.interpolateSinebow(Math.random()));

      return linesEnter;
    };
  }

  public getUpdateFn({x, y, xScale, yScale, height }: AxesChartSettings) {

    const lineGen = this.getLineGen(x, y, xScale, yScale);

    return function(update) {
      const linesUpdate = update
        .transition()
        .attr('d', d => lineGen(d.values));

      linesUpdate
        .select('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(y(d)));

      return linesUpdate;
    };
  }

  public getXScale({x, width}: AxesChartSettings, data: LineChartData): d3.ScaleTime<number, number> {
    console.log('xScale data', data);
    const dates = this.getDomainData(x, data);
    return d3
      .scaleTime()
      .domain(d3.extent(dates))
      .range([0, width]);
  }

  public getYScale({x, y, height}: AxesChartSettings, data: LineChartData): d3.ScaleLinear<number, number> {
    console.log('yScale data', data);
    const dates = this.getDomainData(x, data);
    return d3
      .scaleLinear()
      .domain([0, d3.max(dates, (d): number => y(d))])
      .range([height, 0])
      .nice();
  }

  private getDomainData(x, data: LineChartData) {
    return data.reduce((dates, node) => {
      console.log(node);
      const nodeDates = node.value.map(point => point.date);
      return [...dates, ...nodeDates];
    }, []);
  }

  private getLineGen(x, y, xScale, yScale) {
    return d3
      .line()
      .x(d => xScale(x(d)))
      .y(d => yScale(y(d)));
  }
}
