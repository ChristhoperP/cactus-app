import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {
  inventario:any=[];

  constructor() {
    this.inventario;
    console.log(this.inventario);
    
   }

  ngOnInit(): void {
    console.log("prueba");
  }

  recibeInventario(inventario){
    console.log(inventario);
    this.inventario.push(inventario);
  }
}
