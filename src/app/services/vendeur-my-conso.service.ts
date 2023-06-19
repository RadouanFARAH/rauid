import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendeurMyConsoService {
  setVilleQuartier(data) {
    return this.http.post(this.url+'/ville_quartier/setVilleQuartier',data)
  }
  url = environment.url
  constructor(private http:HttpClient) { }
  getConsoTotal(data){
    return this.http.post(this.url+'/vendeur_dashboard/getConsoTotal',data)
  }
  getZones(){
    return this.http.get(this.url+'/vendeur_dashboard/getZones')
  }
  getConsoByZone(data){
    return this.http.post(this.url+'/vendeur_dashboard/getConsoByZone',data)
  }
  setVendeurDayZone(data){
    return this.http.post(this.url+'/vendeur_dashboard/setVendeurDayZone',data)
  }
  getVendeurDayZone(data){
    return this.http.post(this.url+'/vendeur_dashboard/getVendeurDayZone',data)
  }
}
