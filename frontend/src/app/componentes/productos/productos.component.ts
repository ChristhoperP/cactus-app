import { Component, OnInit } from '@angular/core';
import {ServAdminService} from "../../servicios/administrador/serv-admin.service";
import {ProductosFrontService} from "src/app/servicios/productos-front.service";
import {Global} from '../../servicios/global';
import { NavigationEnd, Router } from '@angular/router';
import { BusquedaProductosService } from '../../servicios/busqueda-productos.service';


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

  filtrados: Array<any>;
  filtro: string;

  constructor(
    private _cargar: ServAdminService, 
    private servicioProducto: ProductosFrontService,
    private _busquedaService: BusquedaProductosService,
    private router: Router) {
      this.url = Global.url;
      _cargar.Carga(["app"]);

      this.router.events.subscribe( evt => {
        if (evt instanceof NavigationEnd) {
          console.log('Salió: ', evt);
          this._busquedaService.toggleSearchState( false );
          this.filtrados = new Array<any>();
        }
      });
  }


  ngOnInit(): void {
    this.servicioProducto.getProducto()
      .subscribe( res => {
        this.productos = res;
        console.log("Mostrar Promociones")
      }, err => {
        console.log(err);
      });

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

    this._busquedaService.search.subscribe( (term: string) => {
      this.filtrados = this.productos.filter( (product: any) => product.nombre.toLowerCase().includes(term.toLowerCase())
          || product.categoria.toLowerCase().includes(term.toLowerCase()));
      console.log('Filtrados: ', this.filtrados);
    });

  }

}
