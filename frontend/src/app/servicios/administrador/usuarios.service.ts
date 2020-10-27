import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private _http: HttpClient
  ) { }

  getUsuariosRegistrados() {
    return this._http.get(this.url + 'obtenerUsuariosRegistrados');
  }

  updateUser( user ) {
    const params = JSON.stringify(user);
    return this._http.post<any>(this.url + 'actualizarInfoUsuario', user);
  }
}
