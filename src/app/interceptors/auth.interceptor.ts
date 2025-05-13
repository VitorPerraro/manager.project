import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/ApiService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setParams: { token: token }
      });
    }

    return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.apiService.renewToken().pipe(
              switchMap((renewalSuccess: boolean) => {
                if (renewalSuccess) {
                  return next.handle(authReq);
                } else {
                  return throwError(error);
                }
              }),
              catchError((err) => {
                return throwError(err);
              })
            );
          }

        return throwError(error);
      })
    );
  }
}