// Importar modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './servicios/guards/auth.guard';
import { NoAuthGuard } from './servicios/guards/no-auth.guard';
import { IsAdminGuard } from './servicios/guards/is-admin.guard';



// Importar componentes
import { InicioComponent } from './componentes/inicio/inicio.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {IniciarSesionComponent} from './componentes/iniciar-sesion/iniciar-sesion.component';
import {ProductosComponent} from './componentes/productos/productos.component';
import { PromocionComponent } from './componentes/promocion/promocion.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ControladorAdminComponent } from './componentes/administrador/controlador-admin/controlador-admin.component';
import { InventarioComponent } from './componentes/administrador/inventario/inventario.component';
import { InicioAdminComponent } from './componentes/administrador/inicio-admin/inicio-admin.component';
import { UsuariosComponent } from './componentes/administrador/usuarios/usuarios.component';
import { PromocionesComponent } from './componentes/administrador/promociones/promociones.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { NoAdminGuard } from './servicios/guards/no-admin.guard';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { HistorialComprasComponent } from './componentes/historial-compras/historial-compras.component';
import { InformacionPagoComponent } from './componentes/proceso-pago/informacion-pago/informacion-pago.component';
import { ReportesComponent } from './componentes/administrador/reportes/reportes.component';
import { DetallePedidoComponent } from './componentes/administrador/detalle-pedido/detalle-pedido.component';
import { PedidosComponent } from './componentes/administrador/pedidos/pedidos.component';



// Array de rutas
const appRoutes: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            {path: '', redirectTo: 'inicio', pathMatch: 'full'},
            {path: 'inicio', component: InicioComponent},
            {path: 'productos', component: ProductosComponent, canActivate: [NoAdminGuard]},
            {path: 'productos/:id', component: ProductosComponent, canActivate: [NoAdminGuard]},
            {path: 'promocion', component: PromocionComponent, canActivate: [NoAdminGuard]},
            {path: 'informacion', component: InformacionComponent, canActivate: [NoAdminGuard]},
            {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard, NoAdminGuard]},
            {path: 'historial-compra', component: HistorialComprasComponent, canActivate: [AuthGuard, NoAdminGuard]},
            {path: 'detalle/:id', component: DetalleProductoComponent,canActivate: [NoAdminGuard]},
            {path: 'informacionPago', component: InformacionPagoComponent, canActivate: [AuthGuard, NoAdminGuard]}
        ]
    },
    {path: 'iniciar-sesion', component: IniciarSesionComponent, canActivate: [NoAuthGuard]},
    {path: 'registro', component: RegistroComponent, canActivate: [NoAuthGuard]},
    {
        path: 'controlador-admin',
        component: ControladorAdminComponent,
        children: [
            {path: 'inicioadmin', component: InicioAdminComponent},
            {path: 'inventario', component: InventarioComponent},
            {path: 'usuarios', component: UsuariosComponent},
            {path: 'promociones', component: PromocionesComponent},
            {path: 'reportes', component: ReportesComponent},
            {path: 'pedidos', component: PedidosComponent},
            {path: '**', component: InicioAdminComponent}
        ],
        canActivate: [AuthGuard, IsAdminGuard]
    },
    {path: 'carrito', component: CarritoComponent},
    {path: '**', component: InicioComponent}
];

// Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const rutas_encabezado: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
