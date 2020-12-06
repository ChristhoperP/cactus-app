import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {
  usuarios:any = [];
  usuarioFilterByName = { nombre: '' }; 
  
  constructor( private _location: Location, private filter: FilterPipe) {
    this.usuarios;
    this.usuarioFilterByName;
   }

  ngOnInit(): void {
  }

  recibeUsuario(usuarios:any){
    console.log(usuarios);
    this.usuarios=usuarios;
  }

  recibeNombreUsuario(nombre){
    this.usuarioFilterByName = { nombre: nombre }; 
    console.log(this.usuarioFilterByName);
    }
  
    limpiarModal(){
      this.usuarios = [];
 
    }

  regresar() {
    this._location.back();
  }

}
