import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendeurStatisticsService {
  url = environment.url
  constructor(private http:HttpClient) {}
  getOrdersByDay(data){
    return this.http.post(this.url+"/orders/getOrdersByDay", data)
  }
  
}
