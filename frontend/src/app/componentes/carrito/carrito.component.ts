import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Global } from "../../servicios/global";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
public url: string;

  productosCarrito: any = [];
  idCarrito;
  totalPagar;

 //datos de prueba
                            // "idproducto": 1,
                            // "cantidadencarrito": 2,
                            // "urlportada": "1df4d600-0508-4d58-a23b-f8b3d366eab6.jpg", 
                            // "nombre": "cajita", 
                            // "cantidadinventario": "5", 
                            // "precio": 140, 
                            // "porcentajedescuento":  10
                            // }
  constructor(private _carritoService: CarritoService) { 
    this.url = Global.url;

  }

  ngOnInit(): void {
    this._carritoService.obtenerProductosCarrito(this.idCarrito)
    .subscribe(res => {
      console.log(res);
      this.productosCarrito = res;
    });
  }

  calcularTotalPagar(){
    for (let i = 0; i < this.productosCarrito.length; i++) {
      this.totalPagar += this.productosCarrito[i].precio;
      
    }
  }

}
