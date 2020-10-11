//Importar modulos del router de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Importar componentes
import { InicioComponent } from "./componentes/inicio/inicio.component";
import {RegistroComponent} from "./componentes/registro/registro.component";
import {IniciarSesionComponent} from "./componentes/iniciar-sesion/iniciar-sesion.component";
import {ProductosComponent} from "./componentes/productos/productos.component";
import { PromocionComponent } from './componentes/promocion/promocion.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';

//Array de rutas
const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'iniciar-sesion', component: IniciarSesionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'promocion', component: PromocionComponent},
    {path: 'informacion', component: InformacionComponent},
    {path: '**', component: InicioComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[]=[];
export const rutas_encabezado: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
// export const APP_ROUTING = RouterModule.forRoot(appRoutes);
