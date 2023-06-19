import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';

@Component({
  selector: 'app-consommateur-demandehistorique',
  templateUrl: './consommateur-demandehistorique.page.html',
  styleUrls: ['./consommateur-demandehistorique.page.scss'],
})
export class ConsommateurDemandehistoriquePage implements OnInit {
  idConsommateur: any;

  constructor(private paramServices: ParametresService,private loadingCtrl:LoadingController, private navCtrl:NavController, private ActiveRoute:ActivatedRoute) {
    this.ActiveRoute.params.subscribe((params)=>{
      
      if (params.id){
        this.idConsommateur = params.id
      }
    })
    this.getMyOrders();
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.ActiveRoute.params.subscribe((params)=>{
      if (params.id){
        this.idConsommateur = params.id
      }
    })
  }
  goBack() {
    this.navCtrl.back();
  }
  data: any = [];
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'جار التحميل ...',
      duration: 3000,
      cssClass: 'custom-loading',
    });

    loading.present();
  }
  getMyOrders() {
    this.ActiveRoute.params.subscribe(async (params)=>{
      console.log(params);

        this.idConsommateur = params.id
        const loading = await this.loadingCtrl.create({
          message: 'جار التحميل ...',
          duration: 3000,
          cssClass: 'custom-loading',
        });
    
        loading.present();
        this.paramServices.getHistoryOrdersConso({id: params.id}).subscribe(result => {
          loading.dismiss()
          this.data = result;
          this.data.forEach(d => {
            d.datecommande = (d.datecommande).slice(0, 10)
          });
        })
      
    })

  }

}
