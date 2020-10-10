import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/compartidos/encabezado/encabezado.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PiepaginaComponent } from './componentes/compartidos/piepagina/piepagina.component';
import { CarruzelComponent } from './componentes/compartidos/carruzel/carruzel.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { ProductosComponent } from './componentes/productos/productos.component';

//Formularios
import { RegistroComponent } from './componentes/registro/registro.component';

//Rutas
import { rutas_encabezado } from "./app.routing";



@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    InicioComponent,
    PiepaginaComponent,
    CarruzelComponent,
    RegistroComponent,
    IniciarSesionComponent,
    ProductosComponent

  ],
  imports: [
    BrowserModule,
    rutas_encabezado,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
