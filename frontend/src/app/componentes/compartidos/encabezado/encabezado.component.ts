import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  nombreUsuario: any;
  
  constructor(
    public authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {

if (this.authService.loggedIn()==true){
  this.authService.getInfoUsuario().subscribe((data: any) => {
    this.nombreUsuario = data.nombre;
     console.log(data)
  });
}

    
  }

}
