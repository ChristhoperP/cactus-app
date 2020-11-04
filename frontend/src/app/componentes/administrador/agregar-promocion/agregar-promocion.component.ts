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
  showModalAgregarPromocion: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
