import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  url = environment.url
  constructor(private http: HttpClient, private storage: Storage) {} 
  getVendeurByReponsableByDay() {
    return this.http.get(this.url + '/responsable/getVendeurByReponsableByDay')
  }
  
  getVendeurByResponsable(data){
    return this.http.post(this.url+"/vendeur_dashboard/getVendeurByResponsable",data)
  }

  getVendeurById(id){
    return this.http.post(this.url+"/vendeur_dashboard/getVendeurById",{id})

  }

  changeResponsableVendeur(data){
    return this.http.post(this.url+"/responsable/changeResponsableVendeur",data)
  }

  getNbrClients(data) {
    return this.http.post(this.url + "/responsable/getNbrClients", data)
  }
}
