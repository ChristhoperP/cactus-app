import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  ventas:any=[];
  cantidadTotal=0;

  constructor(private _location: Location) {
    this.ventas;
   }

  ngOnInit(): void {
  }

  recibeVentas(ventas){
    console.log(ventas);
    this.ventas=ventas;

    for (let i = 0; i < ventas.length; i++) {
      this.cantidadTotal+=ventas[i].cantidad_vendida;
     }
  }

  regresar() {
    this._location.back();
  }

}
