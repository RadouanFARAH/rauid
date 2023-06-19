import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable({
  providedIn: 'root'
})
export class CallNumberService {

  constructor(private callNumber: CallNumber) { }
  call(number){
    this.callNumber.callNumber(number, true)
    .then(res => console.log(''))
    .catch(err => console.log('Error launching dialer', err));
  
  }
}
