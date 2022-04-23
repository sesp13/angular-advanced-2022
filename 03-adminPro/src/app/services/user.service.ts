import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadUsers } from '../interfaces/loadUsers.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { UpdateUserForm } from '../interfaces/updateUserForm.interface';
import { User } from '../models/user.model';
import { userRole } from '../types/userRole.type';
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;
  private authUrl: string = `${this.baseUrl}/login`;
  private userUrl: string = `${this.baseUrl}/user`;

  auth2: any;
  user?: User;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get userUid() {
    return this.user?.uid ?? '';
  }

  get role(): userRole {
    return this.user?.role ?? 'USER_ROLE';
  }

  get headers() {
    return {
      'x-token': this.token,
    };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  private setlocalInfo(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('menu', JSON.stringify(res.menu));
  }

  createUser(formData: RegisterForm): Observable<any> {
    return this.http
      .post(this.userUrl, formData)
      .pipe(tap((res: any) => this.setlocalInfo(res)));
  }

  // Update current user profile
  updateProfile(formData: UpdateUserForm) {
    // Build correct data
    const data = {
      ...formData,
      role: this.user?.role,
    };
    const url = `${this.userUrl}/${this.userUid}`;
    return this.http.put(url, data, { headers: this.headers });
  }

  updateUser(user: User) {
    const url = `${this.userUrl}/${user.uid}`;
    return this.http.put(url, user, { headers: this.headers });
  }

  loadUsers(from: number = 0): Observable<LoadUsers> {
    const params = new HttpParams().set('from', from);
    return this.http
      .get<LoadUsers>(this.userUrl, {
        params,
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          // Create instances
          const users = res.users.map((user) => {
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
          return { users, total: res.total };
        })
      );
  }

  deleteUser(uid?: string): Observable<any> {
    const url = `${this.userUrl}/${uid}`;
    return this.http.delete(url, { headers: this.headers });
  }

  // ----------------- Auth -------------------------

  loginUser(formData: LoginForm): Observable<any> {
    return this.http
      .post(this.authUrl, formData)
      .pipe(tap((res: any) => this.setlocalInfo(res)));
  }

  loginGoogle(token: string): Observable<any> {
    const url = `${this.authUrl}/google`;
    return this.http
      .post(url, { token })
      .pipe(tap((res: any) => this.setlocalInfo(res)));
  }

  renewToken(): Observable<boolean> {
    const url = `${this.authUrl}/renew`;
    // Add token to headers
    return this.http
      .get(url, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          this.setlocalInfo(res);
          // Set auth user
          const { name, email, role, google, img, uid } = res.user;
          this.user = new User(name, email, undefined, img, google, role, uid);
          // Create Observable response
          return true;
        }),
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
    // Remove local info
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    // Kill google auth session
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
