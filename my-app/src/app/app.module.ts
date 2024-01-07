import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { CitySalesPieComponent } from './city-sales-pie/city-sales-pie.component';
import { StoreSalesComponent } from './store-sales/store-sales.component';
import { FormSalesComponent } from './form-sales/form-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesChartComponent,
    CitySalesPieComponent,
    StoreSalesComponent,
    FormSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
