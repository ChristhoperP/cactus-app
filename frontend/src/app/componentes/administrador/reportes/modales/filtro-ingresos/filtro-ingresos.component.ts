import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import {ReporteUsuarioService} from 'src/app/servicios/administrador/reporte-usuario.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-filtro-ingresos',
  templateUrl: './filtro-ingresos.component.html',
  styleUrls: ['./filtro-ingresos.component.css']
})
export class FiltroIngresosComponent implements OnInit {
  @ViewChild('closeAddExpenseModalUsuarios') closeAddExpenseModalVentas: ElementRef;
  showModalVentas: boolean = true;
  usuarios: any = [];
  formularioVentas:FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    idUsuario: new FormControl(''),
    nombreUsuario: new FormControl(''),
  
  });
  constructor(private servicioUsuariosReportes: ReporteUsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.servicioUsuariosReportes.getUsuariosReporte()
    .subscribe( res => {
      this.usuarios = res;
      console.log(res);
    }, err => {
      console.log(err);
    });

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
       
      }
   })
  }

  cerrarModal(){
    this.showModalVentas=false;
    this.closeAddExpenseModalVentas.nativeElement.click();

  }
}
