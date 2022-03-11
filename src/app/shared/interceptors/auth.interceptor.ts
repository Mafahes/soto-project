import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('api_token');
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.removeItem('api_token');
          document.location.reload();
        }
        this.snackBar.open('Ошибка ' + err.status, 'OK', {
          duration: 1000,
          panelClass: ['snack-bar-card']
        });
        return throwError(err);
      })
    );
  }
}
