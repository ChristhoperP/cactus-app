import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-encabezado-admin',
  templateUrl: './encabezado-admin.component.html',
  styleUrls: ['./encabezado-admin.component.css']
})
export class EncabezadoAdminComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
