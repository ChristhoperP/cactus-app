import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from '../global';

@Injectable({
  providedIn: 'root',
})
export class ServAdminService {
  private url = Global.url;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  getVisits() {
    return this.http.get(this.url + 'visita-usuario', {headers: this.headers});
  }

  getCantidadProducto() {
    return this.http.get(this.url + 'productos', {headers: this.headers});
  }

  getCategoria() {
    return this.http.get(this.url + 'productosCategoria', {headers: this.headers});
  }

  Carga (archivos:string[]){
    for ( let archivo of archivos){
      let script = document.createElement("script");
      script.src ="./assets/js/"+archivo+".js";
      let body=document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }


  }

}
