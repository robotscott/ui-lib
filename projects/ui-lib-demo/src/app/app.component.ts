import { Component } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { AxesChartOptions } from 'ui-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public fox = new BehaviorSubject<{}[]>(fox);
  public disney = new BehaviorSubject<{}[]>(disney);

  public type = 'bar';
  public chartOptions: AxesChartOptions = {
    xAxisDef: {
      key: 'revenue'
    },
    xTickTransform: this.xTickTransform,
    yAxisDef: {
      key: 'titleShort'
    },
    width: 300,
    height: 200,
    margin: {
      top: 10,
      left: 50,
      bottom: 25,
      right: 10
    }
  };

  public updateData(data: BehaviorSubject<{}[]>) {
    // this.chartOptions = {
    //   ...this.chartOptions,
    //   height: 500
    // };
    const currentData = data.getValue();
    const newData = currentData.map((d: any) => {
      const random = Math.random();
      if (Math.round(random)) {
        d.revenue = random * 3000000000;
        return d;
      }
      return d;
    });

    data.next(newData);

    // data = data.map(d => {
    //   const random = Math.random();
    //   if (Math.round(random)) {
    //     d.revenue = random * 3000000000;
    //     return d;
    //   }
    //   return d;
    // });
  }

  private xTickTransform(d: number): string {
    return d3
      .format('.2~s')(d)
      .replace('M', ' mil')
      .replace('G', ' bil')
      .replace('T', ' tril');
  }
}


const fox = [
  {
    studio: 'fox',
    title: 'Avatar',
    titleShort: 'Avatar',
    revenue: 2787965087,
  },
  {
    studio: 'fox',
    title: 'Ice Age: Dawn of the Dinosaurs',
    titleShort: 'Ice Age 3',
    revenue: 887739201,
  },
  {
    studio: 'fox',
    title: 'Ice Age: The Meltdown',
    titleShort: 'Ice Age 2',
    revenue: 714361864,
  },
];

const disney = [
  {
    studio: 'disney',
    title: 'Pirates of the Caribbean: Dead Man\'s Chest',
    titleShort: 'Pirates 2',
    revenue: 1134195026,
  },
  {
    studio: 'disney',
    title: 'Pirates of the Caribbean: At World\'s End',
    titleShort: 'Pirates 3',
    revenue: 997970603,
  },
  {
    studio: 'disney',
    title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    titleShort: 'Narnia 1',
    revenue: 821667244,
  },
];

const lineData = {
  series: [
    {
      name: 'Revenue',
      color: 'dodgerblue',
      values: [
        {
          date: '2000-01-01T06:00:00.000Z',
          value: 14389102516
        },
        {
          date: '2001-01-01T06:00:00.000Z',
          value: 16992596669
        },
        {
          date: '2002-01-01T06:00:00.000Z',
          value: 18236693570
        },
        {
          date: '2003-01-01T06:00:00.000Z',
          value: 18032628503
        },
        {
          date: '2004-01-01T06:00:00.000Z',
          value: 19576650363
        },
        {
          date: '2005-01-01T06:00:00.000Z',
          value: 18123550149
        },
        {
          date: '2006-01-01T06:00:00.000Z',
          value: 18883796922
        },
        {
          date: '2007-01-01T06:00:00.000Z',
          value: 19424188311
        },
        {
          date: '2008-01-01T06:00:00.000Z',
          value: 19900869439
        },
        {
          date: '2009-01-01T06:00:00.000Z',
          value: 22553803572
        }
      ]
    },
    {
      name: 'Budget',
      color: 'darkorange',
      values: [
        {
          date: '2000-01-01T06:00:00.000Z',
          value: 6271667686
        },
        {
          date: '2001-01-01T06:00:00.000Z',
          value: 6800928032
        },
        {
          date: '2002-01-01T06:00:00.000Z',
          value: 6966631114
        },
        {
          date: '2003-01-01T06:00:00.000Z',
          value: 6606715191
        },
        {
          date: '2004-01-01T06:00:00.000Z',
          value: 7897795916
        },
        {
          date: '2005-01-01T06:00:00.000Z',
          value: 7672004809
        },
        {
          date: '2006-01-01T06:00:00.000Z',
          value: 8027253050
        },
        {
          date: '2007-01-01T06:00:00.000Z',
          value: 7410209262
        },
        {
          date: '2008-01-01T06:00:00.000Z',
          value: 7743655751
        },
        {
          date: '2009-01-01T06:00:00.000Z',
          value: 7974660356
        }
      ]
    }
  ],
  dates: [
    '2000-01-01T06:00:00.000Z',
    '2001-01-01T06:00:00.000Z',
    '2002-01-01T06:00:00.000Z',
    '2003-01-01T06:00:00.000Z',
    '2004-01-01T06:00:00.000Z',
    '2005-01-01T06:00:00.000Z',
    '2006-01-01T06:00:00.000Z',
    '2007-01-01T06:00:00.000Z',
    '2008-01-01T06:00:00.000Z',
    '2009-01-01T06:00:00.000Z'
  ],
  yMax: 22553803572
};
