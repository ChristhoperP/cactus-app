import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProductosService } from '../../../../../servicios/administrador/productos.service';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro-inventario',
  templateUrl: './filtro-inventario.component.html',
  styleUrls: ['./filtro-inventario.component.css']
})
export class FiltroInventarioComponent implements OnInit {
  @ViewChild('closeAddExpenseModalInventario') closeAddExpenseModalInventario: ElementRef;
  showModalInventario: boolean = true;
  
  @Output() 
  inventarioFiltrado = new EventEmitter<Object>();
  
  categorias:any = [];
  especies:any = [];
  tipoBases:any = [];
  generos:any= [];
  inventario:any = [];
  filtro;

  formularioInventario:FormGroup = new FormGroup({
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

    this._reporteService.getInventarioReporte()
    .subscribe((res:any)=> {
      this.inventario = res;
      console.log(res);
    });
  }

  filtrar(){ 
    this.filtrosInventario();
    this.showModalInventario=false;
    this.closeAddExpenseModalInventario.nativeElement.click();
  }

  filtrosInventario(){
    var filtro = {
      "id":this.formularioInventario.get("idProducto").value,
      "nombre":this.formularioInventario.get("nombreProducto").value,
      "categoria":this.formularioInventario.get("categoria").value,
      "especie":this.formularioInventario.get("especie").value,
      "base":this.formularioInventario.get("base").value
    }
    this.filtro=filtro;

    if (filtro.id==="" && 
        filtro.nombre==="" && 
        filtro.categoria==="" && 
        filtro.especie==="" && 
        filtro.base==="") 
    {
    this.inventarioFiltrado.emit(this.inventario);
    console.log("sin filtro");
    }

    return console.log(this.filtro);
  }

}
