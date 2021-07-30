import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.has('Accept'))
    {
      console.log('Uninterrupted HTTP call',req);
      return next.handle(req);
    }
    else{
      const authReq = req.clone({
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      });
  
      console.log('Intercepted HTTP call', authReq);
  
      return next.handle(authReq);
    }
    
  }

}
