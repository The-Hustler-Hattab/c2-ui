import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {



  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private loadingSpinner: LoadingSpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSpinner.show()
    return this.handleAccess(request, next);
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only add an access token to allowed origins
    const allowedOrigins = ['http://localhost'];
    if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
      const accessToken = this.oktaAuth.getAccessToken();
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // Handle successful responses here
        if (event instanceof HttpResponse) {
          this.loadingSpinner.hide()

           
          
        }
      }),
      catchError((error) => {
        // Handle errors here
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP error:', error);
          this.loadingSpinner.hide()

        }
        return throwError(error); // Re-throw the error to propagate it
      }),
      
    )
  }
}
