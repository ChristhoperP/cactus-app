import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PayGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      if (localStorage.getItem('productos-carrito')) {
        this.router.navigate(['iniciar-sesion/pago']);
      } else {
        this.router.navigate(['inicio']);
      }
      return false;
    }
    return true;
  }
}
