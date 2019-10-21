import { Component } from '@angular/core';

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

  public data = fox;
  public chartOptions = {
    xAxis: {
      key: 'titleShort'
    },
    yAxis: {
      key: 'revenue'
    },
    // xAxis: {
    //   key: 'revenue'
    // },
    // yAxis: {
    //   key: 'titleShort'
    // },
    width: 300,
    height: 200,
    margin: {
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
    }
  };

  private toggled = false;

  public toggle() {
    this.chartOptions = {
      ...this.chartOptions,
      width: this.toggled ? 400 : 200
    };

    this.data = this.toggled ? fox : disney;

    this.toggled = !this.toggled;
  }
}
