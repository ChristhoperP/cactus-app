import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {
  usuarios:any = [];
  constructor() { }

  ngOnInit(): void {
  }
  nuevoUsuario(producto){
    console.log(producto);
    this.usuarios.push(producto);
  }
}
