import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BarChartProps } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor() { }

  public getXScale(data, width) {
    return d3
      .scaleBand()
      .domain(data.map(d => d[1]))
      .range([0, width])
      .padding(0.15);
  }

  public getYScale(data, height) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d[0])])
      .range([0, height]);
  }

  public getEnterFn(xScale, yScale) {
    return function(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'bar')
        .attr('transform', d => `translate(${xScale(d[1])}, 0)`);

      barsEnter
        .append('rect')
        .attr('height', d => yScale(d[0]))
        .attr('width', xScale.bandwidth())
        .style('fill', d3.interpolateSinebow(Math.random()));

      barsEnter
        .append('text')
        .text(d => d[1])
        .attr('y', xScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsEnter;
    };
  }

  public getUpdateFn(xScale, yScale) {
    return function(update) {
      const barsUpdate = update.attr('transform', d => `translate(0, ${yScale(d[1])})`);

      barsUpdate
        .selectAll('rect')
        .attr('width', d => xScale(d[0]))
        .attr('height', yScale.bandwidth());

      barsUpdate
        .selectAll('text')
        .text(d => d[1])
        .attr('y', yScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsUpdate;
    };
  }
}
