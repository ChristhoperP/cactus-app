import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosFrontService {
  url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getProducto() {
    return this._http.get(this.url + 'productoslanding');
  }

  getEspecies() {
    return this._http.get(this.url + 'especies', {headers: this.headers});
  }

  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
  }

  getFamilia(){
    return this._http.get(this.url + 'familia', {headers: this.headers});
  }

  addToCartNoLogged(idproducto, cantidad): boolean {
    let productosCarrito = { productos: [] };

    if (!localStorage.getItem('productos-carrito')) {
      productosCarrito.productos.push({idproducto, cantidad});
      localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito));
      console.log('Agregó el producto con id ' + idproducto + ' a su carrito de compras');
      return true;
    } else {

      productosCarrito = JSON.parse(localStorage.getItem('productos-carrito'));

      if (productosCarrito.productos.findIndex( (prod: any) => prod.idproducto === idproducto) > -1){        
        return false;
      } else {
        productosCarrito.productos.push({idproducto, cantidad});
        localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito));
        console.log('Agregó el producto con id ' + idproducto + ' a su carrito de compras');
        return true;
      }
    }

  }

  addToCartLogged(idproducto, cantidad) {
    return this._http.post<any>(this.url + 'registro-carrito', {idproducto, cantidad} , {headers: this.headers});
  }
}
