import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: User;
  profileForm?: FormGroup;
  uploadingImage?: File;
  imageUrl?: any = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
    this.imageUrl = userService.user?.imageUrl;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.profileForm?.value).subscribe({
      next: (res: any) => {
        const { name, email } = res.user;
        if (this.user) {
          // This also updates other instances thanks to the reference in the service
          this.user.name = name;
          this.user.email = email;
          // Set values in form
          this.profileForm?.reset({
            name,
            email,
          });
        }
        Swal.fire('Success', 'The user was updated', 'success');
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire('Error', err.error.msg ?? 'Error on update', 'error');
      },
    });
  }

  changeImage(event: any): void {
    this.uploadingImage = event.target?.files[0];
    if (!this.uploadingImage) {
      // Use the current user image
      this.imageUrl = this.user?.imageUrl;
      return;
    }
    // Get preview url
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadingImage);
    reader.onloadend = () => {
      this.imageUrl = reader.result;
    };
  }

  updateImage(): void {
    if (this.uploadingImage)
      this.fileUploadService
        .uploadPhoto(this.uploadingImage, 'users', this.userService.userUid)
        .then((img) => {
          if (img) {
            // Change user image by reference
            if (this.user) this.user.img = img;
            Swal.fire('Success', 'The image was updated', 'success');
          } else {
            Swal.fire('Error', "The image couldn't be updated", 'error');
          }
        });
  }
}
