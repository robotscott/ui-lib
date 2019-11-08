import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesChartSettings } from '../models/axes-chart.model';
import { DataHandlerService } from '../models/data-handler.model';

@Injectable({
  providedIn: 'root'
})
export class BarChartService implements DataHandlerService {

  constructor() { }

  public getEnterFn({ xScale, yScale, height }: AxesChartSettings) {
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

  public getUpdateFn({ xScale, yScale, height }: AxesChartSettings) {
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
}
