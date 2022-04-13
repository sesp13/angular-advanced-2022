import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Main',
          url: ''
        },
        {
          title: 'Progress Bar',
          url: 'progress'
        },
        {
          title: 'Graphs',
          url: 'graph1'
        },
        {
          title: 'Promises',
          url: 'promises'
        },
        {
          title: 'rxjs',
          url: 'rxjs'
        },
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        {
          title: 'Users',
          url: 'users'
        },
        {
          title: 'Hospitals',
          url: 'hospitals'
        },
        {
          title: 'Doctors',
          url: 'doctors'
        },
      ]
    }
  ]

  constructor() { }
}
