import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, delay, finalize, identity } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('email-exists') ||
      (request.method === 'POST' && request.url.includes('orders'))
    ) {
      return next.handle(request);
    }

    this.loadingService.showSpinner();

    return next.handle(request).pipe(
      environment.production ? identity : delay(100),
      finalize(() => this.loadingService.hideSpinner())
    );
  }
}
