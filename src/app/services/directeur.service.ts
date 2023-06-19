import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirecteurService {
  url = environment.url

  constructor(private http: HttpClient, private storage: Storage) { }


 getResponsableByDirecteur() {
    return this.http.get(this.url + '/directeur/getResponsableByDirecteur')
  }
  deleteProduct(data) {
    return this.http.post(this.url + '/product/deleteProduct', data)
  }
}
