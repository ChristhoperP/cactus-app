import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ServAdminService} from "../../servicios/administrador/serv-admin.service";
import {ProductosFrontService} from "src/app/servicios/productos-front.service";
import {Global} from '../../servicios/global';
import { NavigationEnd, Router } from '@angular/router';
import { BusquedaProductosService } from '../../servicios/busqueda-productos.service';
import { PromocionesFrontService } from '../../servicios/promociones-front.service';
import { EventosService } from '../../servicios/eventos.service';
import { AuthService } from 'src/app/servicios/auth.service';


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
  generosFiltrado:any = [];
  especiesFiltrado:any = [];

  public url: string;
  filtro_Especie='';
  filtro_Genero='';
  filtro_Familia='';
  filtro_Precio1='';
  filtro_Precio2='';
  filtro_nivel1='';
  filtrados: Array<any>;
  promociones: Array<any>;
  filtro: string;
  sinCoincidencias = false;

  productoAgregado = '';
  @ViewChild('toast') addedToast: ElementRef<HTMLDivElement>;
  @ViewChild('alertToast') alertToast: ElementRef<HTMLDivElement>;

  constructor(
    private _cargar: ServAdminService,
    private servicioProducto: ProductosFrontService,
    private _promocionesService: PromocionesFrontService,
    private _busquedaService: BusquedaProductosService,
    private _authService: AuthService,
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
        this.especiesFiltrado=this.especies
      } );

    this.servicioProducto.getGeneros()
      .subscribe((res:any) => {
        this.generos = res;
        this.generosFiltrado=this.generos;
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

   restaurar():void{
    this.filtro_Especie='';
    this.filtro_Genero='';
    this.filtro_Familia='';
    this.filtro_Precio1='';
    this.filtro_Precio2='';
    this.generosFiltrado=this.generos;
    this.especiesFiltrado=this.especies;
  }

  filtrarGenero():void{
    this.generosFiltrado=this.generos.filter(gen => gen.descripcion_familia === this.filtro_Familia);
    console.log(this.filtro_Familia);
  }

  filtrarEspecie():void{
    this.especiesFiltrado=this.especies.filter(esp => esp.descripcion_genero === this.filtro_Genero);
    console.log(this.filtro_Genero);
  }

  agregarCarrito( idproducto, nombre, cantidad ): void {

    this.productoAgregado = nombre;

    if (this._authService.loggedIn()){
      this.servicioProducto.addToCartLogged(idproducto, cantidad)
        .subscribe( res => {
          console.log(res);
          this.mostrarAddedToast();
        }, err => { console.log(err); });
    } else {
        const res = this.servicioProducto.addToCartNoLogged(idproducto, cantidad);

        if (res) {
          this.mostrarAddedToast();
        } else {
          this.mostrarAlertToast();
          console.log('Ocurrió un error');
        }
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
