import { Component, OnInit } from '@angular/core';
import {ServAdminService} from '../../../servicios/administrador/serv-admin.service';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
    cantidades: any[] 
    categorias: any []
    
  constructor(private serviceAdmin: ServAdminService) { }



  ngOnInit(): void {
    this.serviceAdmin.getCategoria().subscribe((data: any) => {
        this.cantidades = data.map(categoria => categoria.categoria)
        this.categorias = data.map(categoria => categoria.cantidad)
        console.log(data)

        var myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.cantidades,
                datasets: [{
                    label: '',
                    data: this.categorias,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

      });


   
  }

}
