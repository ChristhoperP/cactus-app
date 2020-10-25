//Importar modulos del router de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { AuthGuard } from './servicios/guards/auth.guard';
import { NoAuthGuard } from './servicios/guards/no-auth.guard';
import { IsAdminGuard } from './servicios/guards/is-admin.guard';



//Importar componentes
import { InicioComponent } from "./componentes/inicio/inicio.component";
import {RegistroComponent} from "./componentes/registro/registro.component";
import {IniciarSesionComponent} from "./componentes/iniciar-sesion/iniciar-sesion.component";
import {ProductosComponent} from "./componentes/productos/productos.component";
import { PromocionComponent } from './componentes/promocion/promocion.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ControladorAdminComponent } from './componentes/administrador/controlador-admin/controlador-admin.component';
import { InventarioComponent } from './componentes/administrador/inventario/inventario.component';
import { InicioAdminComponent } from './componentes/administrador/inicio-admin/inicio-admin.component';





//Array de rutas
const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'iniciar-sesion', component: IniciarSesionComponent, canActivate: [NoAuthGuard]},
    {path: 'registro', component: RegistroComponent, canActivate: [NoAuthGuard]}, 
    {path: 'productos', component: ProductosComponent},
    {path: 'promocion', component: PromocionComponent},
    {path: 'informacion', component: InformacionComponent},
    {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    {
        path: 'controlador-admin',
        component: ControladorAdminComponent,
        children: [
            {path: 'inicioadmin', component: InicioAdminComponent},
            {path: 'inventario', component: InventarioComponent},
            {path: '**', component: InicioAdminComponent}
        ],
        canActivate: [AuthGuard, IsAdminGuard]
    },
    {path: '**', component: InicioComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[]=[];
export const rutas_encabezado: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
