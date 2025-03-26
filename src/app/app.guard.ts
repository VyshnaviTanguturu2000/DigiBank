import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Home1Component } from './home1/home1.component';
//import { HomeComponent } from './AccountSummary/AccountSummary.component.ts';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate,CanActivateChild,CanDeactivate<Home1Component> {
  constructor(private appService:AppService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    const url=state.url;
    return this.checkLogin(url);
    }

  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.canActivate(next,state);

  }
  canDeactivate(component:Home1Component){
 return component.confirm();
  }
    private checkLogin(url:string):boolean{
         if(this.appService.isLogged){
         return true;
         }
    
    this.appService.redirectUrl=url;
    this.router.navigate(['/login']);
    return false;
        }
  }
  

