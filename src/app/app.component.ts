import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appService:AppService,private router:Router){

  }
  title = 'digiBank';
  isLogged=this.appService.isLogged;
  logout(){
    console.log('inside logout');
    this.router.navigateByUrl('/login');
  }
}
