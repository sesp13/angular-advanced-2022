import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  user?: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = userService?.user;
  }

  logout() {
    this.userService.logout();
  }

  // Redirect to global search
  search(term: string) {
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }
}
