import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../../servicios/administrador/promociones.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Global } from "../../../servicios/global";
import { Router } from '@angular/router';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
promociones: any = [];
promocionesFilterByName: any = { nombre: '' };

  constructor(
              private _promocionService: PromocionesService, 
              private router: Router,   
              private filter: FilterPipe) { }

  ngOnInit(): void {
    this._promocionService.getPromociones()
    .subscribe( (res: any) => {
        this.promociones = res;
        console.log(res);
      } );
  }

}
