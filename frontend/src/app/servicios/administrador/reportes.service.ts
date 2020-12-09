import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  url = Global.url;

  constructor(private _http: HttpClient) { }
 
  getUsuariosReporte() {
    return this._http.get(this.url + 'reporteUsuario');
  }

  getVentasReporte() {
    return this._http.get(this.url + 'reporteVentas');
  }

  getInventarioReporte() {
    return this._http.get(this.url + 'reporteInventario');
  }

  getIngresoReporte() {
    return this._http.get(this.url + 'reporteIngresos');
  }

  getIngresosGrafica() {
    return this._http.get(this.url + 'ingresosPorMes');
  }

}
