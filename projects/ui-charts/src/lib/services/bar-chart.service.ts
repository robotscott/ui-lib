import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { BarChartProps } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor() { }

  public barChart({ standardizedData, width, height }: BarChartProps) {
    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(standardizedData, d => d[0])])
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(standardizedData.map(d => d[1]))
      .range([0, height])
      .padding(0.15);

    // Join functions
    function onEnter(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'bar')
        .attr('transform', d => `translate(0, ${yScale(d[1])})`);

      barsEnter
        .append('rect')
        .attr('width', d => xScale(d[0]))
        .attr('height', yScale.bandwidth())
        .style('fill', d3.interpolateSinebow(Math.random()));

      barsEnter
        .append('text')
        .text(d => d[1])
        .attr('y', yScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsEnter;
    }

    function onUpdate(update) {
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
    }

    return { onEnter, onUpdate };
  }

  private barsScale(data, width) {
    return d3
      .scaleBand()
      .domain([0, d3.max(data, d => d[0])])
      .range([0, width]);
  }
}
