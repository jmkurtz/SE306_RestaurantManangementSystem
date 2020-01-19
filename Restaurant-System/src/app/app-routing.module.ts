import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSystemComponent } from './login-system/login-system.component';
import { RegSystemComponent } from './reg-system/reg-system.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { InventorySysComponent } from './inventory-sys/inventory-sys.component';
import { ReservationSysComponent } from './reservation-sys/reservation-sys.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CustReservationComponent } from './cust-reservation/cust-reservation.component';

const routes: Routes = [
  {path:'', redirectTo:'/homepage', pathMatch:'full'},
  {path:'menu', component: MenuComponent},
  {path:'inventory', component: InventorySysComponent},
  {path:'reservation', component: ReservationSysComponent},
  {path:'customer-reservation', component: CustReservationComponent},
  {path:'homepage', component: HomepageComponent},
  {path:'contact-us', component: ContactUsComponent},
  {path:'about', component: AboutComponent},
  {path:'account', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
