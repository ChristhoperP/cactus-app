import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  @ViewChild('myModal') filtroVentas;
  showModalVentas: boolean = true;

  constructor() { }

  ngOnInit(): void {
  this.openModel();
  }

  openModel() {
    this.filtroVentas.nativeElement.className = 'modal fade show';
  }
}
