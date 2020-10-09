import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SERVER_URL } from '../SERVER_URL'; // URL del servidor

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = SERVER_URL;
  constructor(private http: HttpClient) { }

  iniciarSesion( usuario: Object){
    return this.http.post<any>(this.URL + '/login', usuario);
  }
  
}
