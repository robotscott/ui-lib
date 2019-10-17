import { Injectable } from '@angular/core';
import * as d3 from 'd3';

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface BaseSvg {
  class: string;
  width: number;
  height: number;
  margin: Margin;
}

@Injectable({
  providedIn: 'root'
})
export class D3UtilsService {

  constructor() { }

  public setDimensions(baseSvg: BaseSvg) {
    const width: number = this.setWidth(baseSvg);
    const height: number = this.setHeight(baseSvg);
    const baseClass: string = '.' + baseSvg.class;
    const margin: Margin = baseSvg.margin;
    return d3
      .select(baseClass)
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }

  public appendHeader(svg, title: string, baseTopMargin: number) {
    console.log(svg);
    const header = svg
      .append('g')
      .attr('class', 'chart-header')
      .attr('transform', `translate(0, ${-baseTopMargin * 0.6})`)
      .append('text');

    header.append('tspan').text(title);

    return header;
  }

  private setWidth({width, margin}: {width: number, margin: Margin}): number {
    return width - margin.right - margin.left;
  }

  private setHeight({ height, margin }: { height: number, margin: Margin }): number {
    return height - margin.top - margin.bottom;
  }
}
