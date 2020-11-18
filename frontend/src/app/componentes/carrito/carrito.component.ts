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

  productosCarrito: any = [
                            {"idproducto": 1,
                            "cantidadencarrito": 2,
                            "urlportada": "1df4d600-0508-4d58-a23b-f8b3d366eab6.jpg", 
                            "nombre": "cajita", 
                            "cantidadinventario": "5", 
                            "precio": 140, 
                            "porcentajedescuento":  10,
                            "preciocondescuento":  126
                            },
                            {"idproducto": 1,
                            "cantidadencarrito": 2,
                            "urlportada": "1df4d600-0508-4d58-a23b-f8b3d366eab6.jpg", 
                            "nombre": "cajita", 
                            "cantidadinventario": "5", 
                            "precio": 500, 
                            "porcentajedescuento":  10,
                            "preciocondescuento":  450

                            }

  ];
  idCarrito;
  totalPagar;

  constructor(private _carritoService: CarritoService) { 
    this.url = Global.url;
    this.calcularTotalPagar();

  }

  ngOnInit(): void {
    this._carritoService.obtenerProductosCarrito(this.idCarrito)
    .subscribe(res => {
      console.log(res);
      this.productosCarrito = res;
    });
  }

  calcularTotalPagar(){
    var precioConDescuento=0;
    for (let i = 0; i < this.productosCarrito.length; i++) {
      precioConDescuento += this.productosCarrito[i].preciocondescuento;
    }
    this.totalPagar =precioConDescuento;    
  }
}
