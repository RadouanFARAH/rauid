import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UserService } from 'src/app/services/user.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';
import jwtDecode from 'jwt-decode';
import { ToastService } from 'src/app/toasts/toast.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ParametresService } from 'src/app/services/parametres.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-logregister',
  templateUrl: './logregister.page.html',
  styleUrls: ['./logregister.page.scss'],
})
export class LogregisterPage implements OnInit {

  data: FormGroup;
  slideOpts = {
    speed: 400,
    allowSlideNext: false,
    allowSlidePrev: false
  };
  ville: string = "";
  showSuccessAlerte: boolean = false;
  showErrorAlerte: boolean = false;
  genre: any = "";
  role: any = "";
  manChecked: boolean = false;
  womanChecked: boolean = false;
  quartiers: any;
  responsable: any;
  villeDisabled: boolean = true;
  generatePassword: any;
  @ViewChild('slides') slides: IonSlides;
  href: string;
  showSuccessAlerte2: boolean;
  id: any;
  message: string = 'فشل في محاولة التسجيل. المرجو منك إعادة العملية.';
  username: any;
  beingRegistred: boolean = false;
  genPwd: Object;
  spinner: boolean;
  villes: any;
  selectedVille: any;
  lat: any;
  lng: any;
  imageURL: any;
  image: any;
  updateData: any;
  wantedToUpdateCoordinates: any=false;
  constructor(private platform: Platform, private paramService: ParametresService, private geolocation: Geolocation, private sanitizer: DomSanitizer, private toast: ToastService, private storage: Storage, private navCtrl: NavController, private locationService: VilleQuartierService, private fb: FormBuilder, private userService: UserService, private activeRoute: ActivatedRoute, private route: Router) {
    this.storage.get('id').then((id) => {
      this.id = id
    })
    this.storage.get('username').then((username) => {
      this.username = username
    })
    this.activeRoute.queryParams.subscribe((params) => {
      if (
      !params 
      || !(Object.keys(params).length === 0)
      || !(Object.getPrototypeOf(params) === Object.prototype))
      this.updateData = JSON.parse(params.data)

    })
    this.activeRoute.params.subscribe((params) => {

      if (params.ville) {
        this.beingRegistred = false
        this.ville = params.ville;
        let data = {
          ville: params.ville
        }
        this.locationService.getQuartierByVille(data).subscribe((res: any) => {
          this.quartiers = res
          this.data.patchValue({
            adresselogement: [res[0].id]
          })
        }, err => console.log(err))

      } else {
        this.beingRegistred = true
        this.getVilles()
      }
      this.responsable = params.responsable;
      if (params.role){
        this.role = params.role
      }
    })
  }
  getVille() {
    this.generatePassword = true;
    this.locationService.getVille().subscribe((ville: any) => {
      this.ville = ville;
      this.data.patchValue({
        ville: [ville]
      })
      this.villeDisabled = true
      let data = {
        ville
      }
      this.locationService.getQuartierByVille(data).subscribe((res: any) => {
        this.quartiers = res
        this.data.patchValue({
          adresselogement: [res[0].id]
        })
      }, err => console.log(err))
    })
  }
  getVilles() {
    this.generatePassword = true;

    this.locationService.getVilles().subscribe((villes: any) => {
      this.villes = villes;

    })
  }

