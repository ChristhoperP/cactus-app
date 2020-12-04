import { Component, OnInit } from '@angular/core';
import {HistorialCompraService} from 'src/app/servicios/historial-compra.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {
  pedidos: any = [];


  constructor(private servicioHistorial: HistorialCompraService) { }

  ngOnInit(): void {
    this.servicioHistorial.getHistorial()
    .subscribe( res => {
      this.pedidos = res;
      console.log("PEDIDOS", res);
    }, err => {
      console.log(err);
    });










    
  }

}
