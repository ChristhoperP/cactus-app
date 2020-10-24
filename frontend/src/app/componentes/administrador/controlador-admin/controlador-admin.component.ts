import { Component, OnInit } from '@angular/core';
import {ServAdminService} from "../../../servicios/administrador/serv-admin.service";
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-controlador-admin',
  templateUrl: './controlador-admin.component.html',
  styleUrls: ['./controlador-admin.component.css']
})
export class ControladorAdminComponent implements OnInit {

  constructor( private _cargar: ServAdminService,
    public authService: AuthService) { 
    _cargar.Carga(["app"]);
  }

  ngOnInit(): void {
  }

}
