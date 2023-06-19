import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ParametresService } from 'src/app/services/parametres.service';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { ToastService } from 'src/app/toasts/toast.service';

@Component({
    selector: 'app-vendeur-demandedetail',
    templateUrl: './vendeur-demandedetail.page.html',
    styleUrls: ['./vendeur-demandedetail.page.scss'],
})
export class VendeurDemandedetailPage implements OnInit {

    apiKey = environment.APIkey;
    @ViewChild("maps") mapRef: ElementRef;
    map: GoogleMap;
    order_details = [];
    url = environment.url
    link = 'https://www.google.com/maps/dir/lat,lng/lat,lng'
    currentlng: number;
    currentlat: number;
    coordinate: { lat: any; lng: any; };
    code: any;
    lat: number;
    lng: number;
    somme: number=0;
    printing: boolean;

    constructor(private toast: ToastService, private loadingCtrl: LoadingController, private geolocation: Geolocation, private printer: Printer, private launchnavigator: LaunchNavigator, private goelocal: Geolocation, private navCtrl: NavController, private activeRoute: ActivatedRoute, private paramService: ParametresService) {
        this.activeRoute.params.subscribe((params) => {
            this.code = params.code;
            this.link = params.link;
            this.parametrage()
        })

    }
  
    source: any = [0, 0] // source lat,long
    destination: any = [23.022505, 72.571362] // dest lat,long
 
