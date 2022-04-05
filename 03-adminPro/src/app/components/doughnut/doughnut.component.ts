import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [],
})
export class DoughnutComponent implements OnInit {
  @Input() title: string = 'Default title';
  @Input() labels: string[] = [
    'Default 1',
    'Default 2',
    'Default 3',
  ];
  @Input() data1: number[] = [350, 450, 100];
  @Input() colors: string[] = ['#6857E6', '#009FEE', '#F02059'];

  // Init doughnut
  public doughnutChartData?: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    // Init chart
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data1,
          backgroundColor: this.colors,
        },
      ],
    };
  }
}
