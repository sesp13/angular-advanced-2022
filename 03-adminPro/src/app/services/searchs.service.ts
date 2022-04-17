import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private http: HttpClient) {}

  search(
    type: allowedType,
    term: string
  ): Observable<any> {
    const url = `${this.searchUrl}/collection/${type}/${term}`;
    return this.http.get<any[]>(url, { headers: this.headers }).pipe(
      map((res: any) => {
        switch (type) {
          case 'users': {
            return this.transformUsers(res.content);
          }
          default: {
            return [];
          }
        }
      })
    );
  }
}
