import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CallNumberService } from 'src/app/services/call-number.service';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { ParametresService } from 'src/app/services/parametres.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {


  imgs = []
  data = {
    productInfos: {
      nom: "",
      prixInitial: 0,
      prixFinal: 0,
      prixspecial: 0,
      deliveryPrice:0,
      category: "",
      description: "",
      special:false,
      reduction:"",
      point_c:null,
      point_v:null,
      quantity:0
    },
    vendeurInfos: {
      nom: "",
      tel: ""
    }
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  qte: number = 0;
  commandeNum: number = 0;
  isProductExitsInOrder: boolean = false;
  product: any;
  url=environment.url
  added: boolean;
  enableToOrder: boolean;
  constructor(private toastService:ToastService,private navCtrl:NavController,private callNumber:CallNumberService,private activeRouter: ActivatedRoute, private orderService: MyOrdersService, private paramService:ParametresService) {
    this.orderService.calculate_quantity()
    this.commandeNum = this.orderService.cart_quantity.value
    this.orderService.cart_quantity.subscribe((qte)=>{
      this.commandeNum = qte
    })
 
    this.activeRouter.queryParams.subscribe(params => {
      this.imgs.push(this.url+'/images/image_'+params.code+'.png')
      this.paramService.getUrls({code:params.code}).subscribe({next:(res:any)=>{
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          console.log("res:",res);

          this.imgs.push(element)
          console.log("this.imgs:",this.imgs);
          
        }
      }})

      this.product = params
      this.data = {
        
        productInfos: {
          nom: params.nom,
          prixInitial: params.prixinitial,
          prixFinal: params.prixfinal,
          deliveryPrice: params.deliveryPrice,
          category: params.categorie,
          description: params.description,
          special:params.special,
          prixspecial:params.prixspecial,
          reduction:params.reduction,
          point_c:params.point_c,
          point_v:params.point_v,
          quantity:params.quantity
        },
        vendeurInfos: {
          nom: params.nomprenom,
          tel: params.tel
        }
      }

    })

  }
  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }
  call(number){
   this.callNumber.call(number);
  }
  ionViewWillEnter(){
   this.qte = this.orderService.get_product_quantity(this.product.id)
   if ((this.product.quantity_type===1 && (this.qte+1)>1 )){
    this.enableToOrder = true
  }
   this.orderService.calculate_quantity()
   this.commandeNum = this.orderService.cart_quantity.value
   this.orderService.cart_quantity.subscribe((qte) => {
     this.commandeNum = qte
   })
  }
  ionViewWillLeave(){
   this.qte = this.orderService.get_product_quantity(this.product.id)
   this.orderService.calculate_quantity()
   this.commandeNum = this.orderService.cart_quantity.value
   this.orderService.cart_quantity.subscribe((qte) => {
     this.commandeNum = qte
   })
  }
  checkProductInOrder(id) {
    for (let i = 0; i < this.orderService.myCart.value.length; i++) {
      if (id == this.orderService.myCart.value[i].id) return {exist:true,index:i}
    }
    return {exist:false, index:0}
  }


 

  
  addQty() {
    
    if ((this.product.quantity_type != 0 && (parseInt(this.product.qte)+1)> this.product.quantity_type_value)){
      this.enableToOrder = true
      this.toastService.presentErrorToast(`لا يمكنك طلب أكثر من ${this.product.quantity_type_value} `, 2000)
    } else{
      this.enableToOrder = false

      if(((this.qte+1) >this.product.quantity)){
        this.enableToOrder = true
        this.toastService.presentErrorToast('لقد تجاوزت الكمية المتوفرة', 2000)
      } else{

        this.enableToOrder = false

        this.qte++
        this.added=true
        let product = { ...this.product, quantite: this.qte }
        if (this.checkProductInOrder(this.product.id).exist){
          this.orderService.increaseOrderQuantity(this.checkProductInOrder(this.product.id).index)
        }else{
          this.orderService.addProductToOrder(product)
        }
      }
  
    }

    
    
  }

  minusQty() {
    this.qte--
    if (this.checkProductInOrder(this.product.id).exist){
      let index = this.checkProductInOrder(this.product.id).index
      let product = this.orderService.myCart.value[index]
      if (product.quantite === 1){
        this.orderService.removeProductFromOrder(index)
        this.added=false
      }else{
        this.orderService.decreaseOrderQuantity(index)
        
      }
    }
    
  }



}
