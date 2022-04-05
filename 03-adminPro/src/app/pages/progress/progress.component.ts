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
}
