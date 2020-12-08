import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import {Location} from '@angular/common';
import { Global } from 'src/app/servicios/global';

/* Para generar PDF */
import { Canvas, Cell, Columns, Img, Line, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {
  inventario:any=[];
  cantidadTotal=0;
  productosFilterByName = { nombre: '' }; 

  pdf = new PdfMakeWrapper();

  constructor(private _location: Location, private filter: FilterPipe) {
    this.inventario;
    this.productosFilterByName;

  }

  ngOnInit(): void {
    this.getImagenReporte();
  }

  recibeInventario(inventario){
    console.log(inventario);
    this.inventario=inventario;

    for (let i = 0; i < inventario.length; i++) {
     this.cantidadTotal+=inventario[i].cantidad;
    }

  }

  recibeNombreProducto(nombre){
    this.productosFilterByName = { nombre: nombre }; 
    }
  
  limpiarModal(){
    this.inventario = [];
    this.cantidadTotal=0;
  }

  regresar() {
    this._location.back();
  }

  async getImagenReporte(){
    this.pdf.images({headerImg: await new Img(Global.url + 'get-image/logo_vector.png').build()});
  }

  getTablaReporte() {    
    return this.inventario.map( prod => [prod.idproducto, prod.nombre, prod.categoria, prod.tipodebase, prod.especie.join(','), prod.cantidad, prod.precio]);
  }

  getEncabezadoTabla() {
    return [
      new Txt('#').alignment('center').bold().color('white').end,
      new Txt('Nombre').alignment('center').bold().color('white').end,
      new Txt('Categoría').alignment('center').bold().color('white').end,
      new Txt('Tipo de base').alignment('center').bold().color('white').end,
      new Txt('Especie(s)').alignment('center').bold().color('white').end,
      new Txt('Cantidad').alignment('center').bold().color('white').end,
      new Txt('Precio').alignment('center').bold().color('white').end
    ];
  }

  generarPDF(): void {

    this.pdf.pageSize('letter');
    this.pdf.pageMargins([40, 85, 40, 72]);

    this.pdf.info({
      title: `Reporte de Inventario`,
      creationDate: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      subject: `Reporte de Inventario - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      author: 'Cactus HN'
    });

    this.pdf.header(
      new Columns([
        { image: 'headerImg', width: 50, height: 50 },
        new Txt('Cactus HN').bold().fontSize(24).width(125).margin([10, 11, 0, 0]).end,
        new Txt('REPORTE DE INVENTARIO').fontSize(20).bold().decoration('underline').width(315).margin([0, 15, 0, 0]).alignment('center').end,
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
        [new Cell({text: 'TOTAL DE PRODUCTOS EN INVENTARIO'}).fillColor('black').color('white').colSpan(5).bold().end, '', '', '', '', new Cell({text: this.cantidadTotal}).fillColor('black').color('white').bold().end, '']
      ])
      .fontSize(8)
      .widths([20, 90, 90, 97, 105, 35, 30])
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
