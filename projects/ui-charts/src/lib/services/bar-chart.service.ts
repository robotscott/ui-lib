import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesChartSettings } from '../models/axes-chart.model';
import { DataHandlerService } from '../models/data-handler.model';
import { BarChartDataNode } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BarChartService implements DataHandlerService {

  constructor() { }

  public getEnterFn({ x, y, xScale, yScale, height }: AxesChartSettings) {
    return function(enter) {
      const barsEnter = enter
        .append('g')
        .attr('class', 'data-node bar')
        .attr('transform', (d: BarChartDataNode) => `translate(${xScale(y(d))}, ${yScale(x(d))})`);

      barsEnter
        .append('rect')
        .data(d => d)
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(x(d)))
        .style('fill', () => d3.interpolateSinebow(Math.random()));

      barsEnter
        .append('text')
        .text(d => y(d))
        .attr('y', xScale.bandwidth() / 2)
        .attr('dx', '0.35em');

      return barsEnter;
    };
  }

  public getUpdateFn({ x, y, xScale, yScale, height }: AxesChartSettings) {
    return function(update) {
      console.log('update', update);
      const barsUpdate = update
        .transition()
        .attr('transform', d => `translate(${xScale(y(d))}, ${yScale(x(d))})`);

      barsUpdate
        .select('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(x(d)));

      return barsUpdate;
    };
  }

  public getXScale(y, data, width): d3.ScaleBand<d3.AxisDomain> {
    console.log(data);
    return d3
      .scaleBand()
      .domain(data.map(d => y(d)))
      .range([0, width])
      .padding(0.15);
  }

  public getYScale(x, data, height): d3.ScaleLinear<number, number> {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d): number => x(d))])
      .range([height, 0])
      .nice();
  }
}
