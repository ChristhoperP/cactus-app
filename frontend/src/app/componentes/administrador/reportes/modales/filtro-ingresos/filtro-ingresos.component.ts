import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-filtro-ingresos',
  templateUrl: './filtro-ingresos.component.html',
  styleUrls: ['./filtro-ingresos.component.css']
})
export class FiltroIngresosComponent implements OnInit {
  @ViewChild('closeAddExpenseModalIngresos') closeAddExpenseModalIngresos: ElementRef;
  showModalIngresos: boolean = true;

  @Output() 
  ingresoFiltradoMes = new EventEmitter<Object>();

  @Output() 
  ingresoFiltradoAnio = new EventEmitter<Object>();

  ingresosAnio: any = [];
  ingresosMes:any = [];
  
  filtro;

  formularioIngresos:FormGroup = new FormGroup({
    Anio: new FormControl(''),
    Mes: new FormControl(''),
  });

  constructor(private _location: Location,private _reporteService: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this._reporteService.getIngresoReporte()
    .subscribe( (res:any) => {
      this.ingresosAnio = res.IngresosPorAnio;
      this.ingresosMes=res.IngresosPorMes;
      console.log( this.ingresosMes);
      console.log( this.ingresosAnio);
          }, err => { console.log(err); });
  }

  filtrar(){ 
    this.filtrosIngresos();
    this.showModalIngresos=false;
    this.closeAddExpenseModalIngresos.nativeElement.click();
    this.formularioIngresos.reset();
  }
  
  filtrosIngresos(){
    var filtro = {
      "anio":this.formularioIngresos.get("Anio").value,
      "mes":this.formularioIngresos.get("Mes").value,
    }
    this.filtro=filtro;

    if ((filtro.anio==="" || filtro.anio===null)  &&
        (filtro.mes===""  || filtro.mes===null)
    ) 
    {
      this.ingresoFiltradoMes.emit(this.ingresosMes);
      this.ingresoFiltradoAnio.emit(this.ingresosAnio);
      console.log(this.ingresosMes, this.ingresosAnio);
      console.log("sin filtro");
    } else {
      // filtro por anio
       if ((filtro.anio!="" || filtro.anio!=null) && 
           (filtro.mes==="" || filtro.mes===null) ) {
         var filtroAnio:any = [];

         filtroAnio=this.ingresosAnio.filter(anio => anio.ingresosporanio === parseInt(filtro.anio) );
         console.log(filtroAnio);
         
         this.ingresoFiltradoAnio.emit(filtroAnio);
       }
       else {
        
         if ((filtro.anio ==="" || filtro.anio===null) && 
             (filtro.mes!=""  || filtro.mes!=null) ) {
              var filtroMes:any = [];

              filtroMes=this.ingresosMes.filter(mes => mes.ingresospormes.substr(5,3) === filtro.mes);
              console.log(filtroMes);
              this.ingresoFiltradoMes.emit(filtroMes);
         }
      }
      
      

    return console.log(this.filtro);
  }
  }

 regresar() {
    this._location.back();
  }
 
}
