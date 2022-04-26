import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = 'https://reqres.in/api';
  usersUrl = `${this.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', '2').append('name', 'Santiago');
    // -------------------------- These info has been passed to the interceptor!! ----------------
    // const headers = new HttpHeaders({
    //   'token-user': 'AGHAAIDHIAS896217346',
    // });
    return this.http
      .get(this.usersUrl, { params })
      .pipe(map((res: any) => res.data));
  }

  getUsersError(): Observable<any> {
    const url = `https://reqresuququq.in`;
    return this.http.get(url).pipe(map((res: any) => res.data));
  }
}
