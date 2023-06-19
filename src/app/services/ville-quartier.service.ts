import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VilleQuartierService {

  Url = environment.url + "/ville_quartier";
  constructor(private http: HttpClient) { }

  getVilles() {
    return this.http.get(this.Url + '/getVilles')
  }

  getQuartierByVille(data){
    return this.http.post(this.Url + '/getQuartierByVille', data)
  }

  getVille(){
    return this.http.get(this.Url + '/getVille')
  }

}
