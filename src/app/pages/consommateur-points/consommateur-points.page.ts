import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-consommateur-points',
  templateUrl: './consommateur-points.page.html',
  styleUrls: ['./consommateur-points.page.scss'],
})
export class ConsommateurPointsPage implements OnInit {

  constructor(private paramServices: ParametresService, private navCtrl:NavController) {
    this.getMyOrders();
  }

  ngOnInit() {
  }

  data: any = [];
  pointSomme = 0;
  goBack() {
    this.navCtrl.back();
  }
  getMyOrders() {
    this.paramServices.getHistoryOrdersConso({id:null}).subscribe(result => {
      this.data = result;
      this.data.forEach(d => {
        d.datecommande = (d.datecommande).slice(0, 10);
        if (d.rejet==0)this.pointSomme += d.pointtotal
      });
    })
  }

}
