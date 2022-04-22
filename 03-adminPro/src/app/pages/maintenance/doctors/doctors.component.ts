import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  loading: boolean = true;
  private newImagesSub?: Subscription;

  constructor(
    private doctorService: DoctorService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.newImagesSub = this.modalImageService.newImage.subscribe(() => {
      this.loadDoctors();
    });
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe((res: Doctor[]) => {
      this.loading = false;
      this.doctors = res;
    });
  }

  createDoctor() {}

  deleteDoctor(doctor?: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${doctor?.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes delete it!',
    }).then((result) => {
      if (result.value) {
        this.doctorService.deleteDoctor(doctor?._id).subscribe(() => {
          Swal.fire('Success', `The doctor ${doctor?.name} was deleted`, 'success');
          this.loadDoctors();
        });
      }
    });
  }

  // Update image
  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor?._id ?? '', doctor?.img);
  }

  search(term: string) {
    if (term != '') {
      this.loading = true;
      this.searchService.search('doctors', term).subscribe((res: any[]) => {
        this.loading = false;
        this.doctors = res;
      });
    } else {
      this.loadDoctors();
    }
  }

  ngOnDestroy(): void {
    // Kill subscription of new images
    this.newImagesSub?.unsubscribe();
  }
}
