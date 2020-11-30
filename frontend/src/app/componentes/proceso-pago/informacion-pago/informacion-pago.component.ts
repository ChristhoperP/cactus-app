import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProcesoPagoService } from '../../../servicios/proceso-pago.service';
import { AuthService } from '../../../servicios/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-informacion-pago',
  templateUrl: './informacion-pago.component.html',
  styleUrls: ['./informacion-pago.component.css']
})
export class InformacionPagoComponent implements OnInit {
  usuario:any='';
  departamentos:any = [];
  municipios:any = [];
  agencias:any = [];

  formularioPago:FormGroup = new FormGroup({
    nombre: new FormControl({value: this.usuario.nombre, disabled: true}),
    direccion: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    agencia: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required])
  });  

  constructor(private _pagoService: ProcesoPagoService, private _usuarioService: AuthService) {
   }

  ngOnInit(): void {
    this._usuarioService.getInfoUsuario()
      .subscribe(res => {
        this.usuario = res;
      });

    this._pagoService.obtenerDepartamentos()
      .subscribe(res => {
        this.departamentos = res;
      });

    this._pagoService.obtenerAgenciasEnvio()
    .subscribe(res => {
      this.agencias = res;
    });
  }

  obtenerMunicipiosDepartamento(id:any):void{
    this._pagoService.obtenerMunicipios()
    .subscribe(res => {
       var municipiosDepa:any = [];  
       municipiosDepa = res;    

        this.municipios=municipiosDepa.filter(municipio => municipio.iddepartamento === parseInt(id));
        console.log(this.municipios);      
        });
  }

  registrarInformacion(){
    Swal.fire({
      title: '¿Está seguro que desea continuar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Continuar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.formularioPago.get("direccion").valid &&
          this.formularioPago.get("domicilio").valid &&
          this.formularioPago.get("agencia").valid &&
          this.formularioPago.get("departamento").valid &&
          this.formularioPago.get("municipio").valid
      ) {
        var informacion = {
          "nombrecompleto": this.usuario.nombre, 
          "direccioncompleta": this.formularioPago.get("direccion").value,
          "domicilio": this.formularioPago.get("domicilio").value,
          "idagenciaenvio": this.formularioPago.get("agencia").value,
          "idmunicipio": this.formularioPago.get("municipio").value
        }
        console.log(informacion);
        
          this._pagoService.registrarInformacionEnvio(informacion)
          .subscribe(res => {
            console.log("se registró la información", res);
          },
          err => {
            console.log(err);
          });
        }
      }
    });
  }

  validation(campo){
    return this.formularioPago.get(campo).invalid && this.formularioPago.get(campo).touched;
  }

}


// INSERT INTO public.agenciaenvio(
// 	idagenciaenvio, nombre, precio, urlperfil)
// 	VALUES (1, 'Cargo Expreso', 115, '');
