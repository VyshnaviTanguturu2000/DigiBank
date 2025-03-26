import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  redirectUrl:string='';
  isLogged: boolean=false;
  userId:string='';
  userName:string='';
  curValue:string='';
  constructor() { }
}
