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

  obtenerDepartamentos() {
    return this._http.get(this.url + 'departamento');
  }

  obtenerMunicipios() {
    return this._http.get(this.url + 'municipio');
  }

  obtenerAgenciasEnvio() {
    return this._http.get(this.url + 'agencia-envio');
  }

  procederPago(informacionPago) {
    let params = JSON.stringify(informacionPago);

    return this._http.post<any>(this.url + "checkout", params, { headers: this.headers });
  }

  calcularTotal(productos, idAgenciaEnvio){
    let params = JSON.stringify([productos, idAgenciaEnvio]);
    //let params2 = JSON.stringify(idAgenciaEnvio);
    return this._http.post<any>(this.url + "calcularTotal", params, { headers: this.headers });
  }
}
