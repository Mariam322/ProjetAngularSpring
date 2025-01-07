import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private AuthServ:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/auth/login")){
      let newRequest=request.clone({
        headers :request.headers.set('Authorization','Bearer ' + this.AuthServ.accessToken)
      })
      return next.handle(newRequest);
    }else
      return next.handle(request);
    
  }

  
}
