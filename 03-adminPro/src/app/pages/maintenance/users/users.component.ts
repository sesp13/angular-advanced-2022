import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  totalUsers: number = 0;
  users: User[] = [];
  from: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
    });
  }

  changePage(value: number): void {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }
    this.getUsers();
  }
}
