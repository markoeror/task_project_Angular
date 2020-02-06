import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthenticationService } from "@app/_services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          location.reload(true);
        }
        if (err.status === 400) {
          console.log("err", err.error);

          if (err.error.message) {
            return throwError(err.error.message);
          }

          return throwError(err);
        }
        console.log("err", err);

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
