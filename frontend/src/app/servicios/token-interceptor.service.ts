import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "../servicios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private _AuthService: AuthService
  ) { }

  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${this._AuthService.getToken()}`
      }
    });

    return next.handle(tokenizeReq);
  }

}
