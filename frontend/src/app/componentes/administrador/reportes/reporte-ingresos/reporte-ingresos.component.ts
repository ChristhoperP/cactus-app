import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styleUrls: ['./reporte-ingresos.component.css']
})
export class ReporteIngresosComponent implements OnInit {
  ingresosAnio:any = [];

  constructor( private _location: Location) { 
    this.ingresosAnio;
  }

  ngOnInit(): void {
  }

  recibeIngresos(ingresosAnio){
    console.log(ingresosAnio);
    this.ingresosAnio=ingresosAnio;
  }

  regresar() {
    this._location.back();
  }

}
