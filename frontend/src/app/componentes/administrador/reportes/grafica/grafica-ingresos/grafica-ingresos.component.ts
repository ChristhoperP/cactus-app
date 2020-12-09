import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ReportesService } from 'src/app/servicios/administrador/reportes.service';

@Component({
  selector: 'app-grafica-ingresos',
  templateUrl: './grafica-ingresos.component.html',
  styleUrls: ['./grafica-ingresos.component.css']
})
export class GraficaIngresosComponent implements OnInit {

  meses = new Array<any>();
  ingresos = new Array<any>();

  @ViewChild('myChart') grafica: ElementRef<HTMLCanvasElement>;

  constructor(
    private reporteService: ReportesService
  ) { }

  ngOnInit(): void {
    this.reporteService.getIngresosGrafica()
      .subscribe( (res: any) => {
        console.log('Datos gráfica: ', res);

        this.meses.push(res[0].fecha);
        
        this.ingresos.push(res[0].ventas_mes);
        

        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
              labels: this.meses,
              datasets: [{
                  label: '',
                  data: this.ingresos,
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

      }, err => { console.log(err); })
  }

  getImagenGrafica() {
    /* var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png"); */
    var dataURL = this.grafica.nativeElement.toDataURL('image/png');
    // console.log('Base64', dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    return dataURL/* .replace(/^data:image\/(png|jpg);base64,/, "") */;
  }

}
