import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth2: any;

  baseUrl: string = environment.baseUrl;
  authUrl: string = `${this.baseUrl}/login`;
  userUrl: string = `${this.baseUrl}/user`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

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

  async googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '413438018271-3ja5lgg721ltsvm1860qafviior8ruek.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        // resolve promise
        resolve(true);
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    // Kill google auth session
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
