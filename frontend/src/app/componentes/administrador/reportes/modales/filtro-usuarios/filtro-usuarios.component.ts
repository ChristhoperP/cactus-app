import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';
import {Location, DatePipe } from '@angular/common';
import { bindNodeCallback } from 'rxjs';
import { stringify } from 'querystring';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.component.html',
  styleUrls: ['./filtro-usuarios.component.css'],
  providers: [DatePipe]
})
export class FiltroUsuariosComponent implements OnInit {
  @ViewChild('closeAddExpenseModalUsuarios') closeAddExpenseModalUsuarios: ElementRef;
  showModalUsuarios: boolean = true;
  
  @Output() 
  usuarioFiltrado = new EventEmitter<Object>();

  @Output() 
  nombreUsuario = new EventEmitter<String>();

  fechaActual:any = new Date();
  usuarios:any = [];
  
  filtro;

  formularioUsuario:FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    idUsuario: new FormControl(''),
    nombreUsuario: new FormControl(''),
  
  });
  constructor( private datePipe: DatePipe,
     private _location: Location,
    private _reporteService: ReportesService,
     private router: Router) {
       
      this.fechaActual = this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd');
      console.log(this.fechaActual);
     }

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
    this.formularioUsuario.reset();
  }


  filtrosUsuarios(){
    var filtro = {
      "id":this.formularioUsuario.get("idUsuario").value,
      "nombre":this.formularioUsuario.get("nombreUsuario").value,
      "fechainicio":this.formularioUsuario.get("fechainicio").value,
      "fechafin":this.formularioUsuario.get("fechafin").value
    }
    this.filtro=filtro;

    if ((filtro.fechafin===""  || filtro.fechafin===null)  && 
    (filtro.fechainicio===""  || filtro.fechainicio===null) && 
    (filtro.id===""  || filtro.id===null) && 
    (filtro.nombre===""  || filtro.nombre===null) )
    {
    this.usuarioFiltrado.emit(this.usuarios);
    // this.nombreUsuario.emit('');
    console.log(this.usuarios);
    console.log("sin filtro");
    } else {
      // filtro por ID de usuario
       if ((filtro.fechainicio==="" || filtro.fechainicio===null) && 
           (filtro.fechafin==="" || filtro.fechafin===null) && 
           (filtro.id!="" || filtro.id!=null) && 
           (filtro.nombre==="" || filtro.nombre===null) ) {
         var filtroUsuarioID:any = [];

         filtroUsuarioID=this.usuarios.filter(usuario => usuario.idusuario === parseInt(filtro.id) );
         console.log(filtroUsuarioID);
         
         this.usuarioFiltrado.emit(filtroUsuarioID);
       }
       else {
             //filtro por nombre del usuario
               if ((filtro.fechainicio==="" || filtro.fechainicio===null) && 
                   (filtro.fechafin==="" || filtro.fechafin===null) && 
                   (filtro.id==="" ||filtro.id===null)  && 
                   (filtro.nombre!="" || filtro.nombre!=null))
                    {
                    var filtroUsuarioNombre:any = [];
                    filtroUsuarioNombre = this.usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()));
                    
                    console.log(filtroUsuarioNombre);
                    this.usuarioFiltrado.emit(filtroUsuarioNombre);
                 // this.nombreUsuario.emit(filtro.nombre);
               }
   
                                   else {
                                     //filtro por fecha de venta del producto
                                         if ((filtro.fechainicio!="" || filtro.fechainicio!=null)  && 
                                             (filtro.fechafin!="" || filtro.fechafin!=null) && 
                                             (filtro.id==="" || filtro.id===null) && 
                                             (filtro.nombre==="" || filtro.nombre===null) 
                                              ) {
                                             var filtroFecha:any = [];
                                               
                                             if (filtro.fechafin<=this.fechaActual) {
                                               if (filtro.fechafin>filtro.fechainicio) {
                                                filtroFecha=this.usuarios.filter(usuario => (usuario.fecharegistro>=filtro.fechainicio && usuario.fecharegistro<=filtro.fechafin));
                                                 console.log(filtroFecha);
                                                 this.usuarioFiltrado.emit(filtroFecha);
                                               }else {
                                                 Swal.fire({
                                                   icon: 'error',
                                                   title: 'Error',
                                                   text: 'La fecha final debe ser mayor a la fecha inicial'
                                                 });
                                               }
                                             }else {
                                               Swal.fire({
                                                 icon: 'error',
                                                 title: 'Error',
                                                 text: 'Le fecha final no debe exceder la fecha actual'
                                               });
                                             }
                                         }
                                   }

       }
}
return console.log(this.filtro);

  }

  regresar() {
    this._location.back();
  }
}
