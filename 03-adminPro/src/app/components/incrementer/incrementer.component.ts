import { Component } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss'],
})
export class IncrementerComponent {
  progress: number = 50;
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
