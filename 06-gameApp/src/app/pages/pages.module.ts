import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './home/home.component';
import { GotyComponent } from './goty/goty.component';

@NgModule({
  declarations: [HomeComponent, GotyComponent],
  imports: [CommonModule],
  exports: [HomeComponent, GotyComponent],
})
export class PagesModule {}
