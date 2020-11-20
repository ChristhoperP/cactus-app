import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Global } from "../../servicios/global";
import {Location} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
public url: string;

userLogged: boolean;


  storageName = 'productos-carrito';
  productosCarrito:any = [];
  // carritoLocalStorage = JSON.parse(localStorage.getItem('productos-carrito'));
  // productosLocalStorage = this.carritoLocalStorage.productos;

 
  totalPagar;

  constructor(private authService: AuthService, private _carritoService: CarritoService, private _location: Location) { 
    this.url = Global.url;
    this.userLogged = this.authService.loggedIn();
  }

  ngOnInit(): void {
    if (this.userLogged) {

    this._carritoService.obtenerProductosCarrito()
      .subscribe(res => {
        console.log(res);
        this.productosCarrito = res;
        this.calcularTotalPagar();
      });
    }else {
      if (localStorage.getItem(this.storageName) === null) {
        console.log("no hay productos en el carrito");
      }else{
        this.productosCarrito = JSON.parse(localStorage.getItem('productos-carrito'));
        if (this.productosCarrito.length >=1) {
          this.calcularTotalPagar();
        }
         console.log(this.productosCarrito);
      }
    }
  }

  calcularTotalPagar(){

    var total=0;
    for (let i = 0; i < this.productosCarrito.length; i++) {
      total += Number(this.productosCarrito[i].preciocondescuento);
  /*
    var total = 0;

    for (const producto of this.productosCarrito) {
      if(producto.preciocondescuento !== null) {
        total += parseInt(producto.preciocondescuento, 10);
      } else {
        total += parseInt(producto.precio, 10);
      }

    }
    /* for (let i = 0; i < this.productosCarrito.length; i++) {
      if ()
      total += parseInt(this.productosCarrito[i].preciocondescuento, 10);
    } */
    this.totalPagar = total;
  }

  eliminarTodosProductos(){
    Swal.fire({
      title: '¿Desea eliminar todos los productos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.userLogged) {
          console.log('logueado');
          
        }else{
          localStorage.removeItem(this.storageName);
          this.productosCarrito=[];
          // this.totalPagar=0;
        }
      }
    });
  }

  eliminarProductoCarrito( id: string ): void {
    console.log('Id a eliminar: ' + id);
    Swal.fire({
        title: '¿Desea eliminar este producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        cancelButtonText: `Cancelar`,
        confirmButtonColor: `#50a1a5`,
        cancelButtonColor: `red`
      }).then((result) => {

        if (result.isConfirmed) {
          for (let i = 0; i < this.productosCarrito.length; i++) {
            if ( this.productosCarrito[i].idproducto === id){
              console.log('Eliminando: ' + id + ' / ' + this.productosCarrito[i]);
              this.productosCarrito.splice(i, 1);
                if (this.userLogged) {
                  console.log('logueado');
                  
                }else{
                  this.calcularTotalPagar();
                  return this.actualizarLocalStorage();
                }
            }
          }
        }
      });
  }

  private actualizarLocalStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.productosCarrito));
    return this.productosCarrito;
  }

  regresar() {
    this._location.back();
  }
}
