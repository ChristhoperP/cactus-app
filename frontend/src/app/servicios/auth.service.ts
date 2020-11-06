import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Global } from "./global";
import { JwtHelperService } from '@auth0/angular-jwt';
import { SERVER_URL } from '../SERVER_URL';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    @Output() updatedName: EventEmitter<string> = new EventEmitter();

    private url = Global.url;
    private headers = new HttpHeaders().set('Content-Type','application/json');

    constructor(private _http: HttpClient, private _router: Router, public jwtHelper: JwtHelperService) { }


    signUp(user) {
        let params = JSON.stringify(user);

        return this._http.post<any>(this.url + "registro", params, {headers:this.headers});
    }

    iniciarSesion(user) {
        let params = JSON.stringify(user);
                        
        return this._http.post<any>(this.url + "validarUsuario", params, {headers:this.headers});        
    }

    loggedIn () : boolean {
        // return !!localStorage.getItem('accessToken');
        const token = localStorage.getItem('accessToken');
        return !this.jwtHelper.isTokenExpired(token);
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

    setUserRole( role ): void {
        localStorage.setItem('rol', role);
    }

    getUserRole(): string {
        return localStorage.getItem('rol');
    }

    getInfoUsuario() {
        return this._http.get(`${SERVER_URL}/infoPerfil`);
      }

    setUpdatedName( name: string ): void {
        this.updatedName.emit(name);
    }

}
