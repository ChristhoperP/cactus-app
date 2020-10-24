import { Component, OnInit, HostListener } from '@angular/core';
import { PeticionesService } from "./servicios/peticiones.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cactus';

  constructor(
    private _PeticionesService: PeticionesService
  ) { }

  ngOnInit(): void {
    console.log("he iniciado");
    this._PeticionesService.registraVisitaInicio()
      .subscribe(res => {
        this._PeticionesService.setIdVisita(res.idvisita);
        console.log("he iniciado");
      },
        err => {
          console.log(err);
        });

  }

  @HostListener('window: beforeunload', ['$event'])
  beforeunloadHandler(event) {
    var idVisita = this._PeticionesService.getIdVisita();
    if (idVisita) {
      this._PeticionesService.registraFinVisita(idVisita)
        .subscribe(res => {
          this._PeticionesService.removeIdVisita();
          console.log("he finalizado");
        },
          err => {
            console.log(err);
          });
    }
  }

}
