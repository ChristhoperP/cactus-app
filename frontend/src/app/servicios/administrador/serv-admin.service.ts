import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../SERVER_URL';

@Injectable({
  providedIn: 'root',
})
export class ServAdminService {
  constructor(private http: HttpClient) {}

  getVisits() {
    return this.http.get(`${SERVER_URL}/visita-usuario`);
  }

  getCantidadProducto() {
    return this.http.get(`${SERVER_URL}/productos`);
  }

  getCategoria() {
    return this.http.get(`${SERVER_URL}/productosCategoria`);
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
