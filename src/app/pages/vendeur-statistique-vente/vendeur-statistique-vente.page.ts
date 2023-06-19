import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';

@Component({
  selector: 'app-vendeur-statistique-vente',
  templateUrl: './vendeur-statistique-vente.page.html',
  styleUrls: ['./vendeur-statistique-vente.page.scss'],
})
export class VendeurStatistiqueVentePage implements OnInit {

  dataDay = []
  selectedSegment = "today";
  orders: any;
  prixtotal: number;
  pointtotal: number;
  dataDays: any[];
  role: any;
  arrmonths: any = []
  arrmonths2 = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  arrdays: any = [];
  productIDs: any[] = [];
  spinner: boolean;
  points_goal: any;
  orders_goal: any;
  numProductIDs: any[] = [];
  constructor(private userService: UserService, private stats: VendeurStatisticsService, private storage: Storage, private navCtrl: NavController) {
    this.storage.get('role').then((role) => {
      console.log(role);

      if (role) {
        this.role = role
        if (this.role == 'V') {
          this.getGoal()
        }
      }
    })

  }
  getGoal() {
    this.userService.getGoal().subscribe((goal: any) => {
      this.points_goal = goal.points
      this.orders_goal = goal.orders
    })
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.segmentChanged()
  }
  segmentChanged() {
    let orders = [];
    let ordersDetails = [];
    let products = [];
    let productIDs = [];
    let numProductIDs = [];
    let prixtotal = 0
    let pointtotal = 0
    this.dataDay = []
    this.dataDays = []
    this.orders = 0
    this.prixtotal = 0
    this.pointtotal = 0
    this.spinner = true
    this.stats.getOrdersByDay({ today: this.selectedSegment == "today", yesterday: this.selectedSegment == "yesterday", role: this.role }).subscribe((res: any) => {
      this.arrdays = res["pastDays"]
      this.arrmonths = res["pastMonths"]
      this.spinner = false
      for (let i = 0; i < res.result.length; i++) {
        if (!orders.includes(res.result[i].codecommande)) {
          orders.push(res.result[i].codecommande)
          ordersDetails.push(res.result[i])
        }
        if (!numProductIDs.includes(res.result[i].idproduct)) {
          numProductIDs.push(res.result[i].idproduct)
        }

      }
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
      }
      console.log("selected segment ", this.selectedSegment);
      
      if (this.selectedSegment == "today") {
        for (let i = 0; i < res.result.length; i++) {
          const date = new Date();
          const todayFormattedDate = formatDate(date);
          if (!productIDs.includes(res.result[i].idproduct)) {
            if (res.result[i].datecommande.includes(todayFormattedDate)) {
              productIDs.push(res.result[i].idproduct)
              products.push(res.result[i])
            }
          } else {
            if (res.result[i].datecommande.includes(todayFormattedDate)) {
              let index = productIDs.indexOf(res.result[i].idproduct)
              if (res.result[i].nom.includes("سكر قالب 8×2كيلو غرام")) {
                console.log("E : ", products[index].quantite);
              }
              if (res.result[i].nom.includes("سكر قالب 8×2كيلو غرام")) {
                console.log(" + :", res.result[i].quantite);
              }
              products[index].quantite += res.result[i].quantite
              if (res.result[i].nom.includes("سكر قالب 8×2كيلو غرام")) {
                console.log(" = :", products[index].quantite);
              }

            }
          }
        }
      } else if (this.selectedSegment == "yesterday") {
        for (let i = 0; i < ordersDetails.length; i++) {
          if (!productIDs.includes(ordersDetails[i].datecommande)) {
            productIDs.push(ordersDetails[i].datecommande)
            products.push(ordersDetails[i])
          }
          else {
            let index = productIDs.indexOf(ordersDetails[i].datecommande)
            products[index].pointtotal_v += ordersDetails[i].pointtotal_v
            products[index].prixfinal += ordersDetails[i].prixfinal
          }
        }
      } else {
        console.log("ordersDetails:", ordersDetails);

        for (let i = 0; i < ordersDetails.length; i++) {

          if (!productIDs.includes(new Date(ordersDetails[i].datecommande).getMonth())) {
            productIDs.push(new Date(ordersDetails[i].datecommande).getMonth())
            products.push(ordersDetails[i])
          }
          else {
            let index = productIDs.indexOf(new Date(ordersDetails[i].datecommande).getMonth())
            products[index].pointtotal_v += ordersDetails[i].pointtotal_v
            products[index].prixfinal += ordersDetails[i].prixfinal

          }
        }

      }
      console.log("products:", products);

      for (let i = 0; i < products.length; i++) {
        if (this.selectedSegment == "today") {
          prixtotal += products[i].prixfinal * products[i].quantite
          pointtotal += products[i].pointtotal_v
        } else {
          prixtotal += products[i].prixfinal
          pointtotal += products[i].pointtotal_v
        }



      }
      this.dataDay = products
      this.dataDays = productIDs
      this.productIDs = productIDs
      this.numProductIDs = numProductIDs
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
      this.prixtotal = parseFloat(prixtotal.toFixed(2))
      this.pointtotal = parseFloat(pointtotal.toFixed(2))
    })
  }

  goBack() {
    this.navCtrl.back();
  }

}
