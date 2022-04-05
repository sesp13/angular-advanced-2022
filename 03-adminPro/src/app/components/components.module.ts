import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DoughnutComponent } from './doughnut/doughnut.component';

@NgModule({
  declarations: [IncrementerComponent, DoughnutComponent],
  imports: [CommonModule, NgChartsModule, FormsModule],
  exports: [IncrementerComponent, DoughnutComponent],
})
export class ComponentsModule {}
