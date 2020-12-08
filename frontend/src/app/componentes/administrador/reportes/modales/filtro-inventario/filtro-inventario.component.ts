import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProductosService } from '../../../../../servicios/administrador/productos.service';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import Swal, { SweetAlertResult } from 'sweetalert2';

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
  
  @Output() 
  nombreProducto = new EventEmitter<String>();

  categorias:any = [];
  especies:any = [];
  tipoBases:any = [];
  generos:any= [];
  inventario:any = [];
  filtro;
  generoSeleccionado;


  formularioInventario:FormGroup = new FormGroup({
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
    });
  }

  obtenerEspeciesXGenero(genero:any): void {
    this._productoService.getEspecies ()
    .subscribe((res:any)=> {
      var especiesGenero:any =[];
      especiesGenero=res;
        this.especies=especiesGenero.filter(especie => especie.descripcion_genero === genero);
    } );
  }

  filtrar(){ 
    this.filtrosInventario();
    this.showModalInventario=false;
    this.closeAddExpenseModalInventario.nativeElement.click();
    this.formularioInventario.reset();
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

    if ((filtro.id==="" || filtro.id===null) && 
        (filtro.nombre==="" || filtro.nombre===null) && 
        (filtro.categoria==="" || filtro.categoria===null) && 
        (filtro.especie==="" || filtro.especie===null) && 
        (filtro.base==="" || filtro.base===null)) 
    {
      this.inventarioFiltrado.emit(this.inventario);
      // this.nombreProducto.emit('');
      console.log("sin filtro");
    } else {
      // filtro por ID de producto
       if ((filtro.id!="" || filtro.id!=null) && 
           (filtro.nombre==="" || filtro.nombre===null) && 
           (filtro.categoria==="" || filtro.categoria===null) && 
           (filtro.especie==="" || filtro.especie===null) && 
           (filtro.base==="" || filtro.base===null)) {
         var filtroInventarioID:any = [];

         filtroInventarioID=this.inventario.filter(inventario => inventario.idproducto === parseInt(filtro.id) );
         console.log(filtroInventarioID);
         
         this.inventarioFiltrado.emit(filtroInventarioID);
       }
       else {
             //filtro por nombre del producto
               if ((filtro.id==="" ||filtro.id===null)  && 
                   (filtro.nombre!="" || filtro.nombre!=null)&& 
                   (filtro.categoria==="" || filtro.categoria===null)  && 
                   (filtro.especie==="" || filtro.especie===null) && 
                   (filtro.base==="" || filtro.base===null)) {
                 var filtroInventarioNombre:any = [];
                 console.log(filtroInventarioNombre);

                 filtroInventarioNombre = this.inventario.filter(inventario => inventario.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()));
                 this.inventarioFiltrado.emit(filtroInventarioNombre);
                 // this.nombreProducto.emit(filtro.nombre);
               }
               else{
                   //filtro por categoria del producto
                       if ((filtro.id==="" || filtro.id===null) && 
                           (filtro.nombre==="" || filtro.nombre===null) && 
                           (filtro.categoria!="" || filtro.categoria!=null) && 
                           (filtro.especie==="" || filtro.especie===null) && 
                           (filtro.base===""|| filtro.base===null) ) {
                         var filtroInventarioCategoria:any = [];

                         filtroInventarioCategoria=this.inventario.filter(inventario => inventario.categoria === filtro.categoria);
                         console.log(filtroInventarioCategoria);
                         this.inventarioFiltrado.emit(filtroInventarioCategoria);
                       }
                       else{
                           //filtro por base del producto
                               if ((filtro.id==="" || filtro.id===null) && 
                                   (filtro.nombre==="" || filtro.nombre===null) && 
                                   (filtro.categoria==="" || filtro.categoria===null) && 
                                   (filtro.especie==="" || filtro.especie===null) && 
                                   (filtro.base!=""|| filtro.base!=null) ) {
                                 var filtroInventarioBase:any = [];

                                 filtroInventarioBase=this.inventario.filter(inventario => inventario.tipodebase === filtro.base);
                                 console.log(filtroInventarioBase);
                                 this.inventarioFiltrado.emit(filtroInventarioBase);
                               }
                               else{
                                  //filtro por especie del producto
                                    if ((filtro.id==="" || filtro.id===null) && 
                                        (filtro.nombre==="" || filtro.nombre===null) && 
                                        (filtro.categoria==="" || filtro.categoria===null) && 
                                        (filtro.especie!="" || filtro.especie!=null) && 
                                        (filtro.base===""|| filtro.base===null) ) {
                                        var filtroInventarioEspecie:any = [];

                                        filtroInventarioEspecie=this.inventario.filter(inventario => {
                                                                                          var especie;
                                                                                          for (let i = 0; i < inventario.especie.length; i++) {
                                                                                            if (inventario.especie[i] === filtro.especie) {
                                                                                              especie = inventario.especie[i];
                                                                                              console.log(especie); 
                                                                                              break;
                                                                                            }
                                                                                          }
                                                                                          return especie;
                                                                                        });
                                        console.log(filtroInventarioEspecie);
                                        this.inventarioFiltrado.emit(filtroInventarioEspecie);
                                    }
                                   }
                           }
                   }
            }
           }
    return console.log(this.filtro);
  }

  regresar() {
    this._location.back();
  }

}
