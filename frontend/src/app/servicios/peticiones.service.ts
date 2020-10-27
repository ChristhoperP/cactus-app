import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Global } from "./global";

@Injectable({
    providedIn: 'root'
})
export class PeticionesService {

    private url = Global.url;
    private headers = new HttpHeaders().set('Content-Type','application/json');
    
    constructor(private _http: HttpClient, private _router: Router) { }


    registraVisitaInicio() {
        return this._http.post<any>(this.url + "registro-visita-inicio", {headers:this.headers});
    }

    registraFinVisita(idvisita) {
        return this._http.post<any>(this.url + "registro-visita-fin/"+idvisita, {headers:this.headers});        
    }

    setIdVisita(idvisita): void {
        localStorage.setItem('idVisita', idvisita);
    }

    getIdVisita() {
        return localStorage.getItem('idVisita');
    }

    removeIdVisita() {
        localStorage.removeItem('idVisita');
    }

    eliminarImagenPerfil(image){
        return this._http.delete<any>(this.url + "delete-image/"+image, {headers:this.headers});
    }

    eliminarImagenProducto(image){
        return this._http.delete<any>(this.url + "delete-image/" + image, {headers: this.headers});
    }
}