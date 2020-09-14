//Importar modulos del router de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Importar componentes
import { InicioComponent } from "./components/inicio/inicio.component";

//Array de rutas
const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: '**', component: InicioComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
