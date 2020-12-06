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
  @ViewChild('showModalIngresos') closeAddExpenseModalVentas: ElementRef;
  showModalIngresos: boolean = true;

  usuarios: any = [];
  formularioIngresos:FormGroup = new FormGroup({
    
    Anio: new FormControl(''),
    Mes: new FormControl(''),
  
  });
  constructor(private _location: Location,private _reporteService: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this._reporteService.getIngresoReporte()
      .subscribe( res => {
        this.usuarios = res;
        console.log(res);
      }, err => {
        console.log(err);
      });
  }
 regresar() {
    this._location.back();
  }
 
}
