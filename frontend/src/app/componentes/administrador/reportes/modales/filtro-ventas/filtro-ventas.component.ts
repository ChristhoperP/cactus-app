import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProductosService } from '../../../../../servicios/administrador/productos.service';
import { ReportesService } from '../../../../../servicios/administrador/reportes.service';
import { Router } from '@angular/router';
import {Location, DatePipe } from '@angular/common';
import { bindNodeCallback } from 'rxjs';
import { stringify } from 'querystring';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-filtro-ventas',
  templateUrl: './filtro-ventas.component.html',
  styleUrls: ['./filtro-ventas.component.css'],
  providers: [DatePipe]
})
export class FiltroVentasComponent implements OnInit {
  @ViewChild('closeAddExpenseModalVentas') closeAddExpenseModalVentas: ElementRef;
  showModalVentas: boolean = true;

  @Output() 
  ventasFiltrado = new EventEmitter<Object>();

  @Output() 
  nombreProducto = new EventEmitter<String>();

  fechaActual:any = new Date();
  
  categorias:any = [];
  especies:any = [];
  tipoBases:any = [];
  generos:any= [];
  ventas:any=[];
  filtro;
  generoSeleccionado;


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
              private _location: Location,
              private datePipe: DatePipe) { 
                this.fechaActual = this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd');
                console.log(this.fechaActual);
                
              }

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

    this._reporteService.getVentasReporte()
    .subscribe((res:any)=> {
      this.ventas = res;
      console.log(res);
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
    this.filtroVentas();
    this.showModalVentas=false;
    this.closeAddExpenseModalVentas.nativeElement.click();
    this.formularioVentas.reset();

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

    if ((filtro.fechaInicio===""  || filtro.fechaInicio===null)  && 
        (filtro.fechaFin===""  || filtro.fechaFin===null) && 
        (filtro.id===""  || filtro.id===null) && 
        (filtro.nombre===""  || filtro.nombre===null) && 
        (filtro.categoria===""  || filtro.categoria===null) && 
        (filtro.especie===""  || filtro.especie===null) && 
        (filtro.base==="" || filtro.base===null ))
    {
    this.ventasFiltrado.emit(this.ventas);
    this.nombreProducto.emit('');
    console.log("sin filtro");
    }  else {
               // filtro por ID de producto
                if ((filtro.fechaInicio==="" || filtro.fechaInicio===null) && 
                    (filtro.fechaFin==="" || filtro.fechaFin===null) && 
                    (filtro.id!="" || filtro.id!=null) && 
                    (filtro.nombre==="" || filtro.nombre===null) && 
                    (filtro.categoria==="" || filtro.categoria===null)&& 
                    (filtro.especie==="" || filtro.especie===null) && 
                    (filtro.base==="" || filtro.base===null)) {
                  var filtroVentasID:any = [];

                  filtroVentasID=this.ventas.filter(ventas => ventas.idproducto === parseInt(filtro.id) );
                  console.log(filtroVentasID);
                  
                  this.ventasFiltrado.emit(filtroVentasID);
                }
                else {
                      //filtro por nombre del producto
                        if ((filtro.fechaInicio==="" || filtro.fechaInicio===null) && 
                            (filtro.fechaFin==="" || filtro.fechaFin===null) && 
                            (filtro.id==="" ||filtro.id===null)  && 
                            (filtro.nombre!="" || filtro.nombre!=null)&& 
                            (filtro.categoria==="" || filtro.categoria===null)  && 
                            (filtro.especie==="" || filtro.especie===null) && 
                            (filtro.base==="" || filtro.base===null)) {
                          var filtroVentasNombre:any = [];

                          filtroVentasNombre = this.ventas.filter(ventas => ventas.nombre_producto.toLowerCase().includes(filtro.nombre.toLowerCase()));
                          console.log(filtroVentasNombre);
                          this.ventasFiltrado.emit(filtroVentasNombre);
                          // this.nombreProducto.emit(filtro.nombre);
                        }
                        else{
                            //filtro por categoria del producto
                                if ((filtro.fechaInicio==="" || filtro.fechaInicio===null)  && 
                                    (filtro.fechaFin==="" || filtro.fechaFin===null) && 
                                    (filtro.id==="" || filtro.id===null) && 
                                    (filtro.nombre==="" || filtro.nombre===null) && 
                                    (filtro.categoria!="" || filtro.categoria!=null) && 
                                    (filtro.especie==="" || filtro.especie===null) && 
                                    (filtro.base===""|| filtro.base===null) ) {
                                  var filtroVentasCategoria:any = [];

                                  filtroVentasCategoria=this.ventas.filter(ventas => ventas.categoria === filtro.categoria);
                                  console.log(filtroVentasCategoria);
                                  this.ventasFiltrado.emit(filtroVentasCategoria);
                                }
                                else{
                                    //filtro por base del producto
                                        if ((filtro.fechaInicio==="" || filtro.fechaInicio===null)  && 
                                            (filtro.fechaFin==="" || filtro.fechaFin===null) && 
                                            (filtro.id==="" || filtro.id===null) && 
                                            (filtro.nombre==="" || filtro.nombre===null) && 
                                            (filtro.categoria==="" || filtro.categoria===null) && 
                                            (filtro.especie==="" || filtro.especie===null) && 
                                            (filtro.base!=""|| filtro.base!=null) ) {
                                          var filtroVentasBase:any = [];

                                          filtroVentasBase=this.ventas.filter(ventas => ventas.tipobase === filtro.base);
                                          console.log(filtroVentasBase);
                                          this.ventasFiltrado.emit(filtroVentasBase);
                                        }
                                        else{
                                           //filtro por especie del producto
                                            if ((filtro.fechaInicio==="" || filtro.fechaInicio===null)  && 
                                                (filtro.fechaFin==="" || filtro.fechaFin===null) && 
                                                (filtro.id==="" || filtro.id===null) && 
                                                (filtro.nombre==="" || filtro.nombre===null) && 
                                                (filtro.categoria==="" || filtro.categoria===null) && 
                                                (filtro.especie!="" || filtro.especie!=null) && 
                                                (filtro.base===""|| filtro.base===null) ) {
                                                var filtroVentasEspecie:any = [];

                                                filtroVentasEspecie=this.ventas.filter(ventas => {
                                                                                                  var especie;
                                                                                                  for (let i = 0; i < ventas.especie.length; i++) {
                                                                                                    if (ventas.especie[i] === filtro.especie) {
                                                                                                      especie = ventas.especie[i];
                                                                                                      console.log(especie); 
                                                                                                      break;
                                                                                                    }
                                                                                                  }
                                                                                                  return especie;
                                                                                                });
                                                console.log(filtroVentasEspecie);
                                                this.ventasFiltrado.emit(filtroVentasEspecie);
                                            }
                                            else {
                                              //filtro por fecha de venta del producto
                                                  if ((filtro.fechaInicio!="" || filtro.fechaInicio!=null)  && 
                                                      (filtro.fechaFin!="" || filtro.fechaFin!=null) && 
                                                      (filtro.id==="" || filtro.id===null) && 
                                                      (filtro.nombre==="" || filtro.nombre===null) && 
                                                      (filtro.categoria==="" || filtro.categoria===null) && 
                                                      (filtro.especie==="" || filtro.especie===null) && 
                                                      (filtro.base===""|| filtro.base===null) ) {
                                                      var filtroVentasFechaVendido:any = [];
                                                        
                                                      if (filtro.fechaFin<=this.fechaActual) {
                                                        if (filtro.fechaFin>filtro.fechaInicio) {
                                                          filtroVentasFechaVendido=this.ventas.filter(ventas => (ventas.fechapedido>=filtro.fechaInicio && ventas.fechapedido<=filtro.fechaFin));
                                                          console.log(filtroVentasFechaVendido);
                                                          this.ventasFiltrado.emit(filtroVentasFechaVendido);
                                                        }else {
                                                          Swal.fire({
                                                            icon: 'error',
                                                            title: 'Error',
                                                            text: 'La fecha final debe ser mayor a la fecha inicial'
                                                          });
                                                        }
                                                      }else {
                                                        Swal.fire({
                                                          icon: 'error',
                                                          title: 'Error',
                                                          text: 'Le fecha final no debe exceder la fecha actual'
                                                        });
                                                      }
                                                  }
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
