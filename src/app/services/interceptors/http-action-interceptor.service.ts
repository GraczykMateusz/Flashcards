import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {WorkingSnackbarComponent} from '../../components/common/working-snackbar/working-snackbar.component';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../components/common/info-dialog/info-dialog.component';

export const SNACKBAR_BYPASS = new HttpContextToken(() => false);

@Injectable()
export class HttpActionInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('test')
    if (!request.context.get(SNACKBAR_BYPASS)) {

      const shouldOpenSnackBar = HttpActionInterceptor.shouldOpenSnackBar(request);

      if (shouldOpenSnackBar) {
        this._snackBar.openFromComponent(WorkingSnackbarComponent);
      }

      return next.handle(request).pipe(
        tap(event => {
          if (shouldOpenSnackBar && event instanceof HttpResponse && event.ok) {
            this.openSuccessSnackbar(request);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // Close WorkingSnackbar
          this._snackBar.dismiss();
          this.openErrorDialog(error);
          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }

  private static shouldOpenSnackBar(request: HttpRequest<unknown>): boolean {
    return ['POST', 'PUT', 'DELETE'].includes(request.method);
  }

  private openSuccessSnackbar(request: HttpRequest<unknown>): void {
    const message = request.method === 'DELETE' ? 'Usunięto   ✅' : 'Zapisano   ✅';
    this._snackBar.open(message, undefined,
      {duration: 2500});
  }

  private openErrorDialog(error: HttpErrorResponse): void {
    // Show only known errors
    if (error.error.message) {
      error.error.message = error.error.message.replaceAll('\n','<br/>');
      this.dialog.open(InfoDialogComponent, {
        maxWidth: '50%',
        data: {
          message: 'Błąd podczas przetwarzania żądania: <b>' + error.error.message + '</b>'
        }
      });
    }
  }
}
