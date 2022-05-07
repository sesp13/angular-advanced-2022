import { Component, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  constructor(private doctorService: DoctorService) {}

  doctors: any[] = [];

  ngOnInit(): void {}

  greetDoctor(name: string) {
    return `Hello ${name}`;
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe((doctors: any) => {
      this.doctors = doctors;
    })
  }
}
