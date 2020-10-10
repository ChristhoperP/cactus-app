import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Global } from "./global";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private url = Global.url;
  constructor(private _http: HttpClient, private _router: Router) { }


  signUp(user) {
    let params = JSON.stringify(user);

    return this._http.post<any>(this.url + "signup", params);
}

signIn(user) {
    let params = JSON.stringify(user);

    return this._http.post<any>(this.url + "signin", params);
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
