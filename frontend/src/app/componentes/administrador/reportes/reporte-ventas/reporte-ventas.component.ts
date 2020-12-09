import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';
import { Global } from 'src/app/servicios/global';

/* Para generar PDF */
import { Canvas, Cell, Columns, Img, Line, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  ventas:any=[];
  cantidadTotal=0;
  productosFilterByName = { nombre_producto: '' }; 

  pdf = new PdfMakeWrapper();

  constructor(private _location: Location, private filter: FilterPipe) {
    this.ventas;
    this.productosFilterByName;
   }

  ngOnInit(): void {
    this.getImagenReporte();
    
  }

  recibeVentas(ventas:any){
    console.log(ventas);
    this.ventas=ventas;    
    for (let i = 0; i < ventas.length; i++) {
      this.cantidadTotal+=ventas[i].cantidad_vendida;
     }
  }

  recibeNombreProducto(nombre){
  this.productosFilterByName = { nombre_producto: nombre }; 
  console.log(this.productosFilterByName);
  }

  limpiarModal(){
    this.ventas = [];
    this.cantidadTotal=0;
  }

  regresar() {
    this._location.back();
  }

  async getImagenReporte(){
    this.pdf.images({headerImg: await new Img('../../../../assets/img/logo_vector.png').build()});
  }

  getTablaReporte() {
    return this.ventas.map( vta => [vta.idproducto, vta.nombre_producto, vta.categoria, vta.tipobase, vta.especie.join('\n'), vta.cantidad_vendida, vta.precio_venta, new Date(vta.fechapedido).toLocaleDateString(), vta.nombre_usuario]);
  }

  getEncabezadoTabla() {
    return [
      new Txt('#').alignment('center').bold().color('white').end,
      new Txt('Nombre').alignment('center').bold().color('white').end,
      new Txt('Categoría').alignment('center').bold().color('white').end,
      new Txt('Tipo de base').alignment('center').bold().color('white').end,
      new Txt('Especie(s)').alignment('center').bold().color('white').end,
      new Txt('Cantidad vendida').alignment('center').bold().color('white').end,
      new Txt('Precio').alignment('center').bold().color('white').end,
      new Txt('Fecha').alignment('center').bold().color('white').end,
      new Txt('Usuario').alignment('center').bold().color('white').end
    ];
  }

  generarPDF(): void {

    this.pdf.pageSize('letter');
    this.pdf.pageMargins([35, 85, 35, 72]);

    this.pdf.info({
      title: `Reporte de Ventas`,
      creationDate: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      subject: `Reporte de Ventas - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      author: 'Cactus HN'
    });

    this.pdf.header(
      new Columns([
        { image: 'headerImg', width: 50, height: 50 },
        new Txt('Cactus HN').bold().fontSize(24).width(125).margin([10, 11, 0, 0]).end,
        new Txt('REPORTE DE VENTAS').fontSize(20).bold().decoration('underline').width(315).margin([0, 15, 0, 0]).alignment('center').end,
        [
          new Txt(`Generado el ${new Date().toLocaleDateString()}`).fontSize(10).italics().width(102).margin([0, 11, 0, 0]).alignment('left').end,
          new Txt(`A las ${new Date().toLocaleTimeString()}`).fontSize(10).italics().width(102).margin([0, 5, 0, 0]).alignment('left').end
        ],
        new Canvas([new Line([0, 0], [612, 0]).color('grey').lineWidth(5).end]).height(5).absolutePosition(0, 70).end
      ]).margin([10, 10, 0, 0]).alignment('left').end
    );

    this.pdf.footer(
      (currentPage: number, pageCount: number) => {
        const foot = [{
          alignment: 'right',
          margin: [0, 25, 15, 0],
          text: new Txt('Pág. ' + currentPage.toString() + ' de ' + pageCount).fontSize(10).end
        },
        new Canvas([new Line([0, 0], [612, 0]).color('grey').lineWidth(5).end]).height(5).absolutePosition(0, 15).end];
        return foot;
      }
    );

    const table = new Table([
      this.getEncabezadoTabla(),
        ...this.getTablaReporte(),
        [new Cell({text: 'CANTIDAD TOTAL DE PRODUCTOS VENDIDOS'}).fillColor('black').color('white').colSpan(5).bold().end, '', '', '', '', new Cell({text: this.cantidadTotal}).fillColor('black').color('white').bold().end, '', '', '']
      ])
      .fontSize(8)
      .widths([20, 80, 80, 55, 90, 35, 30, 45, 30])
      .headerRows(1)
      .alignment('center')
      .layout({
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          return rowIndex === 0 ? 'black' : rowIndex % 2 === 0 ? 'white' : 'white';
        },
        hLineColor: (rowIndex: number, node: any, columnIndex: number) => {
          return (rowIndex === 0 || rowIndex === 1) ? 'black' : 'lightgrey';
        },
        vLineColor: (rowIndex: number, node: any, columnIndex: number) => {
          return columnIndex < 1 ? 'black' : 'lightgrey';
        },
        vLineWidth : (rowIndex: number, node: any, columnIndex: number) => {
          return 0.5;
        },
        hLineWidth: (rowIndex: number, node: any, columnIndex: number) => {
          return (rowIndex === 0 || rowIndex === 1) ? 1 : 0.5;
        }
      }).end;

    this.pdf.add(table);
    const file = this.pdf.create();

    // Abre el archivo en una nueva ventana
    file.open();

    // Descargar automáticamente el archivo generado
    // file.download(`Reporte de usuarios ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}.pdf`);

    // Reniciar estructura del archivo
    this.reiniciarArchivo();
    console.log('File: ', file);
  }

  reiniciarArchivo(): void {
    this.pdf = new PdfMakeWrapper();
    this.getImagenReporte();
  }

}
