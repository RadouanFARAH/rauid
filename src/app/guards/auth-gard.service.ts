import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ParametresService } from './../services/parametres.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private paramService: ParametresService) { }

  canActivate() {
    var token = this.paramService.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
