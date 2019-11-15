import { Component } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { AxesChartOptions, StandardizedData, BarChartData, LineChartData } from 'ui-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public fox = new BehaviorSubject<StandardizedData>(fox);
  public disney = new BehaviorSubject<StandardizedData>(disney);
  public lineData = new BehaviorSubject<StandardizedData>(lineData);

  public barType = 'bar';
  public lineType = 'line';
  public barChartOptions: AxesChartOptions = {
    xAxisDef: {
      key: 'titleShort'
    },
    xTickTransform: this.xTickTransform,
    yAxisDef: {
      key: 'revenue'
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
  public lineChartOptions: AxesChartOptions = {
    xAxisDef: {
      key: 'date'
    },
    xTickTransform: this.xTickTransform,
    yAxisDef: {
      key: 'amount'
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

  public updateBarData(data: BehaviorSubject<StandardizedData>) {
    const currentData = data.getValue();
    const newData = currentData.map((d: any) => {
      const random = Math.random();
      if (Math.round(random)) {
        d.value.revenue = random * 3000000000;
        return d;
      }
      return d;
    });

    data.next(newData);
  }

  public updateLineData(data: BehaviorSubject<StandardizedData>) {
    const currentData = data.getValue();
    const newData = currentData.map((d: any) => {
      console.log(d);
      const random = Math.random();
      if (Math.round(random)) {
        const newValues = d.value.map(v => {
          const randomV = Math.random();
          return Math.round(randomV) ? (random * 25000000000) : v.amount;
        }).sort();

        const newD = d.value.map((v, i) => {
          v.amount = newValues[i];
          return v;
        });

        console.log(newD);

        return {
          ...d,
          value: newD
        };
      }
      return d;
    });

    console.log(newData);

    data.next(newData);
  }

  private xTickTransform(d: number): string {
    return d3
      .format('.2~s')(d)
      .replace('M', ' mil')
      .replace('G', ' bil')
      .replace('T', ' tril');
  }
}


const fox: BarChartData = [
  {
    label: 'Avatar',
    value: {
      titleShort: 'Avatar',
      revenue: 2787965087,
    }
  },
  {
    label: 'Ice Age: Dawn of the Dinosaurs',
    value: {
      titleShort: 'Ice Age 3',
      revenue: 887739201,
    }
  },
  {
    label: 'Ice Age: The Meltdown',
    value: {
      titleShort: 'Ice Age 2',
      revenue: 714361864,
    }
  },
];

const disney: BarChartData = [
  {
    label: 'Pirates of the Caribbean: Dead Man\'s Chest',
    value: {
      titleShort: 'Pirates 2',
      revenue: 1134195026,
    }
  },
  {
    label: 'Pirates of the Caribbean: At World\'s End',
    value: {
      titleShort: 'Pirates 3',
      revenue: 997970603,
    }
  },
  // {
  //   label: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
  //   value: {
  //     titleShort: 'Narnia 1',
  //     revenue: 821667244,
  //   }
  // },
];

const lineData: LineChartData = [
  {
    label: 'Revenue',
    color: 'dodgerblue',
    value: [
      {
        date: new Date('2000-01-01T06:00:00.000Z'),
        amount: 14389102516
      },
      {
        date: new Date('2001-01-01T06:00:00.000Z'),
        amount: 16992596669
      },
      {
        date: new Date('2002-01-01T06:00:00.000Z'),
        amount: 18236693570
      },
      {
        date: new Date('2003-01-01T06:00:00.000Z'),
        amount: 18032628503
      },
      {
        date: new Date('2004-01-01T06:00:00.000Z'),
        amount: 19576650363
      },
      {
        date: new Date('2005-01-01T06:00:00.000Z'),
        amount: 18123550149
      },
      {
        date: new Date('2006-01-01T06:00:00.000Z'),
        amount: 18883796922
      },
      {
        date: new Date('2007-01-01T06:00:00.000Z'),
        amount: 19424188311
      },
      {
        date: new Date('2008-01-01T06:00:00.000Z'),
        amount: 19900869439
      },
      {
        date: new Date('2009-01-01T06:00:00.000Z'),
        amount: 22553803572
      }
    ]
  },
  {
    label: 'Budget',
    color: 'darkorange',
    value: [
      {
        date: new Date('2000-01-01T06:00:00.000Z'),
        amount: 6271667686
      },
      {
        date: new Date('2001-01-01T06:00:00.000Z'),
        amount: 6800928032
      },
      {
        date: new Date('2002-01-01T06:00:00.000Z'),
        amount: 6966631114
      },
      {
        date: new Date('2003-01-01T06:00:00.000Z'),
        amount: 6606715191
      },
      {
        date: new Date('2004-01-01T06:00:00.000Z'),
        amount: 7897795916
      },
      {
        date: new Date('2005-01-01T06:00:00.000Z'),
        amount: 7672004809
      },
      {
        date: new Date('2006-01-01T06:00:00.000Z'),
        amount: 8027253050
      },
      {
        date: new Date('2007-01-01T06:00:00.000Z'),
        amount: 7410209262
      },
      {
        date: new Date('2008-01-01T06:00:00.000Z'),
        amount: 7743655751
      },
      {
        date: new Date('2009-01-01T06:00:00.000Z'),
        amount: 7974660356
      }
    ]
  }
];
