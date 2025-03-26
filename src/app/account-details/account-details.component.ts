import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Transaction } from '../transaction';
import { MatTableDataSource } from '@angular/material/table';
//import { MatSort } from '@angular/material/sort';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  AccNO: any;
  data:any;
  data1:any;
  public dataSource = new MatTableDataSource<Transaction>();
  username=this.appService.userName;
  curr='';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 // id:string='';
  constructor(private router: Router,private activatedroute:ActivatedRoute,private http:HttpClient,private appService:AppService,private dialogRef:MatDialog) {
    //username:string='';
  }
  ngOnInit() {
  this.curr=this.appService.curValue;
      const id = this.activatedroute.snapshot.params['AccountNumber'];
      console.log('id',id);
      const url ='http://localhost:3000/Transactions?AccountNumber='+ id;
      console.log(url,'url');
     this.http.get(url).subscribe((res)=>{
      this.dataSource.data = res as Transaction[];
      this.dataSource.data= this.dataSource.data.reverse();
       console.log(this.data);
     })
     const url1 ='http://localhost:3000/UserAccounts?AccountNumber='+ id;
     console.log(url,'url');
    this.http.get(url1).subscribe((res)=>{
      this.data1 = res;
      console.log(this.data1)
    })
}
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}

filterData($event:any){
  this.dataSource.filter=$event.target.value;
  console.log('this.dataSource.filter',this.dataSource.filter);
}
public displayedColumns = ['Date', 'Narration', 'ReferenceNo', 'Withdrawl', 'Deposit', 'Balance'
];
directToTrasfer(accNo:any){
 
    this.router.navigateByUrl('/transfer/'+accNo);
}
logout(){
  console.log('inside logout');
  this.router.navigateByUrl('/login');
}
}


