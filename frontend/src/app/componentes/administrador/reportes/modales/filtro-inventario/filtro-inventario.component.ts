import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProductosService } from '../../../../../servicios/administrador/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro-inventario',
  templateUrl: './filtro-inventario.component.html',
  styleUrls: ['./filtro-inventario.component.css']
})
export class FiltroInventarioComponent implements OnInit {
  @ViewChild('closeAddExpenseModalInventario') closeAddExpenseModalInventario: ElementRef;
  showModalInventario: boolean = true;

  
  categorias:any = [];
  especies:any = [];
  tipoBases:any = [];
  generos:any= [];

  formularioInventario:FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    idProducto: new FormControl(''),
    nombreProducto: new FormControl(''),
    categoria: new FormControl(''),
    especie: new FormControl(''),
    genero: new FormControl(''),
    base: new FormControl('')
  });
  constructor(private _productoService: ProductosService, private router: Router) { }

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
  }

}
