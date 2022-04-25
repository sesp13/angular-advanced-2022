import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenance
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorEditComponent } from './maintenance/doctors/doctor-edit/doctor-edit.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { SearchsComponent } from './searchs/searchs.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  {
    path: 'search/:term',
    component: SearchsComponent,
    data: {
      title: 'Application Searchs',
    },
  },
  // Maintenance
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: {
      title: 'Doctors',
    },
  },
  {
    path: 'doctor/:id',
    component: DoctorEditComponent,
    data: {
      title: 'Doctor',
    },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: {
      title: 'Hospitals',
    },
  },
  // Admin route
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: {
      title: 'Application users',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
