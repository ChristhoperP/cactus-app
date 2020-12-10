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
  porAgregar = 0;
  porEliminar = 0;

  constructor(private _http: HttpClient) { }

  obtenerProductosCarrito(){
    return this._http.get(this.url + 'productos-carrito');
  }

  agregarCarritoNoLogged(producto): boolean {
    let productosCarrito = { productos: [] };

    if (!localStorage.getItem('productos-carrito')) {
      productosCarrito.productos.push(producto);
      localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito.productos));
      this.cantProductos += parseInt(producto.cantidadencarrito, 10);
      this.cantidadProductos.emit(this.cantProductos);
      console.log('Se emitió: ', this.cantProductos);
      console.log('Agregó el producto con id ' + producto.idproducto + ' a su carrito de compras');
      return true;
    } else {
      productosCarrito.productos = JSON.parse(localStorage.getItem('productos-carrito'));

      if (productosCarrito.productos.findIndex( (prod: any) => prod.idproducto === producto.idproducto) > -1){
        this.cantidadProductos.emit(this.cantProductos);
        console.log('Se emitió: ', this.cantProductos);
        return false;
      } else {
        productosCarrito.productos.push(producto);
        localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito.productos));
        this.cantProductos += parseInt(producto.cantidadencarrito, 10);
        this.cantidadProductos.emit(this.cantProductos);
        console.log('Se emitió: ', this.cantProductos);
        console.log('Agregó el producto con id ' + producto.idproducto + ' a su carrito de compras');
        return true;
      }
    }

  }

  agregarCarritoLogged(idproducto, cantidad) {
    this.porAgregar += parseInt(cantidad, 10);
    return this._http.post<any>(this.url + 'registro-carrito', {idproducto, cantidad} , {headers: this.headers});
  }

  eliminarProductoCarrito( id:any, cantidad: number ){
    this.porEliminar += cantidad;
    return this._http.post(this.url + 'eliminar-producto-carrito', {idproducto: id}, {headers: this.headers} );
  }

  setCantidadProductos( cantidad: number ): void {
    this.cantProductos = cantidad;
    this.cantidadProductos.emit(this.cantProductos);
  }

  getCantidadProductos() {
    let productosCarrito = { productos: [] };
    let cantidadEnCarrito = 0;

    if (localStorage.getItem('productos-carrito')) {
      productosCarrito.productos = JSON.parse(localStorage.getItem('productos-carrito'));

      for (const prod of productosCarrito.productos) {
        cantidadEnCarrito += parseInt(prod.cantidadencarrito, 10);
      }
      this.cantProductos = cantidadEnCarrito;
    }
    return this.cantProductos;
  }

  actualizarAgregados() {
    this.cantProductos += this.porAgregar;
    this.porAgregar = 0;
    this.cantidadProductos.emit(this.cantProductos);
  }

  actualizarEliminados() {
    this.cantProductos -= this.porEliminar;
    this.porEliminar = 0;
    this.cantidadProductos.emit(this.cantProductos);
  }

}
