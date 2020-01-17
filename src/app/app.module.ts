import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

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
import { ProfileComponent } from './components/profile/profile.component';
import { CarnetComponent } from './reports/carnet/carnet.component';



import { AuthService } from './services/auth.service';
import { IdentityGuard } from './services/identity.guard';
import { LoginDisabled } from './services/login-disabled.guard';
import { BeerService } from './services/beer.service';
import { QuoteService } from './services/quote.service';
import { PlaceService } from './services/places.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CRUDService } from './services/crud.service';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersComponent } from './components/users/users.component';
import { StoreComponent } from './components/store/store.component';
import { SPaymentsComponent } from './components/s-payments/s-payments.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { UserService } from './services/user.service';
import { SellTicketComponent } from './components/sell-ticket/sell-ticket.component';
import { OffersComponent } from './components/offers/offers.component';
import { RolComponent } from './components/rol/rol.component';

import { OrdersSuppliersComponent } from './components/orders-suppliers/orders-suppliers.component';


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
    ProfileComponent,
    UsersComponent,
    StoreComponent,
    SPaymentsComponent,
    AsistenciaComponent,
    SellTicketComponent,
    OffersComponent,
    RolComponent,
    SPaymentsComponent,
    OrdersSuppliersComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot(),
    MatDatepickerModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    IdentityGuard,
    LoginDisabled,
    BeerService,
    QuoteService,
    PlaceService,
    CRUDService,
    UserService,

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
