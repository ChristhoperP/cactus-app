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
  ingresoFiltrado = new EventEmitter<Object>();

  ingresosAnio: any = [];
  filtro;

  formularioIngresos:FormGroup = new FormGroup({
    Anio: new FormControl('Anio'),
    Mes: new FormControl('Mes'),
  });

  constructor(private _location: Location,private _reporteService: ReportesService, private router: Router) { }

  ngOnInit(): void {
      this._reporteService.getIngresoReporte()
      .subscribe( (res:any) => {
        this.ingresosAnio = res;
        console.log(res);
            }, err => { console.log(err); });
  }

  filtrar(){ 
    this.filtrosIngresos();
    this.showModalIngresos=false;
    this.closeAddExpenseModalIngresos.nativeElement.click();
  }
  
  filtrosIngresos(){
    var filtro = {
      "anio":this.formularioIngresos.get("Anio").value,
      "mes":this.formularioIngresos.get("Mes").value,
    }
    this.filtro=filtro;

    if (filtro.anio==="" &&
    filtro.mes===""  ) 
    {
    this.ingresoFiltrado.emit(this.ingresosAnio);
    console.log("sin filtro");
    }

    return console.log(this.filtro);
  }



 regresar() {
    this._location.back();
  }
 
}
