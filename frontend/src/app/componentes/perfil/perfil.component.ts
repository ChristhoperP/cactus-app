import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UploadService } from "../../servicios/upload.service";
import { PeticionesService } from "../../servicios/peticiones.service";
import { Global } from "../../servicios/global";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  correo: any;
  direccion: any;
  imagen: any;
  nombreUsuario: any;
  telefono: any;
  public estado: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private authService: AuthService,
    private _uploadService: UploadService,
    private _peticionesService: PeticionesService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.authService.getInfoUsuario().subscribe((data: any) => {
      this.correo = data.correo;
      this.direccion = data.direccion;
      this.imagen = data.imagenperfil;
      this.nombreUsuario = data.nombre;
      this.telefono = data.telefono;
      //console.log(data);
    });
  }

  fileChangeEvent(fileImput: any) {
    this.filesToUpload = <Array<File>>fileImput.target.files;

    if (this.filesToUpload) {
      this._uploadService.makeFileRequest(Global.url + "upload-image/", [], this.filesToUpload, "image")
        .then((result: any) => {
          this.estado = "Exitoso";
          alert("Imagen subida con éxito.");
          if (this.imagen) {
            this._peticionesService.eliminarImagenPerfil(this.imagen)
            .subscribe(res => {
              this.imagen = result;
            },
              err => {
                console.log(err);
              });
          }else{
            this.imagen = result;
          }
          //form.reset();
        });
    }

  }

  datoActualizado( evt: any): void {
      switch ( evt.campo) {
        case 'nombre':
          this.nombreUsuario = evt.nuevoValor;
          break;
        case 'telefono':
          this.telefono = evt.nuevoValor;
          break;
        case 'direccion':
          this.direccion = evt.nuevoValor;
          break;
        default:
          break;
      }
  }

}
