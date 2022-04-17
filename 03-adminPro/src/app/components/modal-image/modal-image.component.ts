import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss'],
})
export class ModalImageComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') inputFile?: ElementRef;

  uploadingImage?: File;
  openSub?: Subscription;

  constructor(
    public modalImageService: ModalImageService,
    private fileUploadService: FileUploadService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Reset content if the modal is reopened
    this.openSub = this.modalImageService.modalOpened.subscribe(() => {
      if (this.inputFile) this.inputFile.nativeElement.value = '';
    });
  }

  closeModal(): void {
    this.modalImageService.closeModal();
  }

  updateImage(): void {
    const id = this.modalImageService?.id;
    const type = this.modalImageService?.type;
    // Only upload if there is a valid upload type
    if (this.uploadingImage && type && id) {
      this.fileUploadService
        .uploadPhoto(this.uploadingImage, type, id)
        .then((img) => {
          if (img) {
            Swal.fire('Success', 'The image was updated', 'success');
            this.modalImageService.newImage.emit(img);
            // If the image changed is from the current user update it
            if (type == 'users' && id == this.userService.user?.uid)
              this.userService.user.img = img;
          } else {
            Swal.fire('Error', "The image couldn't be updated", 'error');
          }
          this.closeModal();
        });
    }
  }

  changeImage(event: any): void {
    this.uploadingImage = event.target?.files[0];
    if (!this.uploadingImage) {
      // Use the current user image
      return;
    }
    // Get preview url
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadingImage);
    reader.onloadend = () => {
      this.modalImageService.img = reader.result;
    };
  }

  ngOnDestroy(): void {
    // Kill open sub
    this.openSub?.unsubscribe();
  }
}
