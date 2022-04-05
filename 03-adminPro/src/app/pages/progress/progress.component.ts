import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  progress: number = 50;

  get getPercentage(): string {
    return `${this.progress}%`;
  }

  changeValue(value: number): void {
    if (this.progress + value >= 100) {
      this.progress = 100;
      return;
    }
    if (this.progress + value <= 0) {
      this.progress = 0;
      return;
    }
    this.progress += value;
  }
}
