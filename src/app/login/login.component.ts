import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import{FormGroup,FormBuilder} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm !:FormGroup;
  constructor(private appService:AppService,private router:Router,private formBuilder:FormBuilder,private http:HttpClient,
    private matSnack:MatSnackBar){}
  username:string='';
  pswd:any;
  currValue:any;
  userDefinedMap: { [key: string]: string } = {
    "INDIA": "INR",
    "USA": "USD"
};
  ngOnInit(){
    this.loginForm=this.formBuilder.group({
      userId:[''],
      pswd:[''],
      
    })
  }
  ToggleLogin(){
    if(this.appService.redirectUrl){
      this.router.navigate([this.appService.redirectUrl]);
      this.appService.redirectUrl='';
    }else{
      this.router.navigate(['/accountSummary']);
    }
  }
  login(){
     this.http.get<any>("http://localhost:3000/users").subscribe(res =>{
      const user=res.find((a:any)=>{
       
        return a.userId === this.loginForm.value.userId && a.pswd===this.loginForm.value.pswd
      });
      if(user){
        console.log('this.loginForm.value.cur',this.loginForm.value.cur);
        this.appService.curValue= this.userDefinedMap[user.region];
        console.log('this.appService.curValue',this.appService.curValue);
      //  alert('You logged in succesfully');
        this.loginForm.reset();
        this.appService.isLogged=true;
        this.appService.userId=user.userId;
        this.appService.userName=user.userName;
        this.ToggleLogin();
      }
      else{
        alert('user not found');
      }
     },err=>{
      alert('something went wrong');
     })
  }
}
