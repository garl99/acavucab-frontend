import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { DOrdersComponent } from './components/d-orders/d-orders.component';
import { ROrdersComponent } from './components/r-orders/r-orders.component';
import { IOrdersComponent } from './components/i-orders/i-orders.component';
import { QuoteComponent } from './components/quote/quote.component';
import { ProductComponent } from './components/product/product.component';
import { OSuppliersComponent } from './components/o-suppliers/o-suppliers.component';
import { SDealsComponent } from './components/s-deals/s-deals.component';
import { DealsComponent } from './components/deals/deals.component';
import { EventsComponent } from './components/events/events.component';
import { JCustomersComponent } from './components/j-customers/j-customers.component';
import { NCustomersComponent } from './components/n-customers/n-customers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { BeersComponent } from './components/beers/beers.component';
import { AuthService } from './services/auth.service';
import { IdentityGuard } from './services/identity.guard';
import { LoginDisabled } from './services/login-disabled.guard';
import { BeerService } from './services/beer.service';
import { QuoteService } from './services/quote.service';
import { CarnetComponent } from './reports/carnet/carnet.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    ProductsComponent,
    DOrdersComponent,
    ROrdersComponent,
    IOrdersComponent,
    QuoteComponent,
    ProductComponent,
    OSuppliersComponent,
    SDealsComponent,
    DealsComponent,
    EventsComponent,
    JCustomersComponent,
    NCustomersComponent,
    EmployeesComponent,
    SuppliersComponent,
    BeersComponent,
    CarnetComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    DataTablesModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    IdentityGuard,
    LoginDisabled,
    BeerService,
    QuoteService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
