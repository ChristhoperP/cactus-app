import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Global } from "./global";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = Global.url;
    private headers = new HttpHeaders().set('Content-Type','application/json');
    
    constructor(private _http: HttpClient, private _router: Router) { }


    signUp(user) {
        let params = JSON.stringify(user);

        return this._http.post<any>(this.url + "registro", params, {headers:this.headers});
    }

    iniciarSesion(user) {
        let params = JSON.stringify(user);
                        
        return this._http.post<any>(this.url + "validarUsuario", params, {headers:this.headers});        
    }

    loggedIn() {
        return !!localStorage.getItem('accessToken');
    }

    setToken(token): void {
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }

    logoutUser() {
        localStorage.removeItem('accessToken');
        this._router.navigate(['inicio']);
    }

}
