import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.component.html',
  styleUrls: ['./filtro-usuarios.component.css']
})
export class FiltroUsuariosComponent implements OnInit {
  @ViewChild('closeAddExpenseModalUsuarios') closeAddExpenseModalUsuarios: ElementRef;
  showModalUsuarios: boolean = true;
  
  @Output() 
  usuarioFiltrado = new EventEmitter<Object>();

  usuarios:any = [];
  filtro;

  formularioUsuario:FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    idUsuario: new FormControl(''),
    nombreUsuario: new FormControl(''),
  
  });
  constructor( private _location: Location,private _reporteService: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this._reporteService.getUsuariosReporte()
      .subscribe( res => {
        this.usuarios = res;
        console.log(res);
      }, err => {
        console.log(err);
      });

  }

  filtrar(){ 
    this.filtrosUsuarios();
    this.showModalUsuarios=false;
    this.closeAddExpenseModalUsuarios.nativeElement.click();
  }


  filtrosUsuarios(){
    var filtro = {
      "id":this.formularioUsuario.get("idUsuario").value,
      "nombre":this.formularioUsuario.get("nombreUsuario").value,
      "fechainicio":this.formularioUsuario.get("fechainicio").value,
      "fechafin":this.formularioUsuario.get("fechafin").value
    }
    this.filtro=filtro;

    if (filtro.fechafin==="" &&
    filtro.fechainicio==="" &&
      filtro.id==="" && 
        filtro.nombre==="" ) 
    {
    this.usuarioFiltrado.emit(this.usuarios);
    console.log("sin filtro");
    }

    return console.log(this.filtro);
  }

  regresar() {
    this._location.back();
  }
}
