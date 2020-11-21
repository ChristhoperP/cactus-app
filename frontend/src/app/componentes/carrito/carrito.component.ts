import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Global } from '../../servicios/global';
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
checkAll: boolean;


  storageName = 'productos-carrito';
  productosCarrito:any = [];
  totalPagar;

  constructor(
    private authService: AuthService,
    private _carritoService: CarritoService,
    private _location: Location) {
      this.url = Global.url;
      this.userLogged = this.authService.loggedIn();
  }

  ngOnInit(): void {
    if (this.userLogged) {

    this._carritoService.obtenerProductosCarrito()
      .subscribe((res: any) => {
        console.log(res);
        this.productosCarrito = res;

        for (const producto of this.productosCarrito) {
          producto.checked = true;
        }

        this.checkAll = true;

        this.calcularTotalPagar();
      });
    }else {
      if (localStorage.getItem(this.storageName) === null) {
        console.log('No hay productos en el carrito');
      }else{
        this.productosCarrito = JSON.parse(localStorage.getItem('productos-carrito'));
        if (this.productosCarrito.length >= 1) {
          this.calcularTotalPagar();
        }
        console.log(this.productosCarrito);
      }
    }
  }

  calcularTotalPagar(): void{
    var total = 0;

    if (this.userLogged){
      for (const producto of this.productosCarrito) {
        if (producto.checked){
          if (producto.preciocondescuento !== null){
            total += parseInt(producto.preciocondescuento, 10) * parseInt(producto.cantidadencarrito, 10);
          } else {
            total += parseInt(producto.precio, 10) * parseInt(producto.cantidadencarrito, 10);
          }
        }
      }
    } else {
      for (const producto of this.productosCarrito) {
        if (producto.preciocondescuento !== null) {
          total += parseInt(producto.preciocondescuento, 10) * parseInt(producto.cantidadencarrito, 10);
        } else {
          total += parseInt(producto.precio, 10) * parseInt(producto.cantidadencarrito, 10);
        }
      }
    }
    this.totalPagar = total;
  }

  eliminarTodosProductos(): void{
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
          for (let i = 0; i < this.productosCarrito.length; i++) {
            this._carritoService.eliminarProductoCarrito(this.productosCarrito[i].idproducto)
            .subscribe(res => {
                console.log(res);
                this.productosCarrito = [];
            });
          }
        }else{
          localStorage.removeItem(this.storageName);
          this.productosCarrito = [];
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
                this._carritoService.eliminarProductoCarrito(id)
                .subscribe(res => {
                    console.log(res);
                    // this.productosCarrito;
                    this.calcularTotalPagar();
                });
              }else{
                this.calcularTotalPagar();
                return this.actualizarLocalStorage();
              }

            }
          }
        }
      });
  }

  actualizarLocalStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.productosCarrito));
    return this.productosCarrito;
  }

  regresar() {
    this._location.back();
  }

  checkProducto( id ): void {
    let checked = 0;
    for (const producto of this.productosCarrito) {
      if (producto.idproducto === id){
        producto.checked = !producto.checked;
      }
      if (producto.checked){
        checked++;
      } else {
        checked--;
      }
    }

    if (checked === this.productosCarrito.length) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }

    this.calcularTotalPagar();
  }

  checkProductos( evt ): void {
    for (const producto of this.productosCarrito) {
      producto.checked = evt.target.checked;
    }
    this.calcularTotalPagar();
  }

  cambiarCantidadProducto( id, evt: any): void {
    for (const producto of this.productosCarrito) {
      if (producto.idproducto === id){
        if (evt.target.value <= producto.cantidadinventario ) {
          producto.cantidadencarrito = evt.target.value;
        }
      }
    }
    this.calcularTotalPagar();
  }
}
