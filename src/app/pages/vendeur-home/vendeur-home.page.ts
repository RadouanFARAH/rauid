import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation,GeolocationOptions } from '@ionic-native/geolocation/ngx';

import { SharedService } from '../../shared.service';

import { MenuController, ModalController } from '@ionic/angular';
import { RejetsPage } from 'src/app/modals/rejets/rejets.page';
import { ParametresService } from 'src/app/services/parametres.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastService } from 'src/app/toasts/toast.service';

@Component({
  selector: 'app-vendeur-home',
  templateUrl: './vendeur-home.page.html',
  styleUrls: ['./vendeur-home.page.scss'],
})
export class VendeurHomePage implements OnInit {
  other_places = false;
  data = {
    jour: new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long' }),
    zone: "",
    responsable: "",
    vendeur: "",
    noteJour: null,
    noteJour_other_places: null,
    nbrTotalConso: null,
    nbrTotalConso_other_places: null,
    consoValide: null,
    consoValide_other_places: null,
    consoAttente: null,
    consoRefuse: null,
    demandeR: [],
    demandeA: [],
    demandeV: [],
    demandeV_other_places: []
  }
  isShow: boolean = false;
  numClickMenu: number = 0;
  userID: any;
  tapped: boolean;
  demandeR: boolean;
  demandeV: boolean;
  demandeA: boolean;
  dashboard: boolean;
  demandeV_other_places: boolean;
  canshowlocation: boolean;
  unit: string='m';
  lat: number;
  lng: number;
  source: string;
  destination: string;

  constructor( private toast: ToastService,private launchnavigator: LaunchNavigator,private sharedService: SharedService,private geolocation: Geolocation,private router: ActivatedRoute, private route: Router, public modalController: ModalController, private menu: MenuController, private paramService: ParametresService) { }


