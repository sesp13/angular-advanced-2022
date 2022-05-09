import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-graph',
  templateUrl: './horizontal-bar-graph.component.html',
  styleUrls: ['./horizontal-bar-graph.component.scss'],
})
export class HorizontalBarGraphComponent implements OnDestroy {
  results: any[] = [
    {
      name: 'Game 1',
      value: 20,
    },
    {
      name: 'Game 2',
      value: 25,
    },
    {
      name: 'Game 3',
      value: 15,
    },
    {
      name: 'Game 4',
      value: 30,
    },
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Games';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';

  colorScheme = 'nightLights';

  interval: NodeJS.Timeout;

  constructor() {
    this.interval = setInterval(() => {
      console.log('alive');
      const newResults = [...this.results];
      for (let i in this.results) {
        newResults[i].value = Math.round(Math.random() * 20);
      }
      this.results = newResults;
    }, 1500);
  }

  onSelect(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
