import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  private url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  agregarPromocion(promocion){
    console.log(promocion);
    
    return this._http.post<any>(this.url + "registro-promocion", promocion);

  }

  getPromociones(){
    return this._http.get(this.url + 'obtener-promocion', {headers: this.headers});
  }
}
