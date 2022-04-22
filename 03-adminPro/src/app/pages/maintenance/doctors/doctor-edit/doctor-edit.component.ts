import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss'],
})
export class DoctorEditComponent implements OnInit {
  hospitals: Hospital[] = [];
  currentHospital?: Hospital;
  currentDoctor?: Doctor;

  doctorForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    hospital: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Capture params changes
    this.activatedRoute.params.subscribe(({ id }) =>
      this.loadCurrentDoctor(id)
    );
    // this.doctorService.getDoctorById()
    // Listen changes of hospital id
    this.doctorForm.get('hospital')?.valueChanges.subscribe((selectedId) => {
      this.currentHospital = this.hospitals.find(
        (hospital) => hospital._id == selectedId
      );
    });
    this.loadHospitals();
  }

  loadCurrentDoctor(id: string): void {
    // Don't load a user if the view is inttended to create a new doctor
    if (id == 'new') return;
    // Add delay to give time to value changes subscriber
    this.doctorService.getDoctorById(id).pipe(delay(100)).subscribe({
      next: (doctor?: Doctor) => {
        this.currentDoctor = doctor;
        const name = this.currentDoctor?.name;
        const hospital = this.currentDoctor?.hospital?._id ?? '';
        // Set values on form
        this.doctorForm.setValue({
          name,
          hospital,
        });
      },
      error: () => {
        // If the doctor doesn't exists, redirect
        this.router.navigateByUrl('/dashboard/doctors');
      },
    });
  }

  loadHospitals(): void {
    this.hospitalService.loadHospitals().subscribe((res: Hospital[]) => {
      this.hospitals = res;
    });
  }

  saveDoctor(): void {
    const name = this.doctorForm.value?.name;
    if (this.currentDoctor) {
      // Update behavior
      const data = {
        _id: this.currentDoctor._id,
        ...this.doctorForm.value,
      };
      this.doctorService.updateDoctor(data).subscribe(() => {
        Swal.fire('Success', `The doctor ${name} was updated`, 'success');
      });
    } else {
      // Save behavior
      this.doctorService
        .createDoctor(this.doctorForm.value)
        .subscribe((doctorCreated?: Doctor) => {
          Swal.fire('Success', `The doctor ${name} was created`, 'success');
          const id = doctorCreated?._id;
          if (id) this.router.navigateByUrl(`/dashboard/doctor/${id}`);
          else this.router.navigateByUrl(`/dashboard/doctors`);
        });
    }
  }
}
