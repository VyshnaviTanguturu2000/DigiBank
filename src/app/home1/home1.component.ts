import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component {
  confirm(){
    const confirmation=window.confirm('Are you sure you wish to navigate away');
    console.log('confirmation',confirmation);
    return of(confirmation);
   }
}
