//IMPORTS NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventsComponent } from './components/events/events.component';


//GUARD

//DEFINIR RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'events', component: EventsComponent}
];

//EXPORTAR CONFIG
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);