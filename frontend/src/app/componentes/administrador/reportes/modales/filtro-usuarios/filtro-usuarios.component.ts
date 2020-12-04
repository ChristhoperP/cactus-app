import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { Router } from '@angular/router';
import {ReporteUsuarioService} from 'src/app/servicios/administrador/reporte-usuario.service';

@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.component.html',
  styleUrls: ['./filtro-usuarios.component.css']
})
export class FiltroUsuariosComponent implements OnInit {
  @ViewChild('closeAddExpenseModalUsuarios') closeAddExpenseModalVentas: ElementRef;
  showModalVentas: boolean = true;
  usuarios: any = [];
  formularioVentas:FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    idUsuario: new FormControl(''),
    nombreUsuario: new FormControl(''),
  
  });
  constructor(private servicioUsuariosReportes: ReporteUsuarioService, router: Router) { }

  ngOnInit(): void {
    this.servicioUsuariosReportes.getUsuariosReporte()
      .subscribe( res => {
        this.usuarios = res;
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

}
