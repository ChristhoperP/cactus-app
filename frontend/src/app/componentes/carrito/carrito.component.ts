import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Global } from '../../servicios/global';
import { Router } from '@angular/router';
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
    private _location: Location,
    private router: Router) {
      this.url = Global.url;
      this.userLogged = this.authService.loggedIn();
  }

  ngOnInit(): void {

    
    if (this.userLogged) {

      this._carritoService.obtenerProductosCarrito()
        .subscribe((res: any) => {
          console.log(res);
          this.productosCarrito = res;
          console.log(res.length);

          for (const producto of this.productosCarrito) {
            producto.checked = true;
          }

          this._carritoService.setCantidadProductos(this.getCantidadEnCarrito());
          console.log('Cantidad en carrito: ', this.getCantidadEnCarrito());

          this.calcularTotalPagar();
        });
    }else {
        if (localStorage.getItem(this.storageName) === null) {
          console.log('No hay productos en el carrito');
        }else{
          this.productosCarrito = JSON.parse(localStorage.getItem('productos-carrito'));
          if (this.productosCarrito.length >= 1) {

            this._carritoService.setCantidadProductos(this.getCantidadEnCarrito());
            console.log('Cantidad en carrito: ', this.getCantidadEnCarrito());
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
            this._carritoService.eliminarProductoCarrito(this.productosCarrito[i].idproducto, parseInt(this.productosCarrito[i].cantidadencarrito, 10))
            .subscribe(res => {
                console.log(res);
                this.productosCarrito = [];
                this._carritoService.setCantidadProductos(0);
            });
          }
        }else{
          localStorage.removeItem(this.storageName);
          this.productosCarrito = [];
          this._carritoService.setCantidadProductos(0);
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

          let cantidadEliminar = 0;

          for (let i = 0; i < this.productosCarrito.length; i++) {
            if ( this.productosCarrito[i].idproducto === id){
              console.log('Eliminando: ' + id + ' / ' + this.productosCarrito[i]);
              cantidadEliminar += parseInt(this.productosCarrito[i].cantidadencarrito, 10);
              this.productosCarrito.splice(i, 1);

              if (this.userLogged) {
                this._carritoService.eliminarProductoCarrito(id, cantidadEliminar)
                .subscribe(res => {
                    console.log(res);
                    // this.productosCarrito;
                    this._carritoService.actualizarEliminados();
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

    this._carritoService.setCantidadProductos(this.getCantidadEnCarrito());
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

    if(!this.authService.loggedIn()) {
      this.actualizarLocalStorage();
    }

    this._carritoService.setCantidadProductos(this.getCantidadEnCarrito());

    this.calcularTotalPagar();
  }

  productosPagar(): void {
    var productos=[];
    this.productosCarrito.forEach(element => {
      if (element.checked) {
        productos.push({ "idproducto": + element.idproducto, "cantidad": + element.cantidadencarrito});
      }
    });

    localStorage.setItem("productos", JSON.stringify(productos));
  }

  getCantidadEnCarrito(): number {
    let cantidadProductos = 0;

    for (const prod of this.productosCarrito) {
      cantidadProductos += parseInt(prod.cantidadencarrito, 10);
    }

    return cantidadProductos;
  }
  
}
