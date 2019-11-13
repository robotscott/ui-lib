import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BarNodeData, BarChartData } from '../models';
import { AxesChartSettings } from '../models/axes-chart.model';
import { DataHandlerService } from '../models/data-handler.model';

@Injectable({
  providedIn: 'root'
})
export class BarChartService implements DataHandlerService {

  constructor() { }

  public getEnterFn({ x, y, xScale, yScale, height }: AxesChartSettings) {
    console.log('args', arguments);
    return function(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'data-node bar')
        .attr('transform', (d: BarNodeData) => `translate(${xScale(x(d))}, ${yScale(y(d))})`);

      barsEnter
        .append('rect')
        .data((d: BarNodeData) => d)
        .attr('width', xScale.bandwidth())
        .attr('height', (d: BarNodeData) => height - yScale(y(d)))
        .style('fill', () => d3.interpolateSinebow(Math.random()));

      barsEnter
        .append('text')
        .text(d => x(d))
        .attr('y', xScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsEnter;
    };
  }

  public getUpdateFn({ x, y, xScale, yScale, height }: AxesChartSettings) {
    return function(update) {
      const barsUpdate = update
        .transition()
        .attr('transform', (d: BarNodeData) => `translate(${xScale(x(d))}, ${yScale(y(d))})`);

      barsUpdate
        .select('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', (d: BarNodeData) => height - yScale(y(d)));

      return barsUpdate;
    };
  }

  public getXScale(x, data: BarChartData, width): d3.ScaleBand<d3.AxisDomain> {
    return d3
      .scaleBand()
      .domain(data.map(d  => x(d)))
      .range([0, width])
      .padding(0.15);
  }

  public getYScale(y, data: BarChartData, height): d3.ScaleLinear<number, number> {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d): number => y(d))])
      .range([height, 0])
      .nice();
  }
}
