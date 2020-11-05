import { Component, OnInit } from '@angular/core';
import {ServAdminService} from "../../servicios/administrador/serv-admin.service";
import {ProductosFrontService} from "src/app/servicios/productos-front.service";
import {Global} from '../../servicios/global';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:any = [];
  especies:any = [];
  generos:any = [];
  public url: string;


  constructor(private _cargar: ServAdminService, 
    private servicioProducto: ProductosFrontService) { 
      this.url = Global.url;
    _cargar.Carga(["app"]);
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

  }

}
