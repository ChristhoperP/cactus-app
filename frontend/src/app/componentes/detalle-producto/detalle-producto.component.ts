import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DetalleProductoService} from 'src/app/servicios/detalle-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Global} from '../../servicios/global';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { PromocionesFrontService } from 'src/app/servicios/promociones-front.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  public url: string;
  producto: any = {};
  id: string;
  cargando: boolean = true;

  @ViewChild('toast') addedToast: ElementRef<HTMLDivElement>;
  @ViewChild('alertToast') alertToast: ElementRef<HTMLDivElement>;

  formularioCaracteristicas: FormGroup = new FormGroup({
    cantidad: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
  });




  constructor(
    private ServicioDetalle: DetalleProductoService,
    private ServicioCarrito: CarritoService,
    private ServicioAuth: AuthService,
    private ServicioPromociones: PromocionesFrontService,
    private _route: ActivatedRoute,
    private _router: Router) { 
      this.url = Global.url;
      this.id = this._route.snapshot.paramMap.get('id');
      this._route.params.subscribe(paramst =>{
        console.log(paramst['id']);
      })
    }

  ngOnInit(): void {


    this.ServicioDetalle.getDetalle_Producto(this.id).subscribe((data: any) => {
      this.producto = data[0];
      this.cargando = false;
      this.cantidad.setValidators([Validators.required, Validators.min(1), Validators.max(this.producto.cantidad)]);
      this.cantidad.updateValueAndValidity();
      console.log(data);

      this.ServicioPromociones.getPromocion()
          .subscribe( (resp: any) => {

            for (const promo of resp) {

              const fechafin = new Date(promo.fechafin);
              const fechaActual = new Date();

              if ((fechaActual < fechafin) && (promo.idproducto === this.producto.idproducto)) {
                this.producto.porcentajedescuento = promo.porcentajedescuento;
                this.producto.preciocondescuento = promo.preciocondescuento;
              }
            }

          }, errr => {
            console.log(errr);
          });
    });

  }

  get cantidad(): AbstractControl { return this.formularioCaracteristicas.get('cantidad'); }

  agregarCarrito(): void {

    if (!this.cantidad.errors?.min && !this.cantidad.errors?.max && !this.cantidad.errors?.required) {

      if (this.ServicioAuth.loggedIn()){
        this.ServicioCarrito.agregarCarritoLogged(this.id, this.cantidad.value)
        .subscribe( res => {
          console.log(res);
          this.mostrarAddedToast();
        }, err => { console.log(err); });
      } else {

        const nProd = this.producto;

        if (!this.producto.porcentajedescuento) {
          nProd.porcentajedescuento = '';
          nProd.preciocondescuento = this.producto.precio;
        }

        const addProd: object = {
          idproducto: nProd.idproducto,
          nombre: nProd.nombre,
          precio: nProd.precio,
          urlportada: nProd.urlportada,
          cantidadencarrito: this.cantidad.value,
          cantidadinventario: nProd.cantidad,
          porcentajedescuento: nProd.porcentajedescuento,
          preciocondescuento: nProd.preciocondescuento
        };

        const res = this.ServicioCarrito.agregarCarritoNoLogged(addProd);

        if (res) {
          this.mostrarAddedToast();
        } else {
          this.mostrarAlertToast();
        }
      }
    } else {
      alert('Ingrese la cantidad');
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
