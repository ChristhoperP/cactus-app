import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PedidosService } from 'src/app/servicios/administrador/pedidos.service';

@Component({
  selector: 'app-detalle-historial-compra',
  templateUrl: './detalle-historial-compra.component.html',
  styleUrls: ['./detalle-historial-compra.component.css']
})
export class DetalleHistorialCompraComponent implements OnInit {
  pedido: any ;
  productos_lista: any= [] ;

  constructor(private pedidoService: PedidosService) { }

  ngOnInit(): void {
    
  }
  setPedido(idpedido): void {
    console.log('Idpedido: ', idpedido);
    this.pedidoService.getDetallePedidoCliente(idpedido)
      .subscribe( (res:any) => {
        console.log(res);
        this.pedido = res.datos;
        this.productos_lista = res.productos;
      }, err => { console.log(err); });
  }

 

}
