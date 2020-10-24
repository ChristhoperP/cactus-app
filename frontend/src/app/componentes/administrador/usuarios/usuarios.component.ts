import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/administrador/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  filtroNombre = '';
  usuarios: any = [];

  constructor(
    private servicioUsuarios: UsuariosService
  ) { }

  ngOnInit(): void {
    this.servicioUsuarios.getUsuariosRegistrados()
      .subscribe( res => {
        this.usuarios = res;
      }, err => {
        console.log(err);
      });
  }

}
