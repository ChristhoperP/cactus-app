import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Global } from "../../servicios/global";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
public url: string;

userLogged: boolean;

  productosCarrito: any = [];
  productos: any = [
    {"idproducto": 1,
    "cantidadencarrito": 4,
    "urlportada": "3ae45f54-10cf-478d-9e78-d04ad7cce1cc.jpg", 
    "nombre": "Neon", 
    "cantidadinventario": "10", 
    "precio": 200, 
    "porcentajedescuento":  " ",
    "preciocondescuento":  200
    },
    {"idproducto": 2,
    "cantidadencarrito": 1,
    "urlportada": "31afb72a-8a43-4212-b8d2-7a94ad79b05f.jpg", 
    "nombre": "Sempervivum", 
    "cantidadinventario": "5", 
    "precio": 250, 
    "porcentajedescuento":  10,
    "preciocondescuento":  225
    }
];
  // carritoLocalStorage = JSON.parse(localStorage.getItem('productos-carrito'));
  // productosLocalStorage = this.carritoLocalStorage.productos;

  carritoLocalStorage = JSON.parse(localStorage.getItem('productos-carrito'));
  productosLocalStorage = this.carritoLocalStorage;

  totalPagar;

  

  constructor(private authService: AuthService, private _carritoService: CarritoService) { 
    this.url = Global.url;
    this.userLogged = this.authService.loggedIn();
  }

  ngOnInit(): void {
    if (this.userLogged) {
      this.productosCarrito = this.productos;
      this.calcularTotalPagar();

    // this._carritoService.obtenerProductosCarrito()
    // .subscribe(res => {
    //   console.log(res);
    //   this.productosCarrito = res;
    //   this.calcularTotalPagar();
    // });
    }else {
      this.productosCarrito = this.productosLocalStorage;
      this.calcularTotalPagar();
       console.log(this.productosCarrito);

    }


  }

  calcularTotalPagar(){
    var total=0;
    for (let i = 0; i < this.productosCarrito.length; i++) {
      total += parseInt(this.productosCarrito[i].preciocondescuento, 10);
    }
    this.totalPagar = total;
  }
}
