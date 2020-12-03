import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../servicios/administrador/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Array<any>;
  pedidosFiltrados: Array<any>;
  pedidosPendientes = 0;
  pedidosCompletados = 0;
  filtro = 'todos';

  constructor(
    private pedidosService: PedidosService
  ) {
    this.pedidos = new Array<any>();
  }

  ngOnInit(): void {
    this.pedidosService.getPedidos()
      .subscribe( res => {
        this.pedidos = res;
        this.pedidosFiltrados = this.pedidos;

        for (const pedido of this.pedidos) {
          if (pedido.estado === 'pendiente'){
            this.pedidosPendientes ++;
          } else {
            this.pedidosCompletados ++;
          }
        }
        console.log(res);
      }, err => { console.log(err); });




  }

  cambiarEstadoPedido(idpedido): void {
    const index = this.pedidos.findIndex( pedido => pedido.idpedido === idpedido);
    this.pedidos[index].estado = 'completado';

    this.pedidosPendientes = 0;
    this.pedidosCompletados = 0;
    for (const pedido of this.pedidos) {
      if (pedido.estado === 'pendiente'){
        this.pedidosPendientes ++;
      } else {
        this.pedidosCompletados ++;
      }
    }

    console.log('Completados: ', this.pedidosCompletados);
    console.log('Pendientes: ', this.pedidosPendientes);
  }

  filtrarPedidos(estado): void {
    this.filtro = estado;
    if (estado === 'todos'){
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter( pedido => pedido.estado === estado);
    }
  }
}
