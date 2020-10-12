import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';



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

  constructor( private servicioAuth: AuthService, private router: Router  ) { 

  }

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
        this.formularioRegistro.get('correo').valid &&
        this.formularioRegistro.get('contrasena').valid &&
        this.contrasenaVerificada
    ) {
      const cuenta = {
        "nombre": this.formularioRegistro.get('nombre').value,
        "correo": this.formularioRegistro.get('correo').value,
        "contrasenia":this.formularioRegistro.get('contrasena').value
      }
      console.log(cuenta);
      
      this.servicioAuth.signUp(cuenta)
        .subscribe(res => {
          console.log("se registró una nueva cuenta");
          
          this.servicioAuth.setToken(res.token);          
          this.router.navigate(['/inicio']);          
        },
        err => {
          console.log(err);
        });  
    } 
    else {
      alert("Ocurrió un problema, no se ha podido registrar");
    }
  }

}
