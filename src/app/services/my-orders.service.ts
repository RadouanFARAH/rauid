import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  Url = environment.url+"/orders";
  cart_quantity = new BehaviorSubject(0)
  product_quantity = new BehaviorSubject(0)
  delivery_type = new BehaviorSubject('standard')
  

  myCart = new BehaviorSubject([])
  constructor(public http: HttpClient) {
    this.myCart.subscribe((data)=>{
      console.log('myCart changed ...');
      
      let special = ''
      for (let i = 0; i<data.length; i++){
        let product = data[i]
        if (product.special) {
          special = 'special'
        }
      }
      if (special){
        this.delivery_type.next('special')
      }else{
        this.delivery_type.next('standard')
      }
    })
   }

  
  calculate_quantity(){
    let qte = 0
    for (let i =0; i<this.myCart.value.length; i++){
      qte = qte + this.myCart.value[i].quantite
    }
    this.cart_quantity.next(this.myCart.value.length)

  }
  get_product_quantity(productID){
    let qte = 0
    for (let i =0; i<this.myCart.value.length; i++){
      if (this.myCart.value[i].id == productID) qte = this.myCart.value[i].quantite
    }
    return qte
  }
  addProductToOrder(product) {
    let data = this.myCart.value
    data.push(product)

    this.myCart.next(data);
    this.calculate_quantity()
  }
  removeProductFromOrder(indice) {
    let data = this.myCart.value
    data.splice(indice, 1);
    this.myCart.next(data)
    this.calculate_quantity()
  }
  increaseOrderQuantity(indice){
    let data = this.myCart.value
    data[indice].quantite =data[indice].quantite + 1
    this.myCart.next(data)
    this.calculate_quantity()
  }
  decreaseOrderQuantity(indice){
    let data = this.myCart.value
    data[indice].quantite =data[indice].quantite - 1
    this.myCart.next(data)
    this.calculate_quantity()
  }

  sendOrder(order) {
    return this.http.post(this.Url + '/setOrdersConsommateur', order)
  }

}
