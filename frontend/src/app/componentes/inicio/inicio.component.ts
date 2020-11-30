import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {Global} from '../../servicios/global';
import { AuthService } from 'src/app/servicios/auth.service';
import { CetegoriasLandingService} from 'src/app/servicios/categorias-landing.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  categorias:any = [];
  public url: string;
  constructor(
    private authService: AuthService,
    private router: Router,private servicioCategorias: CetegoriasLandingService
  ) {
    this.url = Global.url;
   }

  ngOnInit(): void {
    if (this.authService.loggedIn()){
      if (this.authService.getUserRole() === 'admin'){
        this.router.navigate(['controlador-admin']);
      }
    }

    this.servicioCategorias.getCategoria_Landing()
    .subscribe( res => {
      this.categorias = res;
      console.log("Mostrar Categorias", res);

   

    }, err => {
      console.log(err);
    });


  }


  

}
