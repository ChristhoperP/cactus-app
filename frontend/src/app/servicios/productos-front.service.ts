import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';


@Injectable({
  providedIn: 'root'
})
export class ProductosFrontService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }
  getProducto() {
    return this._http.get(this.url + 'productoslanding');
  }

  getEspecies() {
    return this._http.get(this.url + 'especies', {headers: this.headers});
  }

  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
  }
}
