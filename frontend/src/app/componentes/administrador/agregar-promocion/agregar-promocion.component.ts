import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-agregar-promocion',
  templateUrl: './agregar-promocion.component.html',
  styleUrls: ['./agregar-promocion.component.css']
})
export class AgregarPromocionComponent implements OnInit {
  modalPromocion;
  showModalAgregarPromocion: boolean = false;

  idProducto:any;
  descripcion:any;
  
  formularioPromocion:FormGroup = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('',[Validators.required]),
    porcentajedescuento: new FormControl('', [Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
  }

  getProductInfo( productId: string, nombre: string ): void {
    this.idProducto = productId;
    this.descripcion = nombre;
    console.log(productId, nombre );
  }


  validation(campo){
    return this.formularioPromocion.get(campo).invalid && this.formularioPromocion.get(campo).touched ;
  }
}
