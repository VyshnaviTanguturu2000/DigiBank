import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AppGuard } from './app.guard';
import { Home1Component } from './home1/home1.component';
//import { AccountSummaryComponent } from './AccountSummary/AccountSummary.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'login',component:LoginComponent },
{path:'home',component:Home1Component,canActivate:[AppGuard]},
{path:'accountSummary',component:AccountSummaryComponent},
{path:'accountDetails/:AccountNumber',component:AccountDetailsComponent},
{path:'transfer/:AccountNumber',component:TransferComponent}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
