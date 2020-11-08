import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/administrador/usuarios.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;

  @Input() nombre = '';
  @Input() correo = '';
  @Input() numTel = '';
  @Input() dir = '';
  @Input() idUsuario = '';
  @Input() perfil: Array<File>;

  @Output() datoActualizado = new EventEmitter<object>();

  opcion = 0;

  campo = '';
  tituloModal = '';
  iconoModal = '';
  invalidPassword = false;

  formModNombre: FormGroup = new FormGroup({
    nombre: new FormControl(null, Validators.required)
  });

  formModContrasena: FormGroup = new FormGroup({
    contraseniaAnterior: new FormControl(null, Validators.required),
    contraseniaNueva: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&].{8,20}')]),
    confirmContrasena: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&].{8,20}')])
  });

  formModTel: FormGroup = new FormGroup({
    telefono: new FormControl(null, Validators.required)
  });

  formModDireccion: FormGroup = new FormGroup({
    direccion: new FormControl(null, Validators.required)
  });

  constructor(
    private authService: AuthService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
  }

  get nomUsuario(): AbstractControl { return this.formModNombre.get('nombre'); }
  get contrasena(): AbstractControl { return this.formModContrasena.get('contraseniaAnterior'); }
  get nuevaContrasena(): AbstractControl { return this.formModContrasena.get('contraseniaNueva'); }
  get confirmContrasena(): AbstractControl { return this.formModContrasena.get('confirmContrasena'); }
  get telefono(): AbstractControl { return this.formModTel.get('telefono'); }
  get direccion(): AbstractControl { return this.formModDireccion.get('direccion'); }

  submitForm( usuario ): void {
    this.usuarioService.updateUser( usuario )
      .subscribe( res => {
        console.log(res);

        if (res.nombre){
          this.datoActualizado.emit({ campo: 'nombre', nuevoValor: res.nombre});
          this.authService.setUpdatedName(res.nombre);
        } else if (res.telefono){
          this.datoActualizado.emit({ campo: 'telefono', nuevoValor: res.telefono});
        } else if (res.direccion){
          this.datoActualizado.emit({ campo: 'direccion', nuevoValor: res.direccion});
        }

        Swal.fire({
          icon: 'success',
          title: `${(res.message) ? res.message : 'Datos actualizados exitosamente'}`
        });

        this.closeModal.nativeElement.click();
      }, err => {
        console.log(err);
        if (err.error.message === 'No coinciden.') {
          this.invalidPassword = true;
          this.errAlert('La contraseña actual no coincide');
        } else {
          this.errAlert(err.error.message);
        }
      });
  }

  setName( nombreUsuario: string ): void {
    this.formModNombre.patchValue({nombre: nombreUsuario});
    this.tituloModal = 'nombre de usuario';
    this.campo = 'nombre';
    this.opcion = 1;
    this.iconoModal = 'fa-user-edit';
  }

  setPassword(): void{
    this.tituloModal = 'contraseña';
    this.campo = 'contrasena';
    this.opcion = 2;
    this.iconoModal = 'fa-user-lock';
  }

  setPhone( telefono: string ): void {
    this.formModTel.patchValue({telefono});
    this.tituloModal = 'teléfono';
    this.campo = 'telefono';
    this.opcion = 3;
    this.iconoModal = 'fa-phone';
  }

  setAddress( direccion: string ): void {
    this.formModDireccion.patchValue({direccion});
    this.tituloModal = 'dirección';
    this.campo = 'direccion';
    this.opcion = 4;
    this.iconoModal = 'fa-home';
  }

  resetForm(): void {
    this.formModNombre.reset();
    this.formModContrasena.reset();
    this.formModTel.reset();
    this.formModDireccion.reset();
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

    this.invalidPassword = false;

    if (this.opcion > 0){
      switch (this.opcion) {
        case 1:
          if (this.formModNombre.valid){
            this.updateUsername();
          } else {
            this.formInvalidAlert();
          }
          break;
        case 2:
          if (this.formModContrasena.valid){
            this.updatePassword();
          } else {
            this.formInvalidAlert();
          }
          break;
        case 3:
          if (this.formModTel.valid){
            this.updatePhone();
          } else {
            this.formInvalidAlert();
          }
          break;
        case 4:
          if (this.formModDireccion.valid){
            this.updateAddress();
          } else {
            this.formInvalidAlert();
          }
          break;
        default:
          this.errAlert('Debe especificar el campo a editar');
          break;
      }
    }
  }

  updateUsername(): void {
    const usuario = this.getUpdateUser();

    this.submitForm(usuario);
    console.log(this.formModNombre.value);
  }

  updatePassword(): void {
    const usuario = this.getUpdateUser();

    this.submitForm(usuario);
  }

  updatePhone(): void {
    const usuario = this.getUpdateUser();
    this.submitForm(usuario);
  }

  updateAddress(): void {
    const usuario = this.getUpdateUser();
    this.submitForm(usuario);
  }

  getUpdateUser(): object {
    const user = {
      user: {
        id: this.idUsuario
      },
      nombre: this.nomUsuario.value,
      contraseniaAnterior: this.contrasena.value,
      contraseniaNueva: this.nuevaContrasena.value,
      telefono: this.telefono.value,
      direccion: this.direccion.value,
      opcion: this.opcion
    };

    return user;
  }

  errAlert( msg: string ): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${msg}`
    });
  }

  formInvalidAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Debe llenar todos los campos`
    });
  }

}
