import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';


@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  ventas:any=[];
  cantidadTotal=0;
  productosFilterByName = { nombre_producto: '' }; 


  constructor(private _location: Location, private filter: FilterPipe) {
    this.ventas;
    this.productosFilterByName;
   }

  ngOnInit(): void {
  }

  recibeVentas(ventas:any){
    console.log(ventas);
    this.ventas=ventas;    
    for (let i = 0; i < ventas.length; i++) {
      this.cantidadTotal+=ventas[i].cantidad_vendida;
     }
  }

  recibeNombreProducto(nombre){
  this.productosFilterByName = { nombre_producto: nombre }; 
  console.log(this.productosFilterByName);
  }

  limpiarModal(){
    this.ventas = [];
    this.cantidadTotal=0;
  }

  regresar() {
    this._location.back();
  }

}
