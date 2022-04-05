import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IncrementerComponent } from './incrementer/incrementer.component';

@NgModule({
  declarations: [IncrementerComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncrementerComponent],
})
export class ComponentsModule {}
