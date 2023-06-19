import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { RejetsPage } from 'src/app/modals/rejets/rejets.page';
import { CallNumberService } from 'src/app/services/call-number.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { ParametresService } from 'src/app/services/parametres.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'app-vendeur-demande-conso',
  templateUrl: './vendeur-demande-conso.page.html',
  styleUrls: ['./vendeur-demande-conso.page.scss'],
})
export class VendeurDemandeConsoPage implements OnInit {

  feedbacks: any = [];
  feedback: string = "";
  giver_id: any;
  receiver_id: any;
  coordinate: { lat: any; lng: any; };
  lat: number;
  lng: number;
  source: number[];
  destination: any[];
  insertFeedback() {
    if (this.feedback) {
      this.userService.insertFeedback({ feedback_text: this.feedback, receiver_id: this.data.id, giver_id: this.giver_id }).subscribe({ next: (ok) => {this.toast.presentSuccessToast("", 5000);this.getFeedbacks({ id: this.receiver_id });this.feedback=""}, error: (e) => this.toast.presentErrorToast("", 5000) })
    }
  }
  data1 = {
    nom: "",
    typeStore: "",
    nameStore: "",
    adresse: "",
    numPhone: "",
    numWhatsapp: "",
    email: "",
    id: "",
    quartier: ""
  }

  data2 = {
    id: "",
    date: "",
    note: 0,
    prix: 0
  }
  d: any;
  data: any;
  role: string;
  link: string;
  order_details: any = [];
getFeedbacks(data){
  this.userService.getFeedbacks(data).subscribe({
    next: (v) => this.feedbacks = v,
    error: (e) => console.error("e:", e),
  });
}
  constructor(private launchnavigator: LaunchNavigator,private geolocation: Geolocation,private paramService: ParametresService, private goelocal: Geolocation, private navCtrl: NavController, private toast: ToastService, private route: Router, private storage: Storage, private userService: UserService, private router: ActivatedRoute, private callNumber: CallNumberService, private modalController: ModalController, private activeRoute: ActivatedRoute) {
    this.storage.get('role').then((role) => {
      if (role) {
        this.role = role
      }
    })
    this.storage.get('id').then((id) => {
      if (id) {
        this.giver_id = id
      }
    })
    this.activeRoute.params.subscribe((params) => {
      console.log("params 1 :", params);
      this.data = params
      this.receiver_id = params.id
      this.coordinate = {
        lat: params.lat,
        lng: params.lng
    }
      this.getFeedbacks({ id: params.id })
      this.data1.nom = params.nomprenom;
      this.data1.typeStore = params.typeStore;
      this.data1.nameStore = params.nameStore;
      this.data1.adresse = params.adresseentreprise;
      this.data1.numPhone = params.tel;
      this.data1.numWhatsapp = params.whatsapp;
      this.data1.email = params.email;
      this.data2.id = params.codecommande;
      this.data1.id = params.id;
      this.userService.getQuartierByUser({ user: params.id }).subscribe((quartier: any) => {
        if (quartier) {
          this.data1.quartier = quartier
        } else {
          this.data1.quartier = "لم يحدد بعد"
        }
      })
      this.data2.date = params.datecommande;
      this.data2.note = params.pointtotal;
      this.data2.prix = params.prixtotal;
    })
  }
  goBack() {
    this.navCtrl.back();
  }
  goToUpdateUser() {
    this.route.navigate(['logregister'], { queryParams: { data: JSON.stringify(this.data) } })
  }
  navigate() {
    console.log("ready to navigate ..");
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => {
          if (result.hasPermission) {
              this.geolocation.getCurrentPosition().then((resp) => {
                console.log(resp.coords);
                this.lat = resp.coords.latitude
                this.lng = resp.coords.longitude
                this.source = [this.lat, this.lng]
                let options: LaunchNavigatorOptions = {
                    start: this.source,
                    app: this.launchnavigator.APP.GOOGLE_MAPS
                };
                this.destination = [this.coordinate.lat, this.coordinate.lng]
                console.log("navigating ...");
                
                this.launchnavigator.navigate(this.destination, options).then((value)=>{
                  console.log("navigating success");
                  
                }).catch((err)=>{
                  console.log("nvaigating error ", err);
                  
                })
            }).catch((error) => {
              console.log(error);
                this.toast.presentErrorToast('', 5000)
            });
          } else {
              AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
              .then(
                  (result) => {
                      if (result.hasPermission) {
                          this.geolocation.getCurrentPosition().then((resp) => {
                            console.log(resp.coords);
                            this.lat = resp.coords.latitude
                            this.lng = resp.coords.longitude
                            this.source = [this.lat, this.lng]
                            let options: LaunchNavigatorOptions = {
                                start: this.source,
                                app: this.launchnavigator.APP.GOOGLE_MAPS
                            };
                            this.destination = [this.coordinate.lat, this.coordinate.lng]
                            console.log("navigating ...");
                            
                            this.launchnavigator.navigate(this.destination, options).then((value)=>{
                              console.log("navigating success");
                              
                            }).catch((err)=>{
                              console.log("nvaigating error ", err);
                              
                            })
                        }).catch((error) => {
                          console.log(error);
                            this.toast.presentErrorToast('', 5000)
                        });
                      } else {
                        this.toast.presentErrorToast('يرجى تفعيل GPS الخاص بك ',3000)
                      }
                  },
                  error => {
                      this.toast.presentErrorToast('يرجى تفعيل GPS الخاص بك ',3000)
                  }
              );
          }
      },
      err => { alert(err); }
  );


}

  ngOnInit() {
    this.router.params.subscribe((params: any) => {
      if (params) {
        this.d = params
        console.log("params :", params);
        if (params.codecommande) {

          this.paramService.getOrderDetails({ code: params.codecommande }).subscribe((res: any) => {
            this.goelocal.getCurrentPosition().then((result) => {
              this.link = `https://www.google.com/maps/dir/${result.coords.latitude},${result.coords.longitude}/${res[0].lat},${res[0].lng}`;

            })
          })
        }

      }
    })
  }


  goTo(consommateur) {
    if (this.role == 'V' || this.role == 'R') this.userService.login({ consommateur }).subscribe(async (res: any) => {
      await this.storage.set('token', res.token)
      this.route.navigate(["/categories"])
    }, (err) => {
      this.toast.presentErrorToast('', 3000)
    })
  }
  call(number) {
    this.callNumber.call(number)
  }


  async openRejectConsumerModal(id) {

    const modal = await this.modalController.create({
      component: RejetsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idconsommateur: id
      }
    });
    return await modal.present();
  }
}
