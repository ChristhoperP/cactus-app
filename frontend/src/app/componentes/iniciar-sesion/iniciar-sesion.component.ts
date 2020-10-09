import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  formularioInicioSesion: FormGroup = new FormGroup({
    correo: new FormControl(null, [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]),
    contrasena: new FormControl(null, Validators.required)
  });

  errorCredenciales: Boolean = false;

  constructor(
    private servicioAuth: AuthService,
    private router: Router  
  ) { }

  ngOnInit(): void {
  }

  get correo(){ return this.formularioInicioSesion.get('correo')};
  get contrasena(){ return this.formularioInicioSesion.get('contrasena')};

  validarCampo(campo: string){
    return this.formularioInicioSesion.get(campo).invalid && this.formularioInicioSesion.get(campo).touched;
  }

  iniciarSesion(){
    this.errorCredenciales = false;

    if(this.formularioInicioSesion.invalid){
      alert('Debe llenar todos los campos');
      
      return;
    }

    console.log(this.formularioInicioSesion.value);
    this.servicioAuth.iniciarSesion(this.formularioInicioSesion.value)
        .subscribe(res => {          
          localStorage.setItem('token', res.token);
          this.router.navigate(['../inicio']);
        },
        err => {
          console.log(err);
          this.errorCredenciales = true;
        });
  }

}
