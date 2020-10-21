import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()){
      if (this.authService.getUserRole() === 'admin'){
        this.router.navigate(['controlador-admin']);
      }
    }
  }

}
