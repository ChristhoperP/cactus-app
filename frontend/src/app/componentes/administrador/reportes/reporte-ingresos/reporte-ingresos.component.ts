import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Global } from 'src/app/servicios/global';

/* Para generar PDF */
import { Canvas, Cell, Columns, Img, Line, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);


@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styleUrls: ['./reporte-ingresos.component.css']
})
export class ReporteIngresosComponent implements OnInit {
  ingresosAnio:any = [];
  ingresosMes:any = [];
  nombre:any;

  tablaOcultaMes:boolean=false;
  tablaOcultaAnio:boolean=true;

  pdf = new PdfMakeWrapper();

  constructor( private _location: Location) { 
    this.ingresosAnio;
    this.ingresosMes;
  }

  ngOnInit(): void {
    this.getImagenReporte();
  }

  recibeIngresosAnio(anio:any){
    this.ingresosAnio=anio;
    console.log(this.ingresosAnio);
  }

  recibeIngresosMes(ingresosMes){
    this.ingresosMes=ingresosMes;
    console.log(this.ingresosMes);
  }

  regresar() {
    this._location.back();
  }

  ocultarTabla(tabla){
    switch(tabla){
      case "Anio": this.tablaOcultaAnio=true;
      this.tablaOcultaMes=false;
      break;
      case "Mes":this.tablaOcultaMes=true;
      this.tablaOcultaAnio=false;
      break;
    }
  }

  async getImagenReporte(){
    this.pdf.images({headerImg: await new Img(Global.url + 'get-image/logo_vector.png').build()});
  }

  getTablaAnio() {    
    return this.ingresosAnio.map( ing => [ing.ingresosporanio, ing.ventasxanio]);
  }

  getTablaMes() {    
    return this.ingresosMes.map( ing => [ing.ingresospormes, ing.ventasxmes]);
  }

  getEncabezadoTablaAnio() {
    return [
      new Txt('Año').alignment('center').bold().color('white').end,
      new Txt('Ingreso').alignment('center').bold().color('white').end,
    ];
  }

  getEncabezadoTablaMes() {
    return [
      new Txt('Mes').alignment('center').bold().color('white').end,
      new Txt('Ingreso').alignment('center').bold().color('white').end,
    ];
  }

  generarPDF(): void {

    this.pdf.pageSize('letter');
    this.pdf.pageMargins([71, 85, 72, 72]);

    this.pdf.info({
      title: `Reporte de Ingresos`,
      creationDate: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      subject: `Reporte de Ingresos - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      author: 'Cactus HN'
    });

    this.pdf.header(
      new Columns([
        { image: 'headerImg', width: 50, height: 50 },
        new Txt('Cactus HN').bold().fontSize(24).width(125).margin([10, 11, 0, 0]).end,
        new Txt('REPORTE DE INGRESOS').fontSize(20).bold().decoration('underline').width(315).margin([0, 15, 0, 0]).alignment('center').end,
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
    
    if (this.ingresosAnio && this.ingresosAnio.length > 0){
      const table = new Table([
        this.getEncabezadoTablaAnio(),
          ...this.getTablaAnio()
        ])
        .fontSize(12)
        .widths([234, 234])
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
    }

    if (this.ingresosMes && this.ingresosMes.length > 0){
      this.pdf.add(this.pdf.ln(2));
      const table = new Table([
        this.getEncabezadoTablaMes(),
          ...this.getTablaMes()
        ])
        .fontSize(12)
        .widths([234, 234])
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
    }

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

  reiniciarTablas(): void {
    this.ingresosAnio = [];
    this.ingresosMes = [];
  }

}
