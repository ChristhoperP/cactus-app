import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

//comparar contraseñas
contrasenaVerificada:boolean=false;
habilitarBoton:boolean=false;

  formularioRegistro:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [
                                  Validators.required, 
                                  Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)
                                ]),
    contrasena: new FormControl('',[
                                  Validators.required,
                                  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&].{8,20}')
                                ]),
    verificarContrasena: new FormControl('', [
                                  Validators.required,
                                  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&].{8,20}')
                                ])
  });
  constructor() { }

  ngOnInit(): void {
  }
  validation(campo){
    return this.formularioRegistro.get(campo).invalid && this.formularioRegistro.get(campo).touched;
  }

  compararContrasena(){
      if (this.formularioRegistro.get('verificarContrasena').value === this.formularioRegistro.get('contrasena').value) {
        console.log("contraseña verificada");
        this.contrasenaVerificada = true;
      } else{
        this.contrasenaVerificada = false;
        console.log("las contraseñas no coindicen");
      }
  }

  registrarse(){
    if (this.formularioRegistro.get('nombre').valid &&
        this.formularioRegistro.get('nombre').valid &&
        this.formularioRegistro.get('nombre').valid &&
        this.contrasenaVerificada
    ) {
      console.log("cuenta nueva");
      
    } 
    else {
    }
  }

}
