import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProductosService } from '../../../../../servicios/administrador/productos.service';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-filtro-ventas',
  templateUrl: './filtro-ventas.component.html',
  styleUrls: ['./filtro-ventas.component.css']
})
export class FiltroVentasComponent implements OnInit {
  @ViewChild('closeAddExpenseModalVentas') closeAddExpenseModalVentas: ElementRef;
  showModalVentas: boolean = true;

  @Output() 
  ventasFiltrado = new EventEmitter<Object>();
  
  categorias:any = [];
  especies:any = [];
  tipoBases:any = [];
  generos:any= [];
  ventas:any=[{
                "idproducto": 1,
                "nombre_producto":"terrario colgante",
                "fechapedido":"2020/03/22",
                "precio_venta": 200,
                "cantidad_vendida": 2,
                "categoria": "terrarios",
                "tipobase": "cajita",
                "especie": ["e.imbricata", "e.neon"],
                "nombre_usuario":"signe"
              }];
  filtro;

  formularioVentas:FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    idProducto: new FormControl(''),
    nombreProducto: new FormControl(''),
    categoria: new FormControl(''),
    especie: new FormControl(''),
    genero: new FormControl(''),
    base: new FormControl('')
  });

  constructor(private _productoService: ProductosService, 
              private _reporteService: ReportesService, 
              private router: Router,
              private _location: Location) { }

  ngOnInit(): void {
    this._productoService.getCategorias()
    .subscribe((res:any)=> {
        this.categorias = res;
      } );

    this._productoService.getEspecies ()
    .subscribe((res:any)=> {
        this.especies = res;
    } );

    this._productoService.getTiposBases ()
    .subscribe((res:any)=> {
        this.tipoBases = res;
    } );

    this._productoService.getGeneros ()
    .subscribe((res:any)=> {
        this.generos = res;
    } );

    // this._reporteService.getVentasReporte()
    // .subscribe((res:any)=> {
    //   this.ventas = res;
    //   console.log(res);
    // });
  }

  filtrar(){
    this.filtroVentas();
    this.showModalVentas=false;
    this.closeAddExpenseModalVentas.nativeElement.click();
  }

  filtroVentas(){
    var filtro = {
      "fechaInicio":this.formularioVentas.get("fechainicio").value,
      "fechaFin":this.formularioVentas.get("fechafin").value,
      "id":this.formularioVentas.get("idProducto").value,
      "nombre":this.formularioVentas.get("nombreProducto").value,
      "categoria":this.formularioVentas.get("categoria").value,
      "especie":this.formularioVentas.get("especie").value,
      "base":this.formularioVentas.get("base").value
    }
    this.filtro=filtro;

    if (filtro.fechaInicio==="" && 
        filtro.fechaFin==="" && 
        filtro.id==="" && 
        filtro.nombre==="" && 
        filtro.categoria==="" && 
        filtro.especie==="" && 
        filtro.base==="") 
    {
    this.ventasFiltrado.emit(this.ventas);
    console.log("sin filtro");
    }

    return console.log(this.filtro);
  }

  regresar() {
    this._location.back();
  }

}
