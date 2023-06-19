import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { ParametresService } from 'src/app/services/parametres.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  data: any;
  showSuccessAlerte: boolean = false;
  showErrorAlerte: boolean = false;
  totalPoints_v: number = 0;
  totalPoints_c: number = 0;
  totalPrice: number = 0;
  url = environment.url
  app_cost: number = 0;
  percent: number = 0;
  enableToOrder: boolean;
  delivery: number = 0;
  totalPriceSales: number = 0;
  show: boolean;
  off: number = 50
  max: number = 500
  showAwait: boolean;
  isOff: boolean;

  constructor(private toastService: ToastService, private paramService: ParametresService, private navCtrl: NavController, private ref: ChangeDetectorRef, public alertIonic: AlertController, private orderService: MyOrdersService, private activeRouter: ActivatedRoute) {
    this.orderService.myCart.subscribe((data) => {
      console.log("cart data ", data);
      
      this.data = data
      if (this.data.length) {
        this.show = true
      } else {
        this.show = false
      }
    });
  }

  ngOnInit() {
    this.onChangeTotals();
    this.ref.detectChanges();
  }

  goBack() {
    this.navCtrl.back();
  }
  async parametring2() {
    return new Promise((resolve, reject) => {
      this.paramService.getAppCost().subscribe((res: number) => {
        this.app_cost = res
        resolve(true)
      })
    })
  }
  async parametring3() {
    return new Promise((resolve, reject) => {
      this.paramService.getPercent().subscribe((res: number) => {
        this.percent = res
        resolve(true)
      })
    })
  }
  async parametring4() {
    return new Promise((resolve, reject) => {
      this.paramService.getDeliveryParams().subscribe((res: any) => {
        this.max = res.delivery_max
        this.off = res.delivery_percent
        resolve(true)
      })
    })
  }
  async parametring5() {
    return new Promise((resolve, reject) => {
      this.orderService.delivery_type.subscribe((type) => {
        this.paramService.getDelivery({ type }).subscribe((res: number) => {
          this.delivery = res
          resolve(true)
        })
      })
    })
  }
  async ionViewDidEnter() {
    this.showAwait = true



  }

  async doAllSettings(){
    return new Promise(async (resolve,reject)=>{
        let done2 = await this.parametring2()
        let done3 = await this.parametring3()
        let done4 = await this.parametring4()
        let done5 = await this.parametring5()
    
        let done =  done2 && done3 && done4 && done5
        if (done) {
          for (let i = 0; i < this.data.length; i++) {
            this.totalPoints_c += this.data[i].point_c * this.data[i].quantite;
            this.totalPoints_v += this.data[i].point_v * this.data[i].quantite;
            this.totalPriceSales += ((this.data[i].special ? this.data[i].prixspecial : this.data[i].prixfinal) + (this.data[i].special ? 0 : this.data[i].deliveryPrice)) * this.data[i].quantite;
            this.totalPrice += ((this.data[i].special ? this.data[i].prixspecial : this.data[i].prixfinal) + (this.data[i].special ? 0 : this.data[i].deliveryPrice)) * this.data[i].quantite;
          }
          this.showAwait = false
          this.isOff = this.totalPriceSales > this.max;
          let delivery_price = this.totalPriceSales > this.max ? (this.delivery-this.delivery * this.off / 100) : this.delivery;
          this.totalPrice += (this.app_cost || 1) + ((this.totalPrice * (this.percent)) / 100) + (delivery_price)
        }
        resolve('finished')
        console.log("cart data ",this.data);
    })

    
  }

  public toFloat(value: string): number {
    return parseFloat(value);
  }
  addQty(index, product) {
  
    console.log("product.quantity_type :",product.quantity_type, "product.quantity_type_value :", product.quantity_type_value);
    
    if ((product.quantity_type && (product.quantite + 1) > product.quantity_type_value)) {
      this.enableToOrder = true
      this.toastService.presentErrorToast(`لا يمكنك طلب أكثر من ${product.quantity_type_value} `, 2000)
    } else {
      this.enableToOrder = false
      if (((product.quantite + 1) > product.quantity)) {
        this.enableToOrder = true
        this.toastService.presentErrorToast('لقد تجاوزت الكمية المتوفرة', 2000)
      } else {
        this.enableToOrder = false

        this.orderService.increaseOrderQuantity(index)
        this.onChangeTotals();
        this.ref.detectChanges();
      }
    }


  }

  minusQty(index) {
    if (this.data[index].quantite > 1) {
      this.orderService.decreaseOrderQuantity(index)
      this.onChangeTotals();
      this.ref.detectChanges();
    }
  }



  onChangeTotals() {
  
    this.totalPoints_v = 0
    this.totalPoints_c = 0
    this.totalPrice = 0
    this.totalPriceSales = 0
    for (let i = 0; i < this.data.length; i++) {
      this.totalPoints_c += this.data[i].point_v * this.data[i].quantite;
      this.totalPoints_v += this.data[i].point_v * this.data[i].quantite;

      this.totalPrice += ((this.data[i].special ? this.data[i].prixspecial : this.data[i].prixfinal) + (this.data[i].special ? 0 : this.data[i].deliveryPrice)) * this.data[i].quantite;
      this.totalPriceSales += ((this.data[i].special ? this.data[i].prixspecial : this.data[i].prixfinal) + (this.data[i].special ? 0 : this.data[i].deliveryPrice)) * this.data[i].quantite;
    }
    let delivery_price = this.totalPriceSales > this.max ? (this.delivery-this.delivery * this.off / 100) : this.delivery;

    this.totalPrice += (this.app_cost || 1) + ((this.totalPrice * (this.percent)) / 100) + delivery_price
    console.log("this.totalPriceSales ", this.totalPriceSales);
    
    this.isOff = this.totalPriceSales > this.max;
  }

  removeProductFromOrder(index) {
    this.orderService.removeProductFromOrder(index);
    this.onChangeTotals();
    this.ref.detectChanges();
  }


  msg = "سيتم إرسال طلبك إلى البائع الخاص بك، هل أنت متأكد من القيام بالشراء ؟"
  async sendOrder() {
    await this.doAllSettings()
    const alert = await this.alertIonic.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: this.msg,
      buttons: ['إلغاء', {
        text: 'تأكيد',
        handler: () => {

          let order = { order: this.data, prixtotal: this.totalPrice, pointtotal_v: this.totalPoints_v, pointtotal_c:this.totalPoints_c };

          this.orderService.sendOrder(order).subscribe(res => {
            this.orderService.myCart.next([]);
            this.totalPrice = 0
            this.totalPoints_c = 0
            this.totalPoints_v = 0
            this.data = [];
            this.showSuccessAlerte = true;
          }, err => {
            this.toastService.presentErrorToast('', 2000)
          })
        }
      }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
