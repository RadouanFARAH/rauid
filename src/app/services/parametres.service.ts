import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  Url = environment.url;
  constructor(private storage: Storage, public http: HttpClient) { }
   getVendeur_dashboard(data){
    return this.http.post(this.Url + "/vendeur_dashboard", data)
   }
   sellerGainFromClientToday(data){
    return this.http.post(this.Url + "/vendeur_dashboard/sellerGainFromClientToday", data)
   }
   getAppCost(){
    return this.http.get(this.Url + "/user/getAppCost")
   }
   getPercent(){
    return this.http.get(this.Url + "/user/getPercent")
   }
   getDelivery(data){
    return this.http.post(this.Url + "/user/getDelivery",data)
   }
   getDeliveryParams(){
    return this.http.get(this.Url + "/user/getDeliveryParams")
   }
   getUrls(data){
    return this.http.post(this.Url + "/product/getProductImagesURL", data)
   }
   deleteFiles(data){
    return this.http.post(this.Url + "/product/deleteFiles", data)
   }
   setGoal(data){
    return this.http.post(this.Url + "/user/setGoal", data)
   }
   getOrderDetails(data){
    return this.http.post(this.Url + "/orders/getOrderDetails", data)
   }
   getconsovalide(data){
    return this.http.post(this.Url + "/vendeur_dashboard/consoValide",data)
   }
   updateSpecial(data){
    return this.http.post(this.Url + "/product/updateSpecial", data)

   }
   updatePoint(data){
    return this.http.post(this.Url + "/product/updatePoint", data)

   }
   getconsoAttente(){
    return this.http.get(this.Url + "/vendeur_dashboard/consoAttente")
   }
   consoRefuse(){
    return this.http.get(this.Url + "/vendeur_dashboard/consoRefuse")
   }
   getConsoGlobalByQuartier(quartier){
    return this.http.post(this.Url + "/vendeur_dashboard/getConsoGlobalByQuartier", {idquartier:quartier})
   }
   getconsoGlobal(){
    return this.http.get(this.Url + "/vendeur_dashboard/getConsoGlobal")
   }
   sendMofitRejectOreder(data){
    return this.http.post(this.Url + "/vendeur_dashboard/sendMofitRejectOreder", data)
   }
  getCategories() {
    return this.http.get(this.Url + "/category" + "/getCategories")
  }
  specialOrders(){
    return this.http.get(this.Url + "/product" + "/specialOrders")
  }
  getAllCategories() {
    return this.http.get(this.Url + "/category" + "/getAllCategories")
  }

  getProductByCategory(id,special) {
    return this.http.post(this.Url + "/product" + "/getProductByCategory", { id, special })
  }
  getProductByCategoryNameOnly(id,special) {
    return this.http.post(this.Url + "/product" + "/getProductByCategoryNameOnly", { id, special })
  }
  setProduct(data) {
    return this.http.post(this.Url + "/product" + "/putProduct", data)
  }
  updateProduct(data) {
    return this.http.post(this.Url + "/product" + "/updateProduct", data)
  }
  setProductImage(formData){
    return this.http.post(this.Url + "/product" + "/putProductImage", formData)
  }
  setProfileImage(formData){
    return this.http.post(this.Url + "/product" + "/setProfileImage", formData)
  }
  getHistoryOrdersConso(data) {
    return this.http.post(this.Url + "/orders" + "/getOrdersConsommateur", data)
  }
  async getToken() {
    return await this.storage.get('token');


        
  }


}
