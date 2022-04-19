import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadHospitals } from '../interfaces/loadHospitals.interface';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private baseUrl: string = environment.baseUrl;
  private hospitalUrl: string = `${this.baseUrl}/hospital`;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      'x-token': this.token,
    };
  }

  constructor(private http: HttpClient) {}

  loadHospitals(): Observable<Hospital[]> {
    return this.http
      .get(this.hospitalUrl, {
        headers: this.headers,
      })
      .pipe(map((res: LoadHospitals) => res.hospitals ?? []));
  }
}
