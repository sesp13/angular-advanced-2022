import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  hospitals: Hospital[] = [];
  loading: boolean = true;
  newImagesSub?: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    // Refresh the hospitals if a new image is uploaded
    this.newImagesSub = this.modalImageService.newImage.subscribe(() => {
      this.loadHospitals();
    });
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe((res: Hospital[]) => {
      this.loading = false;
      this.hospitals = res;
    });
  }

  async openCreateModal() {
    const { value } = await Swal.fire<string>({
      title: 'Create Hospital',
      text: 'Enter the name from the new hospital',
      input: 'text',
      inputPlaceholder: 'Enter a name',
      showCancelButton: true,
    });

    if (value)
      this.hospitalService.createHospital(value ?? '').subscribe((res) => {
        const hospital = res?.hospital;
        if (hospital) this.hospitals.push(hospital);
      });
  }

  saveChanges(hospital: Hospital) {
    const id = hospital?._id ?? '';
    const name = hospital?.name ?? '';
    this.hospitalService.updateHospital(id, name).subscribe(() => {
      Swal.fire('Success', `The hospital ${name} was saved`, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    const id = hospital?._id ?? '';
    this.hospitalService.deleteHospital(id).subscribe(() => {
      Swal.fire(
        'Success',
        `The hospital ${hospital?.name} was deleted`,
        'success'
      );
      this.loadHospitals();
    });
  }

  // Update image
  openModal(hospital: Hospital) {
    this.modalImageService.openModal(
      'hospitals',
      hospital?._id ?? '',
      hospital?.img
    );
  }

  search(term: string) {
    if (term != '') {
      this.loading = true;
      this.searchService.search('hospitals', term).subscribe((res: any[]) => {
        this.loading = false;
        this.hospitals = res;
      });
    } else {
      this.loadHospitals();
    }
  }


  ngOnDestroy(): void {
    // Kill subscription of new images
    this.newImagesSub?.unsubscribe();
  }
}
