import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: User;
  profileForm?: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile(): void {
    this.userService.updateUser(this.profileForm?.value).subscribe({
      next: (res) => {
        const { name, email } = this.profileForm?.value;
        // This also updates other instances thanks to the reference in the service
        if (this.user) {
          this.user.name = name;
          this.user.email = email;
        }
        Swal.fire('Success', 'The user was updated', 'success');
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire('Error', err.error.msg ?? 'Error on update', 'error');
      },
    });
  }
}
