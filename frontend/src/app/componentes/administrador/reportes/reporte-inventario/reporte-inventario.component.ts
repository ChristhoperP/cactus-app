import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {
  inventario:any=[];
  cantidadTotal=0;

  constructor() {
    this.inventario;
  }

  ngOnInit(): void {
  }

  recibeInventario(inventario){
    console.log(inventario);
    this.inventario=inventario;

    for (let i = 0; i < inventario.length; i++) {
     this.cantidadTotal+=inventario[i].cantidad;
    }

  }
}
