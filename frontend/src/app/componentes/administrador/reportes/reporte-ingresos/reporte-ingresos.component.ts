import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../servicios/administrador/reportes.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styleUrls: ['./reporte-ingresos.component.css']
})
export class ReporteIngresosComponent implements OnInit {
  ingresosAnio:any = [];
  ingresosMes:any = [];
  tablaOcultaMes:boolean=false;
  tablaOcultaAnio:boolean=true;

  constructor( private _location: Location,private _reporteService: ReportesService) { 
    this.ingresosAnio;
  }

  ngOnInit(): void {
    this._reporteService.getIngresoReporte()
    .subscribe( (res:any) => {
      this.ingresosAnio = res.IngresosPorAnio;
      this.ingresosMes=res.IngresosPorMes;
      console.log( this.ingresosMes);
          }, err => { console.log(err); });
  }

  recibeIngresos(ingresosAnio){
    console.log(ingresosAnio);
    this.ingresosAnio=ingresosAnio;
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
