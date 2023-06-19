import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url=environment.url
  constructor(private http:HttpClient) { }

  getProductsBySeller(){
    return this.http.get(this.url+"/product/getProductsBySeller")
  }
  toggelappear(data){
    return this.http.post(this.url+"/product/toggelappear",data)
  }
}
