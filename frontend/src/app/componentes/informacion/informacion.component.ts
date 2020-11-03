import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  latitud = 14.0695869;
  longitud = -87.1680466;
  zoom = 10;

  constructor() { }

  ngOnInit(): void {
  }

  ubicacionSeleccionada(ubicacion){
    // this.latitud = ubicacion.coord.lat;
    // this.longitud = ubicacion.coord.lng;
    console.log(ubicacion);
    
  }
}
