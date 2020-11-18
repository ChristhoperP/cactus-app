import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  obtenerProductosCarrito(id: any){
    return this._http.get(this.url + 'productos-carrito/'+id);

  }

  agregarCarritoNoLogged(producto): boolean {
    let productosCarrito = { productos: [] };

    if (!localStorage.getItem('productos-carrito')) {
      productosCarrito.productos.push(producto);
      localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito.productos));
      console.log('Agregó el producto con id ' + producto.idproducto + ' a su carrito de compras');
      return true;
    } else {

      productosCarrito.productos = JSON.parse(localStorage.getItem('productos-carrito'));

      if (productosCarrito.productos.findIndex( (prod: any) => prod.idproducto === producto.idproducto) > -1){
        return false;
      } else {
        productosCarrito.productos.push(producto);
        localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito.productos));
        console.log('Agregó el producto con id ' + producto.idproducto + ' a su carrito de compras');
        return true;
      }
    }

  }

  agregarCarritoLogged(idproducto, cantidad) {
    return this._http.post<any>(this.url + 'registro-carrito', {idproducto, cantidad} , {headers: this.headers});
  }

}
