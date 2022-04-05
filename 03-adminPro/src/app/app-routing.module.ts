import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  // Path /dashboard PagesRouting
  // Path /auth AuthRouting
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // Direct import without lazy load
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
