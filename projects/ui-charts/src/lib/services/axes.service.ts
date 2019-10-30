import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { AxesGraphSettings } from '../models/axes-graph.model';

@Injectable({
  providedIn: 'root'
})
export class AxesService {

  constructor() { }

  public setScales(
    settings: AxesGraphSettings, data: {}
  ): AxesGraphSettings {
    settings.xScale = this.getXScale(data, settings.width);
    settings.yScale = this.getYScale(data, settings.height);
    return settings;
  }

  public initAxis(
    settings: AxesGraphSettings,
    baseChart
  ): AxesGraphSettings {
    settings.xAxis = d3
      .axisBottom(settings.xScale)
      .tickSizeOuter(0)
      .tickFormat(
        settings.yTickTransform || ((d) => d)
      );
    settings.drawXAxis = baseChart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${settings.height})`);
    settings.yAxis = d3
      .axisLeft(settings.yScale)
      .ticks(5)
      .tickFormat(
        settings.xTickTransform || ((d) => d)
      );
    settings.drawYAxis = baseChart
      .append('g')
      .attr('class', 'y axis');
    return settings;
  }

  public updateAxis(settings: AxesGraphSettings): AxesGraphSettings {
    settings.drawYAxis.call(settings.yAxis.scale(settings.yScale));
    settings.drawXAxis.call(settings.xAxis.scale(settings.xScale));
    return settings;
  }

  private getXScale(data, width) {
    return d3
      .scaleBand()
      .domain(data.map(d => d[1]))
      .range([0, width])
      .padding(0.15);
  }

  private getYScale(data, height) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d): number => d[0])])
      .range([height, 0])
      .nice();
  }
}
