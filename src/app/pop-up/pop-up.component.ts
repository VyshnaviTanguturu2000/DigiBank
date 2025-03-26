import { Component,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  amount:any;
  number:any;
  data1:any;
  accNo:any;
  curr=this.appService.curValue;
error=false;
constructor(@Inject(MAT_DIALOG_DATA) public data:any,private router:Router,private route:ActivatedRoute,private appService:AppService){
this.data1=data;
this.error=this.data1.error;
this.accNo=this.data1.accNo;

}

redirect(){
  this.router.navigate(['../../accountDetails/'+this.accNo], { relativeTo: this.route });
  
 }

}

