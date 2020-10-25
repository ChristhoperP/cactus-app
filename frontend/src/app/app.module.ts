import { BrowserModule } from '@angular/platform-browser';
//modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

//Graficos
import { ChartsModule } from 'ng2-charts';

//cargar JS
import {ServAdminService}  from "./servicios/administrador/serv-admin.service"


//componentes
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/compartidos/encabezado/encabezado.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PiepaginaComponent } from './componentes/compartidos/piepagina/piepagina.component';
import { CarruzelComponent } from './componentes/compartidos/carruzel/carruzel.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PromocionComponent } from './componentes/promocion/promocion.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { CarruselPromoComponent } from './componentes/compartidos/carrusel-promo/carrusel-promo.component';

//servicios
import { AuthService } from "./servicios/auth.service";
import { TokenInterceptorService } from "./servicios/token-interceptor.service";
import { AuthGuard } from './servicios/guards/auth.guard';
import { NoAuthGuard } from "./servicios/guards/no-auth.guard";
import { IsAdminGuard } from './servicios/guards/is-admin.guard';
import { PeticionesService } from "./servicios/peticiones.service";
import { UploadService } from "./servicios/upload.service";


//Formularios
import { RegistroComponent } from './componentes/registro/registro.component';

//Rutas
import { rutas_encabezado, appRoutingProviders} from "./app.routing";
import { EncabezadoAdminComponent } from './componentes/administrador/encabezado-admin/encabezado-admin.component';
import { ControladorAdminComponent } from './componentes/administrador/controlador-admin/controlador-admin.component';
import { InventarioComponent } from './componentes/administrador/inventario/inventario.component';
import { ModificarProductoComponent } from './componentes/administrador/modificar-producto/modificar-producto.component';
import { FotoModProductoComponent } from './componentes/administrador/foto-mod-producto/foto-mod-producto.component';
import { AgregarProductoComponent } from './componentes/administrador/agregar-producto/agregar-producto.component';
import { InicioAdminComponent } from './componentes/administrador/inicio-admin/inicio-admin.component';
import { GraficoComponent } from './componentes/administrador/grafico/grafico.component';
import { FiltroUsuarioPipe } from './pipes/filtro-usuario.pipe';
import { UsuariosComponent } from './componentes/administrador/usuarios/usuarios.component';
import { ActualizarUsuarioComponent } from './componentes/actualizar-usuario/actualizar-usuario.component';


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
    CarruselPromoComponent,
    PerfilComponent,
    EncabezadoAdminComponent,
    ControladorAdminComponent,
    InventarioComponent,
    ModificarProductoComponent,
    FotoModProductoComponent,
    AgregarProductoComponent,
    InicioAdminComponent,
    GraficoComponent,
    FiltroUsuarioPipe,
    UsuariosComponent,
    ActualizarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    rutas_encabezado,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    NoAuthGuard,
    IsAdminGuard,
    AuthService,
    PeticionesService,
    ServAdminService,
    UploadService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
