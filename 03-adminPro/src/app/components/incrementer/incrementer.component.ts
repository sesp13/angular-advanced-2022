import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss'],
})
export class IncrementerComponent implements OnInit {
  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() onValueChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(value: number): void {
    if (this.progress + value >= 100) {
      this.progress = 100;
      this.onValueChange.emit(this.progress);
      return;
    }
    if (this.progress + value <= 0) {
      this.progress = 0;
      this.onValueChange.emit(this.progress);
      return;
    }
    this.progress += value;
    this.onValueChange.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.onValueChange.emit(value);
  }
}
