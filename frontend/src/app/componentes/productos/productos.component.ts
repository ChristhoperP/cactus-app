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
  filtro: string;
  sinCoincidencias = false;

  constructor(
    private _cargar: ServAdminService, 
    private servicioProducto: ProductosFrontService,
    private _busquedaService: BusquedaProductosService,
    private router: Router) {
      this.url = Global.url;
      _cargar.Carga(["app"]);

      this.router.events.subscribe( evt => {
        if (evt instanceof NavigationEnd) {
          this._busquedaService.toggleSearchState( false );
          this.filtrados = new Array<any>();
        }
      });
  }




  ngOnInit(): void {
    this.servicioProducto.getProducto()
      .subscribe( res => {
        this.productos = res;
        console.log("Mostrar Promociones");
      }, err => {
        console.log(err);
      });

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

}
