import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  totalUsers: number = 0;
  users: User[] = [];
  from: number = 0;
  loading: boolean = true;
  newImagesSub?: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    // Refresh the users if a new image is uploaded
    this.newImagesSub = this.modalImageService.newImage.subscribe(() => {
      this.getUsers();
    });
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

  deleteUser(user: User): void {
    if (this.userService.user?.uid === user?.uid) {
      Swal.fire('Error', "You can't delete yourself", 'error');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${user?.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes delete it!',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user.uid).subscribe((res: any) => {
          Swal.fire(
            'Deleted!',
            `The user ${user?.name} has been deleted`,
            'success'
          );
          // Make the request again
          this.getUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.updateUser(user).subscribe({
      error: () => {
        Swal.fire(
          'Error',
          `The role of ${user?.name} couldn't be updated`,
          'error'
        );
      },
    });
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user?.uid ?? '', user?.img);
  }

  ngOnDestroy(): void {
    // Kill subscription of new images
    this.newImagesSub?.unsubscribe();
  }
}
