import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Custom modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

// Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
