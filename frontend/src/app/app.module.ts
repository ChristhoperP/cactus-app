import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/compartidos/encabezado/encabezado.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PiepaginaComponent } from './componentes/compartidos/piepagina/piepagina.component';
import { CarruzelComponent } from './componentes/compartidos/carruzel/carruzel.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';

import { ProductosComponent } from './componentes/productos/productos.component';

import { AuthService } from "./servicios/auth.service";
import { TokenInterceptorService } from "./servicios/token-interceptor.service";


//Formularios
import { RegistroComponent } from './componentes/registro/registro.component';

//Rutas
import { rutas_encabezado, appRoutingProviders} from "./app.routing";
import { PromocionComponent } from './componentes/promocion/promocion.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { CarruselPromoComponent } from './componentes/compartidos/carrusel-promo/carrusel-promo.component';



@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    InicioComponent,
    PiepaginaComponent,
    CarruzelComponent,
    RegistroComponent,
    IniciarSesionComponent,
    ProductosComponent,
    PromocionComponent,
    InformacionComponent,
    CarruselPromoComponent

  ],
  imports: [
    BrowserModule,
    rutas_encabezado,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
