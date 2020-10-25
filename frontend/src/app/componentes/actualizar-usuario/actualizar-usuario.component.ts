import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  @Input() nombre = '';
  @Input() correo = '';
  @Input() numTel = '';
  @Input() dir = '';
  campo = '';
  tituloModal = '';
  iconoModal = '';

  formModNombre: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(null, Validators.required)
  });

  formModContrasena: FormGroup = new FormGroup({
    contrasena: new FormControl(null, Validators.required),
    nuevaContrasena: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&].{8,20}')]),
    confirmContrasena: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&].{8,20}')])
  });

  formModTel: FormGroup = new FormGroup({
    telefono: new FormControl(null, Validators.required)
  });

  formModDireccion: FormGroup = new FormGroup({
    direccion: new FormControl(null, Validators.required)
  });

  get nomUsuario(): AbstractControl { return this.formModNombre.get('nombreUsuario'); }
  get contrasena(): AbstractControl { return this.formModContrasena.get('contrasena'); }
  get nuevaContrasena(): AbstractControl { return this.formModContrasena.get('nuevaContrasena'); }
  get confirmContrasena(): AbstractControl { return this.formModContrasena.get('confirmContrasena'); }
  get telefono(): AbstractControl { return this.formModTel.get('telefono'); }
  get direccion(): AbstractControl { return this.formModDireccion.get('direccion'); }

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void {
    console.log(this.formModNombre.value);
  }

  setName( nombreUsuario: string ): void {
    this.formModNombre.patchValue({nombreUsuario});
    this.tituloModal = 'nombre de usuario';
    this.campo = 'nombre';
    this.iconoModal = 'fa-user-edit';
  }

  setPassword(): void{
    this.tituloModal = 'contraseña';
    this.campo = 'contrasena';
    this.iconoModal = 'fa-user-lock';
  }

  setPhone( telefono: string ): void {
    this.formModNombre.patchValue({telefono});
    this.tituloModal = 'teléfono';
    this.campo = 'telefono';
    this.iconoModal = 'fa-phone';
  }

  setAddress( direccion: string ): void {
    this.formModNombre.patchValue({direccion});
    this.tituloModal = 'dirección';
    this.campo = 'direccion';
    this.iconoModal = 'fa-home';
  }

  verifyPassword(): boolean {
    if (this.nuevaContrasena.value === this.confirmContrasena.value) {
      return true;
    }
    else {
      return false;
    }
  }

}
