import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
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
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.loading = false;
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

  search(term: string) {
    if (term != '') {
      this.loading = true;
      this.searchService.search('users', term).subscribe((res: any[]) => {
        this.loading = false;
        this.users = res;
      });
    } else {
      this.getUsers();
    }
  }
}
