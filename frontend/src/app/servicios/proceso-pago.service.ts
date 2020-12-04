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

  eliminarProductoCarrito(idProducto){
    let params = JSON.stringify(JSON.parse('{"idproducto":'+idProducto+'}'));
    return this._http.post<any>(this.url + "eliminar-producto-carrito", params, { headers: this.headers });
  }
  registrarInformacionEnvio(informacion){
    return this._http.post<any>(this.url + "registro-informacion-envio", informacion);
  }
  
}
