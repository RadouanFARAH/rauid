import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ResponsableService } from 'src/app/services/responsable.service';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';
import { ToastService } from 'src/app/toasts/toast.service';
import { ActionSheetController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';
@Component({
  selector: 'app-responsable-home',
  templateUrl: './responsable-home.page.html',
  styleUrls: ['./responsable-home.page.scss'],
})
export class ResponsableHomePage implements OnInit {

  url = environment.url;
  data = {
    jour: "الخميس",
    zone: "حي رحمة 1",
    responsable: "عمر",
    vendeur: "عبد القادر",
    noteJour: 1200,
    nbrTotalConso: 500,
    consoValide: 450,
    consoAttente: 48,
    consoRefuse: 2,
    demande: []
  }

  data2 = []

  isShow: boolean = false;
  numClickMenu: number = 0;
  detail: boolean = false;
  role: string;
  sellerData: any;
  dataDay: any[];
  orders: number;
  prixtotal: number;
  pointtotal: number;
  spinner: boolean;
  selectedSegment: string="today";
  arrdays: any;
  arrmonths: any;
  productIDs: any[];
  arrmonths2 = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]

  constructor(private stats: VendeurStatisticsService, private actionSheetCtrl: ActionSheetController, private toast: ToastService, private route: Router, private storage: Storage, private userService: UserService, private menu: MenuController, private responsableService: ResponsableService, private router: Router) {
    this.data.jour = new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long' });
    this.getVendeurByResponsable()
    this.storage.get('role').then((role) => {

      if (role) {
        this.role = role
      }
    })
  }
  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'تحرير البائعr',
      buttons: [
        {
          text: 'تحرير',
          handler: () => {

          }
        },
      ],
    });
    actionSheet.present();
  }

  doRefresh(event) {
    this.getVendeurByResponsable()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {
  }
  async segmentChanged(id) {
    let orders = [];
    let ordersDetails = [];
    let products = [];
    let productIDs = [];
    let numProductIDs = [];
    let prixtotal = 0
    let pointtotal = 0
    this.dataDay = []
    this.dataDay = []
    this.orders = 0
    this.prixtotal = 0
    this.pointtotal = 0
    this.spinner = true
   
   return new Promise((resolve, reject)=>{
    this.stats.getOrdersByDay({ today: this.selectedSegment == "today", yesterday: this.selectedSegment == "yesterday", role: this.role, all: true, id }).subscribe((res: any) => {
      this.arrdays = res["pastDays"]
      this.arrmonths = res["pastMonths"]
      this.spinner = false
      for (let i = 0; i < res.result.length; i++) {
        if (!orders.includes(res.result[i].codecommande)) {
          orders.push(res.result[i].codecommande)
          products.push(res.result[i])
        }
        if (!numProductIDs.includes(res.result[i].idproduct)) {
          numProductIDs.push(res.result[i].idproduct)
        }

      }

      console.log("products:", products);

      for (let i = 0; i < products.length; i++) {
        prixtotal += products[i].prixtotal
        pointtotal += products[i].pointtotal_v
      }
      this.dataDay = products
      this.dataDay = productIDs
      this.productIDs = productIDs
      this.productIDs = numProductIDs
      if (this.selectedSegment == "yesterday") {
        let dataDay = new Array(this.arrdays.length)
        dataDay.fill({ point_v: 0, prixfinal: 0 })
        for (let i = 0; i < productIDs.length; i++) {
          let index = this.arrdays.indexOf(productIDs[i])
          dataDay[index] = products[i]
        }
        this.dataDay = dataDay
      }
      if (this.selectedSegment == "monthsbefore") {
        let dataDay = new Array(this.arrmonths.length)
        dataDay.fill({ point_v: 0, prixfinal: 0 })
        for (let i = 0; i < productIDs.length; i++) {
          let index = this.arrmonths.indexOf(productIDs[i])
          dataDay[index] = products[i]
        }

        this.dataDay = dataDay
      }
      this.orders = orders.length
      resolve({
        prixtotal: parseFloat(prixtotal.toFixed(2)),
        pointtotal: parseFloat(pointtotal.toFixed(2)),
        orders: orders
      })
    })
   }) 

  }

  getVendeurByResponsable() {
    this.responsableService.getVendeurByReponsableByDay().subscribe({
      next: async (res: any) => {
        this.data2 = res
        for (let index = 0; index < this.data2.length; index++) {
          const element = this.data2[index];

          var stats:any = await this.segmentChanged(element.id)
          console.log(element.id, " stats ", stats);
          
          this.data2[index].pointtotal = stats.pointtotal
          this.data2[index].prixtotal = stats.prixtotal
          this.data2[index].orders = stats.orders
        }
        this.sellerData = res
      },
      error: err => {
        console.log(err);
      }
    })
  }
  ionViewWillEnter() {
    this.menu.enable(true, 'responsable-menu')
  }
  ionViewWillLeave() {
    this.menu.enable(false, 'responsable-menu')
  }
  goToUpdateUser(d) {
    this.route.navigate(['logregister'], { queryParams: { data: JSON.stringify(d) } })
  }
  async goTo(vendeur) {
    this.role = await this.storage.get('role')
    if (this.role == 'R') {
      this.userService.login({ vendeur }).subscribe({
        next: async (res: any) => {
          await this.storage.set('token', res.token)
          this.route.navigate(["vendeur-home"])
        }, error: (err) => {
          this.toast.presentErrorToast('', 3000)
        }
      })
    }
  }

}
