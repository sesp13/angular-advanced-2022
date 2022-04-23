import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';
import { allowedType } from '../types/upload.type';

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  private baseUrl: string = environment.baseUrl;
  private searchUrl: string = `${this.baseUrl}/search`;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      'x-token': this.token,
    };
  }

  constructor(private http: HttpClient) {}

  private transformUsers(results: any[]): User[] {
    const users = results.map((user) => {
      return new User(
        user.name,
        user.email,
        '',
        user.img,
        user.google,
        user.role,
        user.uid
      );
    });
    return users;
  }

  private transformHospitals(results: any[]): Hospital[] {
    const hospitals = results.map((hospital) => {
      return new Hospital(
        hospital.name,
        hospital?._id,
        hospital?.user,
        hospital?.img
      );
    });
    return hospitals;
  }

  private transformDoctors(results: any[]): Doctor[] {
    const doctors = results.map((doctor) => {
      return new Doctor(
        doctor.name,
        doctor?._id,
        doctor?.user,
        doctor?.hospital,
        doctor?.img
      );
    });
    return doctors;
  }

  globalSearch(term: string): Observable<any> {
    const url = `${this.searchUrl}/all/${term}`;
    return this.http.get(url, { headers: this.headers });
  }

  search(type: allowedType, term: string): Observable<any> {
    const url = `${this.searchUrl}/collection/${type}/${term}`;
    return this.http.get<any[]>(url, { headers: this.headers }).pipe(
      map((res: any) => {
        switch (type) {
          case 'users': {
            return this.transformUsers(res.content);
          }
          case 'hospitals': {
            return this.transformHospitals(res.content);
          }
          case 'doctors': {
            return this.transformDoctors(res.content);
          }
          default: {
            return [];
          }
        }
      })
    );
  }
}
