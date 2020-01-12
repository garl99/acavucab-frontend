//IMPORTS NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { DOrdersComponent } from './components/d-orders/d-orders.component';
import { ROrdersComponent } from './components/r-orders/r-orders.component';
import { IOrdersComponent } from './components/i-orders/i-orders.component';
import { BeersComponent } from './components/beers/beers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { JCustomersComponent } from './components/j-customers/j-customers.component';
import { NCustomersComponent } from './components/n-customers/n-customers.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { UsersComponent } from './components/users/users.component';



//GUARD
import { IdentityGuard } from './services/identity.guard';
import { LoginDisabled } from './services/login-disabled.guard';
import { ProductComponent } from './components/product/product.component';
import { QuoteComponent } from './components/quote/quote.component';
import { CarnetComponent } from './reports/carnet/carnet.component';
import { EventsComponent } from './components/events/events.component';
import { StoreComponent } from './components/store/store.component';
import { SellTicketComponent } from './components/sell-ticket/sell-ticket.component';


//DEFINIR RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate:[LoginDisabled]},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate:[IdentityGuard]},
    {path: 'cart', component: CartComponent},
    {path: 'dashboard/all-products', component: ProductsComponent},
    {path: 'd-orders', component: DOrdersComponent},
    {path: 'r-orders', component: ROrdersComponent},
    {path: 'i-orders', component: IOrdersComponent},
    {path: 'dashboard/beers', component: BeersComponent},
    {path: 'dashboard/employees', component: EmployeesComponent},
    {path: 'dashboard/j-customers', component: JCustomersComponent},
    {path: 'dashboard/n-customers', component: NCustomersComponent},
    {path: 'dashboard/suppliers', component: SuppliersComponent},
    {path: 'dashboard/asistence', component: AsistenciaComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'dashboard/quote', component: QuoteComponent},
    {path: 'dashboard/carnet/:id', component: CarnetComponent},
    {path: 'dashboard/profile/:sure', component: DashboardComponent},
    {path: 'dashboard/events', component: EventsComponent},
    {path: 'dashboard/store', component: StoreComponent},
    {path: 'dashboard/sell-ticket', component: SellTicketComponent}
    {path: 'dashboard/user', component: UsersComponent},
    




];

//EXPORTAR CONFIG
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);