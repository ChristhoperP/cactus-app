import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class HistorialCompraService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor( private _http: HttpClient) { }

  getHistorial() {
    return this._http.get(this.url + 'historialCompras');
  }
}
