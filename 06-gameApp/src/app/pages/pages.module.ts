import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './home/home.component';
import { GotyComponent } from './goty/goty.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [HomeComponent, GotyComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [HomeComponent, GotyComponent],
})
export class PagesModule {}
