import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      // array of protected routes
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings',
        },
      },
      {
        path: 'graph1',
        component: Graph1Component,
        data: {
          title: 'Graph 1',
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress Bar',
        },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: {
          title: 'Promises',
        },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: {
          title: 'RxJs',
        },
      },
      // Maintenance
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Application users',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
