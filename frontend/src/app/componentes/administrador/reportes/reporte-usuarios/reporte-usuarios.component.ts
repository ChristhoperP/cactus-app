import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {
  usuarios:any = [];
  
  constructor( private _location: Location) {
    this.usuarios;
   }

  ngOnInit(): void {
  }
  recibeUsuario(usuarios){
    console.log(usuarios);
    this.usuarios=usuarios;
  }

  regresar() {
    this._location.back();
  }

}
