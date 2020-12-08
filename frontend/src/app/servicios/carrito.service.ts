import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  @Output() cantidadProductos: EventEmitter<number> = new EventEmitter();
  cantProductos = 0;

  constructor(private _http: HttpClient) { }

  obtenerProductosCarrito(){
    return this._http.get(this.url + 'productos-carrito');

  }

  agregarCarritoNoLogged(producto): boolean {
    let productosCarrito = { productos: [] };

    if (!localStorage.getItem('productos-carrito')) {
      productosCarrito.productos.push(producto);
      localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito.productos));
      this.cantProductos++;
      this.cantidadProductos.emit(productosCarrito.productos.length);
      console.log('Agregó el producto con id ' + producto.idproducto + ' a su carrito de compras');
      return true;
    } else {

      productosCarrito.productos = JSON.parse(localStorage.getItem('productos-carrito'));

      if (productosCarrito.productos.findIndex( (prod: any) => prod.idproducto === producto.idproducto) > -1){
        return false;
      } else {
        productosCarrito.productos.push(producto);
        localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito.productos));
        this.cantProductos++;
        this.cantidadProductos.emit(productosCarrito.productos.length);
        console.log('Agregó el producto con id ' + producto.idproducto + ' a su carrito de compras');
        return true;
      }
    }

  }

  agregarCarritoLogged(idproducto, cantidad) {
    return this._http.post<any>(this.url + 'registro-carrito', {idproducto, cantidad} , {headers: this.headers});
  }


  eliminarProductoCarrito( id:any ){
    return this._http.post(this.url + 'eliminar-producto-carrito', {idproducto: id}, {headers: this.headers} );
  }

  setCantidadProductos( cantidad: number ): void {
    this.cantidadProductos.emit(cantidad);
  }

  getCantidadProductos() {
    let productosCarrito = { productos: [] };

    if (localStorage.getItem('productos-carrito')) {
      productosCarrito.productos = JSON.parse(localStorage.getItem('productos-carrito'));
      this.cantProductos = productosCarrito.productos.length
    }
    return this.cantProductos;
  }

}
