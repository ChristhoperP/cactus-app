import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  isCustomer: Boolean;

  constructor(
    public authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (this.router.url != '/controlador-admin'){
      this.isCustomer = true;
    } else {
      this.isCustomer = false;
    }
  }

}
