import { Injectable } from '@angular/core';
import * as d3 from 'd3';

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
      .domain([0, d3.max(data, (d): number => d[0])])
      .range([height, 0])
      .nice();
  }

  public getEnterFn(xScale, yScale, height) {
    return function(enter) {
      console.log('enter :', enter);
      const barsEnter = enter
        .append('g')
        .attr('class', 'bar')
        .attr('transform', d => `translate(${xScale(d[1])}, ${yScale(d[0])})`);

      barsEnter
        .append('rect')
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

  public getUpdateFn(xScale, yScale, height) {
    return function(update) {
      console.log('update :', update, height);

      const barsUpdate = update
        .attr('transform', d => `translate(${xScale(d[1])}, ${yScale(d[0])})`);

      barsUpdate
        .selectAll('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[0]));

      // barsUpdate
      //   .selectAll('text')
      //   .text(d => d[1])
      //   .attr('y', yScale.bandwidth() / 2)
      //   .attr('dx', '0.35em');

      return barsUpdate;
    };
  }
}
