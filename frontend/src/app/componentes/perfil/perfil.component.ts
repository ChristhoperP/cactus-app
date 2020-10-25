import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getInfoUsuario().subscribe((data: any) => {
      this.correo = data.correo;
      this.direccion = data.direccion;
      this.imagen = data.imagenperfil;
      this.nombreUsuario = data.nombre;
      this.telefono = data.telefono;
      console.log(data);
    });

  }

}
