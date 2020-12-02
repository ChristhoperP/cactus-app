import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/administrador/pedidos.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  constructor(
    private pedidoService: PedidosService
  ) { }

  ngOnInit(): void {
  }

  setPedido(idpedido): void {
    console.log('Idpedido: ', idpedido);
    this.pedidoService.getDetallePedido(idpedido)
      .subscribe( res => {
        console.log(res);
      }, err => { console.log(err); });
  }

}
