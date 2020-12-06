import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {
  inventario:any=[];
  cantidadTotal=0;
  productosFilterByName = { nombre: '' }; 


  constructor(private _location: Location, private filter: FilterPipe) {
    this.inventario;
    this.productosFilterByName;

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

  recibeNombreProducto(nombre){
    this.productosFilterByName = { nombre: nombre }; 
    }
  
  limpiarModal(){
    this.inventario = [];
    this.cantidadTotal=0;
  }

  regresar() {
    this._location.back();
  }
}
