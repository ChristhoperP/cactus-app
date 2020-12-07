import { Component, OnInit } from '@angular/core';

import {Location} from '@angular/common';

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styleUrls: ['./reporte-ingresos.component.css']
})
export class ReporteIngresosComponent implements OnInit {
  ingresosAnio:any = [];
  ingresosMes:any = [];
  nombre:any;

  tablaOcultaMes:boolean=false;
  tablaOcultaAnio:boolean=true;

  constructor( private _location: Location) { 
    this.ingresosAnio;
    this.ingresosMes;
  }

  ngOnInit(): void {
  }

  recibeIngresosAnio(anio:any){
    this.ingresosAnio=anio;
    console.log(this.ingresosAnio);
  }

  recibeIngresosMes(ingresosMes){
    this.ingresosMes=ingresosMes;
    console.log(this.ingresosMes);
  }

  regresar() {
    this._location.back();
  }

  ocultarTabla(tabla){
    switch(tabla){
      case "Anio": this.tablaOcultaAnio=true;
      this.tablaOcultaMes=false;
      break;
      case "Mes":this.tablaOcultaMes=true;
      this.tablaOcultaAnio=false;
      break;
    }
  }

}