  getQuartiers() {

    let data = {
      ville: this.data.value.ville
    }

    this.locationService.getQuartierByVille(data).subscribe((res: any) => {
      this.quartiers = res
      this.data.patchValue({
        adresselogement: [res[0].id]
      })
    }, err => console.log(err))
  }

  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords);
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
    console.log("updateData: ",this.updateData);
    
    if (this.updateData) {
      this.data = this.fb.group({
        nomprenom: [this.updateData.nomprenom, Validators.required],
        ville: [this.updateData.ville],
        adresselogement: [this.updateData.adresselogement, Validators.required],
        adresseentreprise: [this.updateData.adresseentreprise],
        tel: [this.updateData.tel, Validators.required],
        whatsapp: [this.updateData.whatsapp, Validators.required],
        email: [this.updateData.email, Validators.email],
        nameStore: [this.updateData.nameStore, Validators.required],
        typeStore: [this.updateData.typeStore, Validators.required],
      })
      this.locationService.getQuartierByVille({ville:this.updateData.ville}).subscribe((res: any) => {
        this.quartiers = res
        this.data.patchValue({
          adresselogement: [parseInt(this.updateData.adresselogement)]
        })
        this.data.patchValue({
          ville: [this.updateData.ville]
        })
      }, err => console.log(err))
    }
    else {
      this.data = this.fb.group({
        nomprenom: ["", Validators.required],
        ville: [this.ville],
        adresselogement: ["", Validators.required],
        adresseentreprise: [""],
        tel: ["", Validators.required],
        whatsapp: ["", Validators.required],
        email: ["", Validators.email],
        nameStore: [""],
        typeStore: [""],
        password: [""]
      })
      this.data.valueChanges.subscribe(()=>{
        console.log("data value:",this.data.value);
        
      })
    }


  }
  toggelwantedToUpdateCoordinates(){
    this.wantedToUpdateCoordinates=!this.wantedToUpdateCoordinates
    if (this.wantedToUpdateCoordinates){
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords);
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  }
  updateUser(){
    this.spinner = true

    let data = this.data.value
    data.id = this.updateData.id
    if (this.wantedToUpdateCoordinates){
      data.lat = this.lat
      data.lng = this.lng
    }
    this.userService.updateUser(data).subscribe((res)=>{
      this.spinner = false

      this.toast.presentSuccessToast("",5000)
      this.goBack()
    },(err)=>{
        this.spinner = false

      this.toast.presentErrorToast("",5000)
    })
  }

  preventCaracters(event) {

    let regex = /[0-9]/g;
    var k;
    k = event.key;  //         k = event.keyCode;  (Both can be used)
    let isNumeric = regex.test(k);
    return isNumeric
  }
  slideNext() {
    this.slides.slidePrev()
  }
  slideBack() {
    this.slides.slidePrev()
  }

  checkMan() {
    this.manChecked = true;
    this.womanChecked = false;
    this.genre = 'H';
  }
  checkWoman() {
    this.womanChecked = true;
    this.manChecked = false;
    this.genre = 'F';
  }
  dismiss() {

  }
  register() {
    this.showErrorAlerte = false
    this.showSuccessAlerte = false;
    this.spinner = true
    let tel: string = this.data.get('tel').value
    let whatsapp = this.data.get('whatsapp').value
    if (((!tel.startsWith('06') && !tel.startsWith('07')) || (tel.length !== 10)) || ((!whatsapp.startsWith('06') && !whatsapp.startsWith('07')) || (whatsapp.length !== 10))) {
      this.toast.presentErrorToast('رقم الهاتف أو الواتس اب غير صحيح', 5000);
    } else {

      let data = { ...this.data.value, genre: this.genre, role: this.role, host: this.id, generatePassword: this.generatePassword, lat: this.lat, lng: this.lng , beingRegistred:this.beingRegistred}

      this.userService.register(data).subscribe((res: any) => {
        this.spinner = false
        const formData = new FormData();
        if (this.image) {
          formData.append('image', this.image,"profile_image_" + res.id + '.' + this.image.name.split('.')[1]);
          
          this.paramService.setProfileImage(formData).subscribe((res: any) => {
            console.log("profile image uploaded with success");
            
          }, async (err) => {
            console.log(err)
          })
        }
        this.genPwd = res.genPwd
        if (this.beingRegistred) {
          let listname = ''
          if (this.role == 'C') listname = 'العملاء'
          if (this.role == 'V') listname = 'البائعين'
          if (this.role == 'R') listname = 'المسؤولين'
          
          this.href = `whatsapp://send?phone=${data.whatsapp.replace('0', '212')}&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%2C+%D9%84%D9%82%D8%AF+%D8%AA%D9%85%D8%AA+%D8%A5%D8%B6%D8%A7%D9%81%D8%AA%D9%83+%D8%A5%D9%84%D9%89%0D%0A+%D9%84%D8%A7%D8%A6%D8%AD%D8%A9+${listname}%2C+%D9%8A%D9%85%D9%83%D9%86%D9%83%D9%85+%D9%88%D9%84%D9%88%D8%AC++%D8%AA%D8%B7%D8%A8%D9%8A%D9%82+%3A+%D8%B1%D8%A7%D8%A6%D8%AF+%28RAIUD%29+%0D%0A+%D8%A8%D8%A3%D8%AF%D8%AE%D8%A7%D9%84+%D8%B1%D9%82%D9%85+%D9%87%D8%A7%D8%AA%D9%81%D9%83%D9%85%0D%0A+${data.tel}+%D9%88+%D8%B1%D9%85%D8%B2%D9%83%D9%85+%D8%A7%D9%84%D8%B3%D8%B1%D9%8A+${res.genPwd}+%0D%0A%0D%0A%D9%85%D9%84%D8%A7%D8%AD%D8%B8%D8%A9%3A%0D%0A%D8%A8%D8%B9%D8%AF+%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%D9%83%D9%85+%D8%A8%D9%87%D8%B0%D8%A7+%D8%B1%D9%85%D8%B2+%D9%8A%D9%85%D9%83%D9%86%D9%83%D9%85+%D8%AA%D8%BA%D9%8A%D9%8A%D8%B1%D9%87+%D8%A8%D8%B1%D9%85%D8%B2+%D8%B3%D8%B1%D9%8A+%D8%AE%D8%A7%D8%B5+%D8%A8%D9%83%D9%85`
          console.log('this.href :', this.href);
          this.showSuccessAlerte2 = true;
          setTimeout(() => {
            this.showSuccessAlerte2 = false;
            this.goBack()
          }, 10000);
        } else {
          if (this.role == 'C') {
            let dt = {
              id: data.tel,
              pwd: data.password
            }
            this.userService.login(dt).subscribe(async (res: any) => {
              let decodedToken: any = jwtDecode(res.token)
              await this.storage.set('token', res.token)
              await this.storage.set('username', res['name'])
              await this.storage.set('id', decodedToken.id)
              await this.storage.set('role', res['role'])
              await this.userService.name.next(res['name'])
              await this.userService.role.next(res['role'])
              this.route.navigate(["categories"])
            }, async (err) => {
              this.toast.presentErrorToast('', 3000);
              this.showSuccessAlerte = true;
            })
          } else {
            this.showSuccessAlerte = true;
          }
        }
        this.data.reset()
      }, (err) => {
        this.spinner = false

        if (err.status == 409) {
          this.message = 'المستخدم موجود بالفعل في نظامنا'
        }
        this.showErrorAlerte = true;
        setTimeout(() => {
          this.showErrorAlerte = false;
        }, 3000);
      })
    }

  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  onChange(e) {

    if (e.target.files[0].size > 10000000) {
      this.toast.presentErrorToast('حجم الصورة كبير جدا', 5000)
      return
    } else {
      this.imageURL = this.sanitizeImageUrl(URL.createObjectURL(e.target.files[0]))
      this.image = e.target.files[0]
    }

  } 
  dimissLoginAlert() {
    this.showSuccessAlerte = false
    this.route.navigate(['login'])
  }



}