  async openRejectConsumerModal(id) {
    const modal = await this.modalController.create({
      component: RejetsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idconsommateur: id
      }
    });
    await modal.present();
  }
  navigate(longitude, latitude) {
    console.log("ready to navigate ..");
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => {
          if (result.hasPermission) {
              this.geolocation.getCurrentPosition().then((resp) => {
                console.log(resp.coords);
                this.lat = resp.coords.latitude
                this.lng = resp.coords.longitude
                this.source = this.lat+','+ this.lng
                let options: LaunchNavigatorOptions = {
                    start: this.source,
                    app: this.launchnavigator.APP.GOOGLE_MAPS
                };
                this.destination = latitude+','+longitude
                console.log("navigating ...", options.start , '---> ', this.destination);
                
                this.launchnavigator.navigate(this.destination, options).then((value)=>{
                  console.log("navigating success");
                  
                }).catch((err)=>{
                  console.log("nvaigating error ", err);
                  
                })
            }).catch((error) => {
              console.log(error);
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
                            this.source = this.lat+','+this.lng
                            let options: LaunchNavigatorOptions = {
                                start: this.source,
                                app: this.launchnavigator.APP.GOOGLE_MAPS
                            };
                            this.destination = latitude +','+ longitude
                            console.log("navigating ...", options.start , '---> ', this.destination);
                            
                            this.launchnavigator.navigate(this.destination, options).then((value)=>{
                              console.log("navigating success");
                              
                            }).catch((err)=>{
                              console.log("nvaigating error ", err);
                              
                            })
                        }).catch((error) => {
                          console.log(error);
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
  getDashboard() {
    this.data.demandeR = []
    this.data.demandeV = []
    this.data  = {
      jour: new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long' }),
      zone: "",
      responsable: "",
      vendeur: "",
      noteJour: null,
      noteJour_other_places: null,
      nbrTotalConso: null,
      nbrTotalConso_other_places: null,
      consoValide: null,
      consoValide_other_places: null,
      consoAttente: null,
      consoRefuse: null,
      demandeR: [],
      demandeA: [],
      demandeV: [],
      demandeV_other_places: []
    }
    this.data.demandeA = []
    this.paramService.getVendeur_dashboard({ other_places: false }).subscribe((result: any) => {
      this.dashboard = true
      this.data.zone = result[0].zone
      this.data.responsable = result[0].responsable
      this.data.vendeur = result[0].vendeur
      this.data.nbrTotalConso = result[0].nbrTotalConso
      this.data.consoValide = result[0].consoValide
      this.data.consoAttente = result[0].consoAttente
      this.data.consoRefuse = result[0].consoRefuse
    }, err => {
      this.dashboard = false
    })
    this.getAll();
  }
  getDashboardOther_places() {
    this.data.demandeV_other_places = [];
    this.dashboard = false;
    this.data.nbrTotalConso_other_places = 0
    this.data.consoValide_other_places = []
    this.paramService.getVendeur_dashboard({ other_places: true }).subscribe((result: any) => {
      this.dashboard = true;
      this.data.nbrTotalConso_other_places = result[0].nbrTotalConso;
      this.data.consoValide_other_places = result[0].consoValide;
    })
    this.getConsoValide(true)
  }
  ngOnInit() {
    this.sharedService.variableValue$.subscribe((value) => {
      console.log('Variable value changed:', value);
      this.canshowlocation = value
    });
  }
  ionViewWillEnter() {
    this.menu.enable(true, 'vendeur-menu')
    this.refresh_variables()
    this.getDashboard()
    this.getDashboardOther_places()
  }
  ionViewWillLeave() {
    this.menu.enable(false, 'vendeur-menu')
  }
  doRefresh(event) {
    this.refresh_variables()
    this.getDashboard()
    this.getDashboardOther_places()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  passOrder() {
    this.route.navigate(["categories"])
  }

  refresh_variables(){
    this.other_places = false;
    this.data = {
      jour: new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long' }),
      zone: "",
      responsable: "",
      vendeur: "",
      noteJour: null,
      noteJour_other_places: null,
      nbrTotalConso: null,
      nbrTotalConso_other_places: null,
      consoValide: null,
      consoValide_other_places: null,
      consoAttente: null,
      consoRefuse: null,
      demandeR: [],
      demandeA: [],
      demandeV: [],
      demandeV_other_places: []
    }
    this.isShow = false;
    this.numClickMenu = 0;
    this.tapped= false;
    this.demandeR=false;
    this.demandeV=false;
    this.demandeA=false;
    this.dashboard=false;
    this.demandeV_other_places = false;
  
  }

  async calculateDistance(latitude: number, longitude: number) {
    return new Promise((resolve, reject)=>{

      const options: GeolocationOptions = {
        enableHighAccuracy: true,
      };
  
      this.geolocation.getCurrentPosition(options).then((position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        console.log("coordonnées :",currentLatitude, currentLongitude,latitude,longitude );
        
        const distance = this.getDistanceFromLatLonInKm(
          currentLatitude,
          currentLongitude,
          latitude,
          longitude
        );
          resolve(distance)
        console.log('Distance:', distance);
      }).catch((error) => {
        resolve(0)
        console.log('Error getting current position', error);
      });
    })


  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c * 1000;
    
    if (distance > 1000){
      distance = distance/1000
      this.unit =  'Km'
    } // Distance in km
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }


  getAll() {
    this.data.demandeR = []
    this.data.demandeV = []
    this.data.demandeA = []
    this.data.demandeV_other_places = []
    this.data.noteJour_other_places = null
    this.data.noteJour = null;
    this.demandeR = true
    this.demandeV = true
    this.demandeA = true
    this.paramService.getconsoAttente().subscribe((result: any) => {
      this.tapped = true
      result.forEach(async (row) => {
        console.log("********************** row:",row);
        if (this.canshowlocation){
          var distance = await this.calculateDistance(row.lat, row.lng)
          row.distance = distance
        }
        this.data.demandeA.push(row)

        
      })
    })
    this.paramService.consoRefuse().subscribe((result: any) => {
      this.tapped = true
      result.forEach((row) => {
        this.data.demandeR.push(row)
      })
    })
    this.getConsoValide(false)
  }
  getConsoValide(other_places) {
    this.data.demandeV_other_places = []
    this.data.noteJour_other_places = null
    this.data.demandeV =[]
    this.data.demandeV_other_places = []
    this.data.noteJour = null;
    this.paramService.getconsovalide({ other_places }).subscribe((result: any) => {
      this.tapped = true
      for (let i = 0; i < result.length; i++) {
        other_places ? this.data.demandeV_other_places.push(result[i]) : this.data.demandeV.push(result[i])
      }
      if (this.data.demandeV_other_places.length) for (let i = 0; i < this.data.demandeV_other_places.length; i++) {

        let idconsommateur = this.data.demandeV_other_places[i].idConsommateur
        
        this.paramService.sellerGainFromClientToday({ idconsommateur }).subscribe((res) => {
          this.data.demandeV_other_places[i].pointtotal = res
          this.data.noteJour_other_places += res

        })
      }
      if (this.data.demandeV.length) for (let i = 0; i < result.length; i++) {
        let idconsommateur = this.data.demandeV[i].idConsommateur
        this.data.noteJour = null;

        this.paramService.sellerGainFromClientToday({ idconsommateur }).subscribe((res) => {
          this.data.demandeV[i].pointtotal = res
          this.data.noteJour += res

        })
      }

    })
  }
  waitingOrder() {
    this.demandeR = false
    this.demandeV = false
    this.demandeA = true
  }
  refusedOrder() {
    this.demandeR = true
    this.demandeV = false
    this.demandeA = false
  }
  didOrder() {
    this.demandeR = false
    this.demandeV = true
    this.demandeA = false
  }
  didOrder_other_places() {
    this.demandeV_other_places = true
  }

}
