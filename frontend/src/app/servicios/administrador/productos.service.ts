import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from '../global';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  getTiposBases() {
    return this._http.get(this.url + 'tipos-bases', {headers: this.headers});
  }

  getCategorias() {
    return this._http.get(this.url + 'categorias', {headers: this.headers});
  }

  getEspecies() {
    return this._http.get(this.url + 'especies', {headers: this.headers});
  }


  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
  }

  getProductInfo( idproducto: any): any {

    const params = new HttpParams();
    params.append('idproducto', idproducto);

    return this._http.get(this.url + `productoporid/${idproducto}`, {headers: this.headers});
    // return this._http.get<any[]>(this.url + `productos/${idproducto}`);
  }

  getProductImage( imageId: any) {
    return this._http.get(this.url + `get-image/${imageId}`);
  }

  getProductos(){
    return this._http.get(this.url + 'productos', {headers: this.headers});
  }

  agregarProducto(producto){
    let params = JSON.stringify(producto);

    return this._http.post<any>(this.url + "registro-producto", producto);

  }

  agregarEspecie(especie){
    
    let params = JSON.stringify(especie);

    return this._http.post<any>(this.url + "registrarEspecie", params, {headers:this.headers});

  }

  updateProduct ( product ) {
    const params = JSON.stringify( product );
    return this._http.post<any>(this.url + 'actualizarProducto', product);
  }

  deleteProduct( productid ){
    return this._http.post(this.url + 'eliminar-producto', {idproducto: productid}, {headers: this.headers} );
  }

}


