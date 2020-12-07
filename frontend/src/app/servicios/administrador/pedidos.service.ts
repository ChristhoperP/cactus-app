import { Injectable } from '@angular/core';
import { Global } from '../global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private _http: HttpClient,
  ) { }

  getPedidos(){
    return this._http.get<any>(this.url + 'traerPedidosUsuarios');
  }

  getDetallePedido(idpedido) {
    return this._http.get<any>(`${this.url}/traerPedidoDetalleProductos/${idpedido}`);
  }

  setEstadoPedido(pedido) {
    return this._http.post<any>(this.url + 'actualizarEstadoPedido', JSON.stringify(pedido), {headers: this.headers});
  }

}
