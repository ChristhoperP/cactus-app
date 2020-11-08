import { Component, OnInit } from '@angular/core';
import {PromocionesFrontService} from 'src/app/servicios/promociones-front.service';
import {Global} from '../../servicios/global';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {
  promociones: any = [];
  filtroPromo = '';
  public url: string;
  constructor(private servicioPromocion: PromocionesFrontService) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.servicioPromocion.getPromocion()
      .subscribe( res => {
        this.promociones = res;
        console.log("Mostrar Promociones")
      }, err => {
        console.log(err);
      });
  }

}
