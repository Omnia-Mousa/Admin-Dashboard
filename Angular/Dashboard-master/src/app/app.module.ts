import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Routes , RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadComponent } from './shared/head/head.component';
import { HeaderComponent } from './shared/header/header.component';
import { AsideComponent } from './shared/aside/aside.component';
import { MainComponent } from './shared/main/main.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { OrderCrudComponent } from './order-crud/order-crud.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

import { UserCrudService} from '../services/user-crud.service'
import { ProductCrudService } from '../services/product-crud.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule ,  ReactiveFormsModule} from '@angular/forms'
import { AddModalComponent } from './add-modal/add-modal.component'
import { NgxPrintModule } from 'ngx-print'
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LoginComponent } from './login/login.component';
import { AddUsersComponent } from './add-users/add-users.component';
// import { ModalServiceModule  } from 'modal-service'




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeadComponent,
    HeaderComponent,
    AsideComponent,
    MainComponent,
    InvoiceComponent,
    UserCrudComponent,
    ProductCrudComponent,
    OrderCrudComponent,
    CustomerDetailsComponent,
    AddModalComponent,
    SpinnerComponent,
    PieChartComponent,
    BarChartComponent,
    LoginComponent,
    AddUsersComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login' , component: LoginComponent},
      {path: 'dashboard' , component: DashboardComponent},
      {path: 'user' , component: UserCrudComponent},
      {path: 'product' , component: ProductCrudComponent},
      {path: 'order' , component: OrderCrudComponent},
      {path: 'customer' , component: CustomerDetailsComponent},
      {path: 'invoice/:id' , component: InvoiceComponent},
      {path: 'modal' , component: AddModalComponent},
    ]),
    NgbModule,
    ReactiveFormsModule,
    NgxPrintModule,
    ChartsModule,
    BrowserAnimationsModule,
    // ModalServiceModule.forRoot()
  ],
  providers: [
    UserCrudService,
    ProductCrudService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
