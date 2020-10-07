import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioRegistro:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]),
    contrasena: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
    verificarContrasena: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)])
  });
  constructor() { }

  ngOnInit(): void {
  }
  validation(campo){
    return this.formularioRegistro.get(campo).invalid && this.formularioRegistro.get(campo).touched;
  }
}
