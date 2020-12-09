import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';
import { Global } from 'src/app/servicios/global';

/* Para generar PDF */
import { Canvas, Columns, Img, Line, PdfMakeWrapper, Stack, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {
  usuarios:any = [];
  usuarioFilterByName = { nombre: '' };

  pdf = new PdfMakeWrapper();

  constructor( private _location: Location, private filter: FilterPipe) {
    this.usuarios;
    this.usuarioFilterByName;
   }

  ngOnInit(): void {
    this.getImagenReporte();
  }

  recibeUsuario(usuarios:any){
    console.log(usuarios);
    this.usuarios=usuarios;
  }

  recibeNombreUsuario(nombre){
    this.usuarioFilterByName = { nombre: nombre }; 
    console.log(this.usuarioFilterByName);
    }
  
    limpiarModal(){
      this.usuarios = [];
 
    }

  regresar() {
    this._location.back();
  }

  async getImagenReporte(){
    this.pdf.images({headerImg: await new Img('../../../../assets/img/logo_vector.png').build()});
  }

  getTablaReporte() {
      return this.usuarios.map( usr => [usr.idusuario, usr.nombre, usr.correo, usr.telefono, usr.direccion, new Date(usr.fecharegistro).toLocaleDateString()]);
  }

  getEncabezadoTabla() {
    return [
      new Txt('Código').alignment('center').bold().color('white').end,
      new Txt('Nombre de usuario').alignment('center').bold().color('white').end,
      new Txt('Correo Electrónico').alignment('center').bold().color('white').end,
      new Txt('Teléfono').alignment('center').bold().color('white').end,
      new Txt('Dirección').alignment('center').bold().color('white').end,
      new Txt('Fecha de registro').alignment('center').bold().color('white').end
    ];
  }

  generarPDF(): void {

    this.pdf.pageSize('letter');
    this.pdf.pageMargins([50, 85, 50, 72]);

    this.pdf.info({
      title: `Reporte de Usuarios`,
      creationDate: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      subject: `Reporte de Usuarios - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      author: 'Cactus HN'
    });

    this.pdf.header(
      new Columns([
        { image: 'headerImg', width: 50, height: 50 },
        new Txt('Cactus HN').bold().fontSize(24).width(125).margin([10, 11, 0, 0]).end,
        new Txt('REPORTE DE USUARIOS').fontSize(20).bold().decoration('underline').width(315).margin([0, 15, 0, 0]).alignment('center').end,
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
        ...this.getTablaReporte()
      ])
      .fontSize(8)
      .widths([30, 90, 90, 55, 120, 72])
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
