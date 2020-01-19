import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import {FlexLayoutModule } from '@angular/flex-layout';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import { ReservationSysComponent, AddReservation, EditReservation, CheckOutReservation } from './reservation-sys/reservation-sys.component';
import { InventorySysComponent, AddInventoryItem, EditInventoryItem, MeatPrices, MeatPurchase} from './inventory-sys/inventory-sys.component';
import { LoginSystemComponent } from './login-system/login-system.component';
import { RegSystemComponent } from './reg-system/reg-system.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { ContactUsComponent, ThankYouMessage } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CustReservationComponent, CustAddReservation, CustEditReservation } from './cust-reservation/cust-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ReservationSysComponent,
    InventorySysComponent,
    LoginSystemComponent,
    RegSystemComponent,
    HomepageComponent,
    MenuComponent,
    ContactUsComponent,
    AboutComponent,
    AccountComponent,
    AddInventoryItem,
    EditInventoryItem,
    AddReservation,
    EditReservation,
    CustReservationComponent,
    CheckOutReservation,
    CustAddReservation,
    CustEditReservation,
    MeatPrices,
    MeatPurchase,
    ThankYouMessage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    InventorySysComponent, 
    AddInventoryItem,
    LoginSystemComponent,
    RegSystemComponent,
    EditInventoryItem,
    ReservationSysComponent,
    AddReservation,
    EditReservation,
    CheckOutReservation,
    CustAddReservation,
    CustEditReservation,
    MeatPrices,
    MeatPurchase,
    ContactUsComponent,
    ThankYouMessage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

