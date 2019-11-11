import { Component } from '@angular/core';
import { from, BehaviorSubject } from 'rxjs';
import { AxesChartOptions } from 'ui-charts';

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
}
