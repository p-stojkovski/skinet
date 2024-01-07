import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 400) {
            //error.error.errors means validation errors that we are handling into compoment(ex. forms)
            if (error.error.errors) { 
              throw error.error;
            } else {
              this.toastr.error(error.error.message, error.status.toString());
            }
          }
          if (error.status === 401) {
            this.toastr.error(error.error.message, error.status.toString());
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            //with navigationExtras we are sending the error information to the component where we want to read the error
            const navigationExtras: NavigationExtras = {
              state: {
                error: error.error
              }
            };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }

        return throwError(() => new Error(error.message));
      })
    );
  }
}
