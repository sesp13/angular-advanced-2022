import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Global data
    const headers = new HttpHeaders({
      'token-user': 'AGHAAIDHIAS896217346',
    });
    console.log('Intercepted stuff');
    // Clone the request and set meta data
    const reqClone = req.clone({
      headers,
    });
    // Return the new clonned request and handle errors
    return next.handle(reqClone).pipe(catchError(this.manageError));
  }

  manageError(err: HttpErrorResponse) {
    console.log('There was an error');
    console.warn(err);
    return throwError(() => 'My custom error');
  }
}
