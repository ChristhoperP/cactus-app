import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {PromocionesFrontService} from 'src/app/servicios/promociones-front.service';
import {Global} from '../../servicios/global';
import { EventosService } from '../../servicios/eventos.service';
import { DetalleProductoService } from 'src/app/servicios/detalle-producto.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {
  promociones: any = [];
  filtroPromo = '';
  public url: string;

  productoAgregado: any = {};
  @ViewChild('toast') addedToast: ElementRef<HTMLDivElement>;
  @ViewChild('alertToast') alertToast: ElementRef<HTMLDivElement>;

  constructor(
    private servicioPromocion: PromocionesFrontService,
    private servicioDetalle: DetalleProductoService,
    private servicioAuth: AuthService,
    private servicioCarrito: CarritoService,
    private eventService: EventosService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.servicioPromocion.getPromocion()
      .subscribe( res => {
        this.promociones = res;
        console.log('Mostrar Promociones', res);
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

  agregarCarrito( idproducto, cantidad ): void {

    if (this.servicioAuth.loggedIn()){
      this.servicioCarrito.agregarCarritoLogged(idproducto, cantidad)
        .subscribe( res => {
          console.log(res);
          this.productoAgregado.nombre = this.promociones[ this.promociones.findIndex( promo => promo.idproducto === idproducto) ].nombre;
          this.mostrarAddedToast();
        }, err => {
          console.log(err);
          this.mostrarAlertToast();
        });
    } else {

      this.servicioDetalle.getDetalle_Producto(idproducto)
        .subscribe( (resp: any) => {
          console.log(resp);

          this.productoAgregado = resp[0];
          this.productoAgregado.cantidadencarrito = cantidad;
          this.productoAgregado.cantidadinventario = resp[0].cantidad;

          this.productoAgregado.porcentajedescuento = this.promociones[ this.promociones.findIndex( promo => promo.idproducto === idproducto) ].porcentajedescuento;
          this.productoAgregado.preciocondescuento = this.promociones[ this.promociones.findIndex( promo => promo.idproducto === idproducto) ].preciocondescuento;

          /* if (!resp[0].porcentajedescuento) {
            this.productoAgregado.porcentajedescuento = '';
            this.productoAgregado.preciocondescuento = resp[0].precio;
          } */

          const addProd: object = {
            idproducto: this.productoAgregado.idproducto,
            nombre: this.productoAgregado.nombre,
            precio: this.productoAgregado.precio,
            urlportada: this.productoAgregado.urlportada,
            cantidadencarrito: this.productoAgregado.cantidadencarrito,
            cantidadinventario: this.productoAgregado.cantidadinventario,
            porcentajedescuento: this.productoAgregado.porcentajedescuento,
            preciocondescuento: this.productoAgregado.preciocondescuento
          };

          const res = this.servicioCarrito.agregarCarritoNoLogged(addProd);

          if (res) {
            this.mostrarAddedToast();
          } else {
            this.mostrarAlertToast();
            console.log('Ocurrió un error');
          }
        }, err => {
          console.log(err);
          this.mostrarAlertToast();
        });
    }

  }

  mostrarAddedToast(): void {
    this.addedToast.nativeElement.style.opacity = '1';
    setTimeout(() => { this.addedToast.nativeElement.style.opacity = '0'; }, 3000);
  }

  mostrarAlertToast(): void {
    this.alertToast.nativeElement.style.opacity = '1';
    setTimeout(() => { this.alertToast.nativeElement.style.opacity = '0'; }, 3000);
  }

}
