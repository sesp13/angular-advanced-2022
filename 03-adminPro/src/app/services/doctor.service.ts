import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadDoctors } from '../interfaces/loadDoctors.interface';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl: string = environment.baseUrl;
  private doctorUrl: string = `${this.baseUrl}/doctor`;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      'x-token': this.token,
    };
  }

  constructor(private http: HttpClient) {}

  loadDoctors(): Observable<Doctor[]> {
    return this.http
      .get(this.doctorUrl, {
        headers: this.headers,
      })
      .pipe(map((res: LoadDoctors) => res.doctors ?? []));
  }

  createDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.doctorUrl, doctor, { headers: this.headers });
  }

  updateDoctor(doctor: Doctor): Observable<any> {
    const id = doctor?._id ?? 'no-id';
    const url = `${this.doctorUrl}/${id}`;
    return this.http.put(url, doctor, { headers: this.headers });
  }

  deleteDoctor(id: string = 'no-id'): Observable<any> {
    const url = `${this.doctorUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
