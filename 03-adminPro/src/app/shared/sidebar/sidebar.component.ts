import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  user?: User;

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Init users
    this.user = this.userService?.user;
    // Init menu
    this.sidebarService.loadMenu();
    this.menuItems = this.sidebarService.menu;
  }

  logOut() {
    this.userService.logout();
  }
}
