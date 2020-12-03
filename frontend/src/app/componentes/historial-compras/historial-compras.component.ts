import { Component, OnInit } from '@angular/core';
import {HistorialCompraService} from 'src/app/servicios/historial-compra.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {
  pedidos: any = [];
  productosPedidos: any =[];


  constructor(private servicioHistorial: HistorialCompraService) { }

  ngOnInit(): void {
    this.servicioHistorial.getHistorial()
    .subscribe( res => {
      this.pedidos = res;
for(const pedido of this.pedidos){
  const index= this.productosPedidos.findIndex(ped=>ped.idpedido===pedido.idpedido);
  
  if(!this.productosPedidos.length || this.productosPedidos.length<1 || index <0){
    this.productosPedidos.push(
      { idpedido:pedido.idpedido, productos: [{ idproducto: pedido.idproducto, nombre: pedido.nombre, precio_unitario: pedido.precio_unitario, cantidad: pedido.cantidad}] , fecha: pedido.fecha}
    );
  }

  if (index > -1){
    this.productosPedidos[index].productos.push({idproducto: pedido.idproducto, nombre: pedido.nombre, precio_unitario: pedido.precio_unitario, cantidad: pedido.cantidad, fecha: pedido.fecha})
  }

}

      console.log('Union:', this.productosPedidos);
    }, err => {
      console.log(err);
    });


    
  }

}


