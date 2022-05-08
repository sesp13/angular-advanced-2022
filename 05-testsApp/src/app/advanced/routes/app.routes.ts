import { Routes } from "@angular/router";
import { DoctorComponent } from "src/app/intermediate-2/doctor/doctor.component";
import { HospitalComponent } from "src/app/intermediate-2/hospital/hospital.component";

export const routes: Routes = [
  {
    path: 'hospital',
    component: HospitalComponent,
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent
  }
]