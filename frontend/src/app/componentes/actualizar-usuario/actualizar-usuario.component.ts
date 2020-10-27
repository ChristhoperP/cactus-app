import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/administrador/usuarios.service';

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
  @Input() idUsuario = '';
  @Input() perfil: Array<File>;

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

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
  }

  get nomUsuario(): AbstractControl { return this.formModNombre.get('nombreUsuario'); }
  get contrasena(): AbstractControl { return this.formModContrasena.get('contrasena'); }
  get nuevaContrasena(): AbstractControl { return this.formModContrasena.get('nuevaContrasena'); }
  get confirmContrasena(): AbstractControl { return this.formModContrasena.get('confirmContrasena'); }
  get telefono(): AbstractControl { return this.formModTel.get('telefono'); }
  get direccion(): AbstractControl { return this.formModDireccion.get('direccion'); }

  submitForm(): void {
    this.updateUserInfo();
  }

  setName( nombreUsuario: string ): void {
    this.formModNombre.patchValue({nombreUsuario});
    this.tituloModal = 'nombre de usuario';
    this.campo = 'nombre';
    this.iconoModal = 'fa-user-edit';
    console.log(this.idUsuario);
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

  updateUserInfo(): void {
    const usuario = {
      idUsuario: this.idUsuario,
      nombre: this.nomUsuario.value,
      contrasenia: this.nuevaContrasena.value,
      telefono: this.telefono.value,
      direccion: this.direccion.value
    };

    this.usuarioService.updateUser( usuario )
      .subscribe( res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    // console.log(usuario);
  }

}
