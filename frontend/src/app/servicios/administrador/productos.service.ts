import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from '../global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  getTiposBases() {
    return this._http.get(this.url + 'tipos-bases', {headers: this.headers});
  }

  getCategorias() {
    return this._http.get(this.url + 'categorias', {headers: this.headers});
  }

  getEspecies() {
    return this._http.get(this.url + 'especies', {headers: this.headers});
  }

  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
  }

  getProductInfo( productId: number) {
    const params = new HttpParams().set('idproducto', productId.toString());
    return this._http.get(this.url + 'productoporid', {headers: this.headers, params});
  }

  getProductos(){
    return this._http.get(this.url + 'productos', {headers: this.headers});
  }
}


