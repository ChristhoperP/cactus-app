import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {
  usuarios:any = [];
  constructor() {
    this.usuarios;
    console.log(this.usuarios);
   }

  ngOnInit(): void {
  }
  recibeUsuario(usuarios){
    console.log(usuarios);
    this.usuarios=usuarios;
  }
}
