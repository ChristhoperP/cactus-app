import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PromocionesFrontService {

  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  getPromocion() {
    return this._http.get(this.url + 'obtener-promocion');
  }
}

