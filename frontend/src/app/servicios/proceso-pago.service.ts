import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProcesoPagoService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  obtenerDepartamentos(){
    return this._http.get(this.url + 'departamento');
  }

  obtenerMunicipios(){
    return this._http.get(this.url + 'municipio');
  }

  obtenerAgenciasEnvio(){
    return this._http.get(this.url + 'agencia-envio');
  }

  registrarInformacionEnvio(informacion){
    return this._http.post<any>(this.url + "registro-informacion-envio", informacion);
  }
}
