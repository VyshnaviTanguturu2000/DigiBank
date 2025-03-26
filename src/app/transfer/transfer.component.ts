import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  animations:[
    trigger('itemAnime',[
      transition('void => *',[
        style({
          height:0,
          opacity:0,
          transform:'scale(0.85)',
          'margin-bottom':0,
          paddingTop:0,
          paddingRight:0,
          paddingLeft:0,
          paddingBottom:0
        }),
        animate('1000ms',style({
          height:'*',
          'margin-bottom':'*',
          paddingTop:'*',
          paddingRight:'*',
          paddingLeft:'*',
          paddingBottom:'*'
        })),
        animate(200)
      ])
    ])
  ]
})
export class TransferComponent {
  constructor(private appService:AppService,private http:HttpClient,public datepipe: DatePipe,private activatedRoute:ActivatedRoute,
    private dialogRef:MatDialog,private router:Router){

  }
error=false;
errorS='';
field=true;
accForm:any={};
accList:any;
payeeList:any;
acc:any;
acc1:any;
balance:any;
show=false;
otherOwnBalance=0;
own=false;
username=this.appService.userName;
ngOnInit(){
 // showTransferMethods();
  const Id=this.appService.userId;
  const id = this.activatedRoute.snapshot.params['AccountNumber'];
  console.log('id in transfer page',id);
  if(id==0){
    this.field=false;
  }
   const url ='http://localhost:3000/UserAccounts?userid='+Id;
   console.log('url',url);
  this.http.get(url).subscribe((res)=>{
    this.accList = res;
    console.log(this.accList);
    this.accForm.AccountNumber=id;
   // this.accForm.Narration= this.accForm.Narration.toString();
    console.log(' this.accForm.AccountNumber', this.accForm.AccountNumber);
  })
  // const url1='http://localhost:3000/payeeAccounts';
  // this.http.get(url1).subscribe((res)=>{
  //   this.payeeList = res;
  //   console.log(this.payeeList);
  //  // this.accForm.Narration= this.accForm.Narration.toString();
  // })
}
transferSelfAccount(){
  this.show=true;
  this.own=true;
  const Id=this.appService.userId;
  const url ='http://localhost:3000/UserAccounts?userid='+Id;
   console.log('url',url);
  this.http.get(url).subscribe((res)=>{
    this.payeeList = res;
    console.log(this.payeeList);})
}
transferTPAccount(){
  this.show=true;
  const url1='http://localhost:3000/payeeAccounts';
  this.http.get(url1).subscribe((res)=>{
    this.payeeList = res;
    console.log(this.payeeList);
  })
}
transfer(){
  
  console.log('this.accForm.AccountNumber',this.accForm.AccountNumber);
  const url1 ='http://localhost:3000/UserAccounts?AccountNumber='+this.accForm.AccountNumber;
  console.log('url1',url1);
  this.http.get(url1).subscribe((res)=>{
    console.log('res',res);
    this.acc = res;
    console.log('this.acc',this.acc);
    this.accForm.Deposit=0;
    this.accForm.ReferenceNo=Math.floor(Math.random() * 100) ;
   // this.balance=this.acc[0].Balance;
    console.log('this.acc[0].Balance',this.acc[0].Balance);
    console.log('this.accForm.Withdrawl',this.accForm.Withdrawl);
    this.accForm.Withdrawl=Number( this.accForm.Withdrawl);
    console.log('inside validate');
  console.log('this.acc.Balance',this.balance);
  if(this.accForm.Withdrawl>this.acc[0].Balance){
   this.errorS='Amount to be transferred exceeds current balance';
   this.error=true;
   this.openDialog();
   return;
  }
  if(this.accForm.Withdrawl<1){
    this.errorS='Transaction Amount cannot be less than 1';
    this.error=true;
    this.openDialog();
    return;
   }
   if(this.accForm.Withdrawl>1000000){
    this.errorS='Transaction Amount cannot be greater than 1000000';
    this.error=true;
    this.openDialog();
    return;
   }
    this.accForm.Balance=this.acc[0].Balance-this.accForm.Withdrawl;
  //  this.accForm.Date=new Date(this.accForm.Date);
    this.accForm.Date =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    console.log('this.accForm.Narration',this.accForm.Narration);
    console.log(' this.accForm.ReferenceNo', this.accForm.ReferenceNo);
    console.log(' this.accForm.Balance', this.accForm.Balance);
    console.log('this.accForm.value',this.accForm.value);
    console.log('this.accForm',this.accForm);
    this.accForm.id=Math.random();
    this.http.post<any>("http://localhost:3000/transactions",{id:this.accForm.id,AccountNumber:this.accForm.AccountNumber,Date: this.accForm.Date,Narration:this.accForm.Narration,
    ReferenceNo:this.accForm.ReferenceNo,Withdrawl:this.accForm.Withdrawl,Deposit:this.accForm.Deposit,Balance:this.accForm.Balance})
    .subscribe((res)=>{
     // alert("Transaction succesful");
      this.openDialog();
    },err=>{
      alert('something went wrong');
     })
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.patch<any>('http://localhost:3000/UserAccounts/'+this.acc[0].id,JSON.stringify({Balance:this.accForm.Balance}),httpOptions)
    .subscribe((res)=>{
    // console.log('updated in accounts');
    },err=>{
      alert('something went wrong in patch');
     })
     if(this.own){
      console.log('inside own account update');
      const url1 ='http://localhost:3000/UserAccounts?AccountNumber='+this.accForm.Narration;
      console.log('url1',url1);
      this.http.get(url1).subscribe((res1)=>{
        console.log('res1',res1);
        this.acc1 = res1;
        this.acc1[0].Balance+= this.accForm.Withdrawl;
        console.log('id:',this.accForm.id,'AccountNumber:',this.accForm.Narration,'Date:', this.accForm.Date,'Narration:',this.accForm.AccountNumber,
          'ReferenceNo:',this.accForm.ReferenceNo,'Deposit:',this.accForm.Withdrawl,'Withdrawl:',this.accForm.Deposit,'Balance:',this.otherOwnBalance);
        this.http.post<any>("http://localhost:3000/transactions",{id:this.accForm.id+1,AccountNumber:this.accForm.Narration,Date: this.accForm.Date,Narration:this.accForm.AccountNumber,
        ReferenceNo:this.accForm.ReferenceNo,Deposit:this.accForm.Withdrawl,Withdrawl:this.accForm.Deposit,Balance:this.acc1[0].Balance})
        .subscribe((res)=>{
        //  alert("post in own account succesful");
        //  this.openDialog();
        },err=>{
          alert('something went wrong');
         })
         this.http.patch<any>('http://localhost:3000/UserAccounts/'+this.acc1[0].id,JSON.stringify({Balance:this.acc1[0].Balance}),httpOptions)
    .subscribe((res)=>{
    // console.log('updated in accounts');
    },err=>{
      alert('something went wrong in patch');
     })})
      //   this.otherOwnBalance+=this.accForm.Withdrawl;
      // this.http.post<any>("http://localhost:3000/transactions",{id:this.accForm.id,AccountNumber:this.accForm.Narration,Date: this.accForm.Date,Narration:this.accForm.AccountNumber,
      // ReferenceNo:this.accForm.ReferenceNo,Deposit:this.accForm.Withdrawl,Withdrawl:this.accForm.Deposit,Balance:this.otherOwnBalance})
      // .subscribe((res)=>{
      //   alert("post in own account succesful");
      // //  this.openDialog();
      // },err=>{
      //   alert('something went wrong');
      //  })
      }
   
  })

  // if(this.own){
  //   console.log('inside own account update');
  //   const url1 ='http://localhost:3000/UserAccounts?AccountNumber='+this.accForm.Narration;
  //   console.log('url1',url1);
  //   this.http.get(url1).subscribe((res)=>{
  //     console.log('res',res);
  //     this.acc1 = res;})
  //     this.acc1[0].Balance+=this.accForm.Withdrawl;
  //   this.http.post<any>("http://localhost:3000/transactions",{id:this.accForm.id,AccountNumber:this.accForm.Narration,Date: this.accForm.Date,Narration:this.accForm.AccountNumber,
  //   ReferenceNo:this.accForm.ReferenceNo,Deposit:this.accForm.Withdrawl,Withdrawl:this.accForm.Deposit,Balance:this.acc1[0].Balance})
  //   .subscribe((res)=>{
  //     alert("post in own account succesful");
  //   //  this.openDialog();
  //   },err=>{
  //     alert('something went wrong');
  //    })
  //}
  // this.accForm.Deposit=0;
  // this.accForm.ReferenceNo="11234";
  // this.accForm.Balance=this.acc.Balance-this.accForm.Withdrawl;

  // this.http.post<any>("http://localhost:3000/transactions",this.accForm);
 
}

 validate(){
  console.log('inside validate');
  console.log('this.accForm.Amount',this.accForm.Amount);
  console.log('this.acc.Balance',this.balance);
  if(this.accForm.Amount>this.balance){
   this.errorS='Amount to be transferred exceeds current balance';
   this.error=true;
 
  }
 
}
openDialog(){
  this.dialogRef.open(PopUpComponent,{width:'700px',height:'400px',
    data:{
         amount:this.accForm.Withdrawl,
         number:this.accForm.Narration,
         accNo:this.accForm.AccountNumber,
         error:this.error,
         errorS:this.errorS
    }});
}
logout(){
  console.log('inside logout');
  this.router.navigateByUrl('/login');
}
}
