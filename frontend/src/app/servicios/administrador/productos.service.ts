import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
