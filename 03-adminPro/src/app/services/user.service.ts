import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.baseUrl;
  authUrl: string = `${this.baseUrl}/login`;
  userUrl: string = `${this.baseUrl}/user`;
  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm): Observable<any> {
    return this.http
      .post(this.userUrl, formData)
      .pipe(tap((res: any) => localStorage.setItem('token', res.token)));
  }

  loginUser(formData: LoginForm): Observable<any> {
    return this.http
      .post(this.authUrl, formData)
      .pipe(tap((res: any) => localStorage.setItem('token', res.token)));
  }

  loginGoogle(token: string): Observable<any> {
    const url = `${this.authUrl}/google`;
    return this.http
      .post(url, { token })
      .pipe(tap((res: any) => localStorage.setItem('token', res.token)));
  }

  renewToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const url = `${this.authUrl}/renew`;
    // Add token to headers
    return this.http
      .get(url, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token)),
        map(() => true),
        catchError(() => of(false))
      );
  }
}
