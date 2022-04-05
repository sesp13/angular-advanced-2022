import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  progress1: number = 25;
  progress2: number = 35;

  get getPercentage1(): string {
    return `${this.progress1}%`;
  }

  get getPercentage2(): string {
    return `${this.progress2}%`;
  }

  progressChange(value: number, type: string) {
    if (type == '1') {
      this.progress1 = value;
    } else if (type == '2') {
      this.progress2 = value;
    }
  }
}
