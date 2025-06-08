import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const url = req.url;

    const isPublic = url.includes(environment.apiUrl + '/api/v1/public/');
    const isExternal = !url.includes(environment.apiUrl);

    // If the request is internal and not public
    if (!isPublic && !isExternal) {
      if (token && token.length > 0) {
        const tokenizedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(tokenizedReq).pipe(
          tap({
            error: (err) => {
              if (err instanceof HttpErrorResponse) {
                console.error('HTTP Error:', err);
              }
            }
          })
        );
      } else {
        // If the request is trying to get current user but no token, redirect
        const isCurrentUserCheck = url.includes(environment.apiUrl + '/merchant/current-user');

        if (isCurrentUserCheck) {
          this.router.navigate(['/SignIn']);
        }

        // Continue request without token (possibly returning 401 from backend)
        return next.handle(req).pipe(
          tap({
            error: (err) => {
              if (err instanceof HttpErrorResponse) {
                console.error('HTTP Error:', err);
              }
            }
          })
        );
      }
    }

    // For public or external requests
    return next.handle(req).pipe(
      tap({
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            console.error('HTTP Error:', err);
          }
        }
      })
    );
  }
}
