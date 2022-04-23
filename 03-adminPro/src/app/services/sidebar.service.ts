import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [];

  loadMenu() {
    const menu = localStorage.getItem('menu');
    if (menu) this.menu = JSON.parse(menu);
  }
}
