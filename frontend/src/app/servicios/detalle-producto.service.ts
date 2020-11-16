import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';


@Injectable({
  providedIn: 'root',
})
export class DetalleProductoService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {}

  getDetalle_Producto(id: string) {
    return this._http.get(this.url + 'detalleproducto/'+ id);
  }
}
