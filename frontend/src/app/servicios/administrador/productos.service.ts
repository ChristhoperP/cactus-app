import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from '../global';
import { Router } from '@angular/router';

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  getProductInfo( idproducto: any): any {

    const params = new HttpParams().set('idproducto', idproducto.toString());
=======
  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
=======

  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
  }

  getProductInfo( idproducto: any): any {

    const params = new HttpParams().set('idproducto', idproducto.toString());
=======

  getGeneros(){
    return this._http.get(this.url + 'generos', {headers: this.headers});
  }

  getProductInfo( idproducto: any): any {

    const params = new HttpParams().set('idproducto', idproducto.toString());
>>>>>>> parent of a53ddec... Revert "Merge branch 'master' into BR"

    return this._http.get(this.url + 'productoporid', {headers: this.headers, params});
    // return this._http.get<any[]>(this.url + `productos/${idproducto}`);
>>>>>>> parent of a53ddec... Revert "Merge branch 'master' into BR"
  }

  getProductInfo( productId: number) {
    const params = new HttpParams().set('idproducto', productId.toString());
>>>>>>> parent of 216373b... Merge pull request #85 from ChristhoperP/BR
    return this._http.get(this.url + 'productoporid', {headers: this.headers, params});
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

<<<<<<< HEAD
=======
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

>>>>>>> parent of a53ddec... Revert "Merge branch 'master' into BR"

  


}


