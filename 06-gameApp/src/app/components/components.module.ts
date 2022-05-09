import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxChartsModule } from '@swimlane/ngx-charts';

// Components
import { NavbarComponent } from './navbar/navbar.component';
import { HorizontalBarGraphComponent } from './horizontal-bar-graph/horizontal-bar-graph.component';

@NgModule({
  declarations: [NavbarComponent, HorizontalBarGraphComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    NgxChartsModule,
  ],
  exports: [NavbarComponent, HorizontalBarGraphComponent],
})
export class ComponentsModule {}
