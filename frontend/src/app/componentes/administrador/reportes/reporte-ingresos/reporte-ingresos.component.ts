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

  recibeIngresosAnio(ingresosAnio){
    var ingresos:any=[];
    ingresos=ingresosAnio;
    
  for(let i=0; i<ingresos.length; i++){
    this.ingresosAnio.push(ingresos[i]);
    console.log(ingresos[i].ventasxanio);
 }
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
