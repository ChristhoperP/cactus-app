import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  obtenerProductosCarrito(id: any){
    return this._http.get(this.url + 'productos-carrito/'+id);

  }
}
