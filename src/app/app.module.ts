import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Home1Component } from './home1/home1.component';
import { MatCardModule } from '@angular/material/card';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule } from '@angular/material/paginator';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransferComponent } from './transfer/transfer.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatSidenavModule} from '@angular/material/sidenav';
import{MatIconModule} from '@angular/material/icon';
import{MatListModule} from '@angular/material/list';
import {NgFor} from '@angular/common';
import{MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DatePipe } from '@angular/common';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NavComponent } from './nav/nav.component';
import { CurrencyPipe } from '@angular/common';
import{MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   // AccountSummary,
    Home1Component,
   AccountSummaryComponent,
   AccountDetailsComponent,
   TransferComponent,
   SidenavComponent,
   PopUpComponent,
   NavComponent,
  
  //  LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [DatePipe,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
