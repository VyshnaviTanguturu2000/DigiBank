import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AccountSummary } from '../accountSummary';
import { CurrencyPipe } from '@angular/common';
import{MatSnackBarModule} from '@angular/material/snack-bar';
@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent {
  constructor(private http:HttpClient,private appService:AppService,private router:Router){}
  accounts!:[];
  data:any;
  user:any;
  curr: string | undefined;
  username=this.appService.userName;
  currValue=this.appService.curValue;
  public dataSource = new MatTableDataSource<AccountSummary>();
  public displayedColumns = ['AccountNumber','AccountType','Balance'
];
//  Id=this.appService.userId;
  ngOnInit(){
   const Id=this.appService.userId;
    this.curr=this.appService.curValue;
   const url ='http://localhost:3000/UserAccounts?userid='+Id;
   console.log('url',url);
  this.http.get(url).subscribe((res)=>{
    this.data = res;
    this.dataSource.data = res as AccountSummary[];
    console.log(this.data)
  })
}
todetails(accNo:any){

  console.log('accNo in summary',accNo);
  const url ='http://localhost:3000/UserAccounts?AccountNumber=accNo';
  console.log(url,'url');
 this.http.get(url).subscribe((res)=>{
   this.data = res;
   console.log(this.data)
 })
// on click action
this.router.navigate(['/accountDetails',+accNo]);
  
}
logout(){
  console.log('inside logout');
  this.router.navigateByUrl('/login');
}
}
