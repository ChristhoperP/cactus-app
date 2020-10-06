import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/compartidos/encabezado/encabezado.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PiepaginaComponent } from './componentes/compartidos/piepagina/piepagina.component';
import { CarruzelComponent } from './componentes/compartidos/carruzel/carruzel.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    InicioComponent,
    PiepaginaComponent,
    CarruzelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
