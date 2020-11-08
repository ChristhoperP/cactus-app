import { Component, OnInit } from '@angular/core';
import {PromocionesFrontService} from 'src/app/servicios/promociones-front.service';
import {Global} from '../../servicios/global';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {
  promociones: any = [];
  filtroPromo = '';
  public url: string;
  constructor(
    private servicioPromocion: PromocionesFrontService,
    private eventService: EventosService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.servicioPromocion.getPromocion()
      .subscribe( res => {
        this.promociones = res;
        console.log('Mostrar Promociones');
      }, err => {
        console.log(err);
      });

    this.eventService
      .getServerSentEvent(Global.eventsUrl)
      .subscribe( res => {
        console.log('Recibido por events: ', res);

        const data = JSON.parse(res.data);

        if (data.idpromocion) {
          this.promociones = this.promociones.filter( (promo: any) => promo.promocion_idpromocion !== data.idpromocion);
        }

      }, err => { console.log(err); });
  }

}
