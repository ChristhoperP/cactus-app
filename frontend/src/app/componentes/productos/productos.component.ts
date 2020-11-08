import { Component, OnInit } from '@angular/core';
import {ServAdminService} from "../../servicios/administrador/serv-admin.service";
import {ProductosFrontService} from "src/app/servicios/productos-front.service";
import {Global} from '../../servicios/global';
import { NavigationEnd, Router } from '@angular/router';
import { BusquedaProductosService } from '../../servicios/busqueda-productos.service';
import { PromocionesFrontService } from '../../servicios/promociones-front.service';
import { EventosService } from '../../servicios/eventos.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:any = [];
  especies:any = [];
  generos:any = [];
  familias:any = [];
  public url: string;
  filtro_Especie='';
  filtro_Genero='';
  filtro_Familia='';
  filtro_Precio1='';
  filtro_Precio2='';
  filtrados: Array<any>;
  promociones: Array<any>;
  filtro: string;
  sinCoincidencias = false;

  constructor(
    private _cargar: ServAdminService,
    private servicioProducto: ProductosFrontService,
    private _promocionesService: PromocionesFrontService,
    private _busquedaService: BusquedaProductosService,
    private eventService: EventosService,
    private router: Router) {
      this.url = Global.url;
      _cargar.Carga(["app"]);

      this.router.events.subscribe( evt => {
        if (evt instanceof NavigationEnd) {
          this._busquedaService.toggleSearchState( false );
          this.filtrados = new Array<any>();
        }
      });

      this._busquedaService.search.subscribe( (term: string) => {
        this.filtrados = this.productos.filter( (product: any) => product.nombre.toLowerCase().includes(term.toLowerCase())
            || product.categoria.toLowerCase().includes(term.toLowerCase()));

        if (this.filtrados.length === 0) {
          this.sinCoincidencias = true;
        } else {
          this.sinCoincidencias = false;
        }
      });
  }




  ngOnInit(): void {
    this.servicioProducto.getProducto()
      .subscribe( res => {
        this.productos = res;
        console.log("Mostrar Promociones");

        this._promocionesService.getPromocion()
          .subscribe( (resp: any) => {


            this.promociones = resp;
            console.log('Promociones: ', resp);

            for (const promo of this.promociones) {

              const fechafin = new Date(promo.fechafin);
              const fechaActual = new Date();

              if (fechaActual < fechafin) {
                this.productos[ this.productos.findIndex( prod => prod.idproducto === promo.idproducto) ].idpromocion = promo.promocion_idpromocion;
                this.productos[ this.productos.findIndex( prod => prod.idproducto === promo.idproducto) ].porcentajedescuento = promo.porcentajedescuento;
                this.productos[ this.productos.findIndex( prod => prod.idproducto === promo.idproducto) ].preciocondescuento = promo.preciocondescuento;
              }
            }

          }, errr => {
            console.log(errr);
          });

      }, err => {
        console.log(err);
      });

    this.eventService
      .getServerSentEvent(Global.eventsUrl)
      .subscribe( res => {
        const data = JSON.parse(res.data);

        if (data.idpromocion) {
          const nPromos = this.promociones.filter((promo: any) => promo.promocion_idpromocion !== data.idpromocion );
          this.updatePromosInfo(data.idpromocion);
          this.promociones = nPromos;
        }
      }, err => { console.log(err); });

    this.servicioProducto.getEspecies()
      .subscribe((res:any) => {
        this.especies = res;
      } );

    this.servicioProducto.getGeneros()
      .subscribe((res:any) => {
        this.generos = res;
      } );

    this.servicioProducto.getFamilia()
      .subscribe((res:any) => {
        this.familias = res;
      } );

  }

  updatePromosInfo( deletedPromoId: number): void {

    for (const product of this.productos) {
      if (product.idpromocion && product.idpromocion === deletedPromoId){
        product.porcentajedescuento = null;
        product.preciocondescuento = null;
      }
    }
  }

}
