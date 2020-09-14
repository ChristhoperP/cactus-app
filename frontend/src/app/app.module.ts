import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from "./app.routing";//Es necesario para el routing
import { HttpClientModule } from "@angular/common/http";//Es necesario para peticiones externas

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    routing,//Parte del routing
    HttpClientModule //Parte de las peticiones
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
