import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpErrorResponse,
    HttpXsrfTokenExtractor,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { retry, catchError } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { environment } from '../environments/environment';
  import { FileUploaderOptions } from 'ng2-file-upload';
  
  @Injectable()
  export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
      private router: Router,
      private tokenExtractor: HttpXsrfTokenExtractor,
    ) { }
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // const authToken = JSON.parse(localStorage.getItem('authToken'));
      // if (req.url.includes(environment.apiBaseUrl) && authToken) {
      //   req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken.access_token) });
      // }
  
      if (req.url.includes(environment.apiBaseUrl)) {
        // set XSRF token
        req = req.clone({ withCredentials: true });
        const xsrfToken = this.tokenExtractor.getToken();
        if (xsrfToken) {
          req = req.clone({ setHeaders: { 'X-XSRF-TOKEN': xsrfToken } });
        }
  
        // set Xdebug param
        if (environment.enableXdebug) {
          req = req.clone({ setParams: { XDEBUG_SESSION: 'PHPSTORM' } });
        }
      }
  
      return next.handle(req).pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          if (error.status == 401 || error.status == 403) {
            localStorage.removeItem('userInfo');
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class HttpUtils {
    apiUrl = environment.apiBaseUrl;
  
    constructor(protected tokenExtractor: HttpXsrfTokenExtractor) { }
  
    public setParams(params: any = {}) {
      params = Object.values(params).reduce((c, v, i) => v ? { ...(c as any), [Object.keys(params)[i]]: v } : c, {});
      return {
        params
      };
    }
  
    public setJsonBody(data: any): string {
      return data;
    }
  
    public getFileUploaderOptions(options: FileUploaderOptions = {}): FileUploaderOptions {
      let defaultOptions = {
        url: `${this.apiUrl}files`,
        method: 'POST',
        headers: [
          {
            name: 'X-XSRF-TOKEN',
            value: this.tokenExtractor.getToken(),
          }
        ],
      };
  
      return Object.assign(defaultOptions, options);
    }
  }