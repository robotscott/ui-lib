import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesChartSettings, AxisCoordinate, AxisValue, StandardizedData, AxesDataHandlerService } from '../models';
import { DataHandlerService } from '../models/data-handler.model';
import { LineChartData } from '../models/line-chart.model';

@Injectable({
  providedIn: 'root'
})
export class LineChartService implements AxesDataHandlerService {

  constructor() { }

  public getEnterFn(settings: AxesChartSettings) {

    const lineGen = this.getLineGen(settings);

    return function(enter) {
      const linesEnter = enter
        .append('path')
        .attr('class', 'data-node line')
        .attr('d', d => lineGen(d.value))
        .style('fill', 'none')
        .style('stroke', d => d.color || d3.interpolateSinebow(Math.random()));

      return linesEnter;
    };
  }

  public getUpdateFn(settings: AxesChartSettings) {

    const lineGen = this.getLineGen(settings);

    return function(update) {
      const linesUpdate = update
        .transition()
        .attr('d', d => lineGen(d.value));

      return linesUpdate;
    };
  }

  // TODO: need to decide if time will be only x values
  public getXScale({x, width}: AxesChartSettings, data: LineChartData): d3.ScaleTime<number, number> {
    const xValues = this.getAxesValues(x, data);
    return d3
      .scaleTime()
      .domain(d3.extent(xValues))
      .range([0, width]);
  }

  public getYScale({y, height}: AxesChartSettings, data: LineChartData): d3.ScaleLinear<number, number> {
    console.log(data);
    const yValues = this.getAxesValues(y, data);
    return d3
      .scaleLinear()
      .domain([0, d3.max(yValues)])
      .range([height, 0])
      .nice();
  }

  private getAxesValues(valueGetter: (d: AxisCoordinate) => number, data: LineChartData) {
    return data.reduce((axesValues, node) => {
      const nodeAxesValues = node.value.map(d => valueGetter(d));
      return [...axesValues, ...nodeAxesValues];
    }, []);
  }

  private getLineGen({x, y, xScale, yScale}: AxesChartSettings) {
    return d3
      .line()
      .x(d => xScale(x(d)))
      .y(d => yScale(y(d)));
  }
}
