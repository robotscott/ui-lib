import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BarNodeData, BarChartData, StandardizedData } from '../models';
import { AxesChartSettings, AxisValue, AxesDataHandlerService } from '../models/axes-chart.model';
import { DataHandlerService } from '../models/data-handler.model';

@Injectable({
  providedIn: 'root'
})
export class BarChartService implements AxesDataHandlerService {

  constructor() { }

  public getEnterFn({ x, y, xScale, yScale, height }: AxesChartSettings) {
    return function(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'data-node bar')
        .attr('transform', (d: BarNodeData) => `translate(${xScale(x(d.value))}, ${yScale(y(d.value))})`);

      barsEnter
        .append('rect')
        .data((d: BarNodeData) => d)
        .attr('width', xScale.bandwidth())
        .attr('height', (d: BarNodeData) => height - yScale(y(d.value)))
        .style('fill', () => d3.interpolateSinebow(Math.random()));

      barsEnter
        .append('text')
        .text(d => x(d.value))
        .attr('y', xScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsEnter;
    };
  }

  public getUpdateFn({ x, y, xScale, yScale, height }: AxesChartSettings) {
    return function(update) {
      const barsUpdate = update
        .transition()
        .attr('transform', (d: BarNodeData) => `translate(${xScale(x(d.value))}, ${yScale(y(d.value))})`);

      barsUpdate
        .select('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', (d: BarNodeData) => height - yScale(y(d.value)));

      return barsUpdate;
    };
  }

  public getXScale({x, width}: AxesChartSettings, data: StandardizedData<AxisValue>): d3.ScaleBand<d3.AxisDomain> {
    return d3
      .scaleBand()
      .domain(data.map(d  => x(d.value)))
      .range([0, width])
      .padding(0.15);
  }

  public getYScale({y, height}: AxesChartSettings, data: BarChartData): d3.ScaleLinear<number, number> {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d): number => y(d.value))])
      .range([height, 0])
      .nice();
  }
}
