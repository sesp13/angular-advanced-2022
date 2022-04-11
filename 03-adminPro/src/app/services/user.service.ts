import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerForm.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.baseUrl;
  authUrl: string = `${this.baseUrl}/user`;
  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(this.authUrl, formData);
  }
}
