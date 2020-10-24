import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = Global.url;

  constructor(
    private _http: HttpClient
  ) { }

  getUsuariosRegistrados() {
    return this._http.get(this.url + 'obtenerUsuariosRegistrados');
  }
}
