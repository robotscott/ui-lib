import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesChartSettings } from '../models/axes-chart.model';
import { DataHandlerService } from '../models/data-handler.model';
import { LineChartData, LineChartValuePoint } from '../models/line-chart.model';

@Injectable({
  providedIn: 'root'
})
export class LineChartService implements DataHandlerService {

  constructor() { }

  public getEnterFn({ xScale, yScale, height }: AxesChartSettings) {

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

  public getUpdateFn({ xScale, yScale, height }: AxesChartSettings) {

    const lineGen = this.getLineGen(xScale, yScale);

    return function(update) {
      const linesUpdate = update
        .transition()
        .attr('d', d => lineGen(d.values));

      linesUpdate
        .select('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[0]));

      return linesUpdate;
    };
  }

  public getXScale(data: LineChartData, width): d3.ScaleTime<number, number> {
    console.log(data);
    const dates = this.getAllDates(data.value);
    return d3
      .scaleTime()
      .domain(d3.extent(dates))
      .range([0, width]);
  }

  public getYScale(data: LineChartData, height): d3.ScaleLinear<number, number> {
    const dates = this.getAllDates(data);
    return d3
      .scaleLinear()
      .domain([0, d3.max(dates, (d): number => d[0])])
      .range([height, 0])
      .nice();
  }

  private getAllDates(data: LineChartData): Date[] {
    return data.reduce((dates, node) => {
      console.log(node);
      const nodeDates = node.value.map(point => point.date);
      return [...dates, ...nodeDates];
    }, []);
  }

  private getLineGen(xScale, yScale) {
    return d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));
  }
}
