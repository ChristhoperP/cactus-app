import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProductosService } from '../../../../../servicios/administrador/productos.service';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro-ventas',
  templateUrl: './filtro-ventas.component.html',
  styleUrls: ['./filtro-ventas.component.css']
})
export class FiltroVentasComponent implements OnInit {
  @ViewChild('closeAddExpenseModalVentas') closeAddExpenseModalVentas: ElementRef;
  showModalVentas: boolean = true;

  categorias:any = [];
  especies:any = [];
  tipoBases:any = [];
  generos:any= [];
  ventas:any=[];

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

  constructor(private _productoService: ProductosService, private _reporteService: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this._productoService.getCategorias()
    .subscribe((res:any)=> {
        this.categorias = res;
        console.log(this.categorias);
        
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

    this._reporteService.getVentasReporte()
    .subscribe((res:any)=> {
      this.ventas = res;
      console.log(res);
    });
  }

  filtrar(){
    this.showModalVentas=false;
    this.closeAddExpenseModalVentas.nativeElement.click();
  }

}
