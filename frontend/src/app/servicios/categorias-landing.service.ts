import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CetegoriasLandingService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) { }
  getCategoria_Landing() {
    return this._http.get(this.url + 'categoriaLanding');
  }

}