    navigate() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude
            this.lng = resp.coords.longitude
            this.source = [this.lat, this.lng]
            let options: LaunchNavigatorOptions = {
                start: this.source,
                app: this.launchnavigator.APP.GOOGLE_MAPS
            };
            this.destination = [this.order_details[0].lat, this.order_details[0].lng]
            this.launchnavigator.navigate(this.destination, options)
        }).catch((error) => {
            this.toast.presentErrorToast('', 5000)
        });

    }
      
  printPage() {
    this.printing = true;
    let content = document.getElementById('printer').innerHTML;
    let css = '<style>.cssInfos .cssLibel,.cssQte{font-size:16px;margin-left:10px}.cssCard2,.cssCard2 .cssTitleCard,.cssQte{background:#0dafaf}.cssHeight{width:100%}.cssProduct{display:grid;grid-template-columns:20% 55% 25%}.cssProduct2{display:grid;grid-template-columns:50% 50%}.cssProduct .cssImg,.cssProduct2 .cssImg{overflow:overlay;width:75px;height:75px;border-radius:50%;position:relative;top:50%;transform:translateY(-50%);border:1px solid #d4d4d4}.cssProduct .cssImg img,.cssProduct2 .cssImg img{width:100%;height:100%;border-radius:50%}.cssInfos p{margin:0;color:#964a4a}.cssInfos .cssValue{font-size:14px}.cssInfos .cssCode{font-size:12px}.cssQte{padding:5px 4px 2px!important;color:#fff;font-weight:600;border-radius:4px}.cssInfos{padding:2px;margin-right:12px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}.cssNumber{font-size:10px!important}.cssNumber span{font-size:17px!important}.cssCard1,.cssCard2{width:94%;margin:24px auto 2px;padding:6px 2px;color:#fff;border-radius:10px}.cssTitleCard{display:inline;padding:6px 14px;border:2px solid #fafafa;border-radius:18px;font-size:15px;position:relative;top:-20px;left:14px}.cssCard1{color:#444}.cssCard1 .cssTitleCard{background:#eadede;color:#444}.cssContentCard2{margin-bottom:-200px}.cssContentCard div{margin-top:4px}.cssContentCard .cssLibel{font-size:15px;margin-left:10px;margin-top:8px}.cssContentCard .cssValue{font-size:17px}.cssCard2Infos,.cssContentCard .cssNum{display:flex;justify-content:space-between;align-items:center}.cssContentCard .cssNum .cssValue{direction:rtl;font-size:19px}.cssContentCard .cssNum .cssBtn{margin-top:8px!important;height:42px!important;width:100%;font-size:13px;--background:#fff!important;color:#fff;--border-radius:21px!important;border:none}.cssContentCard .cssNum .cssBtn img{width:22px;height:22px;margin-right:8px}.cssDate{position:absolute;left:20px;top:30px;font-size:14px;color:#fafafa}.cssBtn2,.cssBtn3{height:50px!important;font-size:20px;color:#444;padding:0 5px!important}.cssCard2Infos .cssLibel{text-align:center;font-size:15px!important;margin:2px 0!important}.cssCard2Infos .cssValue{font-size:18px!important;font-weight:600;margin:2px 0;text-align:center}.cssBtns{width:94%;margin:8px auto 0}.cssBtn2{width:100%;--background:#f1f2f6!important;border-radius:6px;border:none}.cssBtn3{width:100%;--background:#c8c8c9!important;border-radius:6px;border:none}.cssBtn4,.cssBtn5{margin-top:12px;height:42px!important;width:90%;font-size:17px;--background:#f0344c!important;color:#fff;--border-radius:6px!important;border:none;padding:0 5px!important}.cssBtn5{--background:#eadede!important;color:#f0344c}.cssHeader .h_2 div,.cssTotal{background:rgba(13,175,175,.1);border-radius:5px}.cssTotal{display:flex;justify-content:space-around;justify-items:center}.cssTotal .cssLibel{font-size:12px;text-align:center;margin:5px}.cssTotal .cssValue{font-size:22px;text-align:center;margin:5px}.cssFacture{width:94%;margin:10px auto;height:150px}.cssHeader{border-radius:5px;height:100%!important;padding:8px!important}.cssHeader .h_1{display:flex;justify-content:space-between;justify-items:center;margin-bottom:10px}.cssHeader .h_1 p{margin-bottom:0;margin-top:8px}.cssHeader .h_1 .logo{overflow:overlay;width:65px;height:65px;border-radius:50%}.cssHeader .h_1 .logo img{width:100%;height:100%}.cssHeader .h_2{display:flex;justify-content:space-between;justify-items:center}.cssHeader .h_2 div{width:32%!important;padding:5px}.cssHeader .h_2 p{margin:0;text-align:center;font-size:13px}@media only screen and (max-width:362px){.cssProduct,.cssProduct2{height:100px!important}.cssInfos{margin-right:12px}.cssInfos .cssLibel{font-size:13px;margin-left:10px}.cssCard1,.cssCard2{margin-top:20px;padding:6px 10 0;border-radius:5px}.cssCard11{margin:5px auto;height:85px}.cssTitleCard{font-size:12px;position:relative;top:-16px}.cssTitleCard span{position:relative;top:-6px}.cssContentCard{position:relative;top:-14px}.cssContentCard div{margin-top:4px}.cssContentCard .cssLibel{font-size:12px;margin-left:10px;margin-top:8px}.cssContentCard .cssValue,.cssDate{font-size:13px}.cssContentCard .cssNum{display:flex;justify-content:space-between;align-items:center}.cssContentCard .cssNum .cssValue{direction:rtl;font-size:15px}.cssContentCard .cssNum .cssBtn{height:38px!important;width:100%;font-size:11px;--border-radius:19px!important;border:none}.cssContentCard .cssNum .cssBtn img{width:20px;height:20px;margin-right:8px}.cssCard2{height:90px}.cssCard2Infos{margin-top:8px!important}.cssDate{position:absolute;left:0;top:-22px;color:#fafafa}.cssCard2Infos .cssLibel{font-size:12px!important;text-align:center}.cssCard2Infos .cssValue{font-size:15px!important}.cssBtn2,.cssBtn3{margin-top:0!important;height:44px!important;font-size:17px;--border-radius:4px!important}.cssFacture{width:96%;margin:6px auto;height:120px}.cssHeader .h_1{margin-bottom:12px}.cssHeader .h_1 p{margin-top:6px;font-size:12px}.cssHeader .h_1 .logo{overflow:overlay;width:40px;height:40px}.cssHeader .h_2 p{margin:0;text-align:center;font-size:11px}.cssProduct{display:grid;grid-template-columns:20% 60% 20%}.cssProduct2{display:grid;grid-template-columns:50% 50%}.cssProduct .cssImg,.cssProduct2 .cssImg{width:60px;height:60px}.cssInfos p{margin:0;color:#333}.cssInfos .cssValue{font-size:12px}.cssInfos .cssCode{font-size:11px}.cssQte{font-size:15px}.cssNumber{font-size:10px!important}.cssNumber span{font-size:16px!important}}.cssBtnWhats{--background:rgb(19, 187, 19)}.cssCard11{margin:0 auto}capacitor-google-map{display:inline-block;width:100%;height:100%}.cssCard111{padding:0!important}@media print{.cssCard111,ion-button{display:none}}</style>'
    const options: PrintOptions = {
      name: 'My Document',
      duplex: true,
      orientation:"portrait",
      monochrome:true
    };

    this.printer.print(content+css, options)
      .then(() => this.printing = false)
      .catch((error) => this.printing = false);
  }
    print(code) {
        window.print()
        
    }
    ngOnInit() {
    }
    doRefresh(event) {
        this.parametrage()
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }
    goBack() {
        this.navCtrl.back();
    }

    public toFloat(value: string): number {
        return parseFloat(value);
    }
    ionViewWillEnter() {
    }
    ionViewDidEnter() {

    }
    async parametrage() {
        const loading = await this.loadingCtrl.create({
            message: 'جار التحميل ...',
            duration: 3000,
            cssClass: 'custom-loading',
        });

        loading.present();
        this.paramService.getOrderDetails({ code: this.code }).subscribe((res: any) => {
            loading.dismiss();
            console.log("yyyyyyyyyyyyyyyy",res);
            
            this.order_details = res
            let somme  = 0
            for (let index = 0; index < this.order_details.length; index++) {
                const element = this.order_details[index];
                somme += (element.prixunite * element.quantite)
            }
            this.somme  = somme
            this.coordinate = {
                lat: this.order_details[0].lat,
                lng: this.order_details[0].lng
            }
        })
    }
}
