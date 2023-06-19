import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ArticleService } from 'src/app/services/article.service';
import { ParametresService } from 'src/app/services/parametres.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { UserService } from 'src/app/services/user.service';
import { VendeurMyConsoService } from 'src/app/services/vendeur-my-conso.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-responsable-settings',
  templateUrl: './responsable-settings.page.html',
  styleUrls: ['./responsable-settings.page.scss'],
})
export class ResponsableSettingsPage implements OnInit {
  vendeurs: any;
  quartiers: any;
  days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  selectedVendeur1 = null;
  selectedVendeur2: any[] = [];
  selectedVendeur3: any[] = [];
  selectedDay: any[] = [];
  selectedQuartier = null;
  inserted: any[] = [];
  role: any;
  categories: any[] = [];
  categories2: any[] = [];
  products: any[] = [];
  products2: any[] = [];
  selectedProduct: any[] = [];
  selectedProduct2: any[] = [];
  special: any = null;
  action: string = '';
  selectedCategory: any[] = [];
  selectedCategory2: any[] = [];
  responsables: any;
  selectedResponsable: any = null;
  selectedPoint: any;
  forWho: string = '';
  selectedPointsGoal: number = 0;
  selectedOrdersGoal: number = 0;
  spinner1: boolean = false;
  spinner2: boolean = false;
  spinner3: boolean = false;
  spinner4: boolean = false;
  spinner5: boolean = false;
  prixspecial: any = 0;
  selectedPercent: any;
  selectedAppCost: number = 0.1;
  url: string = environment.url;
  selectedTimer: any;
  customAlertOptions1 = {
    message: '',
    translucent: true,
  };
  customAlertOptions2 = {
    message: '',
    translucent: true,
  };
  delivery_price: any;
  delivery_percent: any;
  delivery_max: any;
  forWhat: any;
  selectedQuartier1: any;
  selectedVille1: any;
  spinner6: boolean;
  hasBoss: any;
  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer, private fb: FormBuilder, private navCtrl: NavController, private userService: UserService, private toast: ToastService, private paramService: ParametresService, private storage: Storage, private toastCtrl: ToastController, private vendeurService: VendeurMyConsoService, private villesService: VilleQuartierService, private responsableService: ResponsableService) {

  }
  ngOnInit() {
    console.log("getting role");

    this.storage.get('role').then((role) => {
      console.log(" role is", role);

      if (role) {
        this.role = role
        if (this.role == 'D') {
          this.getCategories()
          this.getAllResponsables()
          this.getAllVendeurs()
        }
      }
    })
    this.storage.get('hasBoss').then((value) => {
      this.hasBoss = value
      if (!this.hasBoss) {
        console.log('hasBoss', this.hasBoss);

        this.storage.get('ville').then((value) => {
          console.log('ville', value);

          if (value) {
            this.getQuartierByVille(value)
            this.storage.get('ID_').then((value) => {
              console.log('ID_', value);

              if (value) {
                this.getVendeurById(value)
              }
            })
          }
        })
      }
    })
    this.form = this.fb.group({
      quartiers: this.fb.array([this.createQuartier()])
    });
    this.getVendeurByResponsable();
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  title = ""
  text = ""
  image: any;
  imageURL: SafeUrl;
  onChange(e) {
    if (e.target.files[0].size > 10000000) {
      this.toast.presentErrorToast('حجم الصورة كبير جدا', 5000)
      return
    } else {
      this.imageURL = this.sanitizeImageUrl(URL.createObjectURL(e.target.files[0]))
      this.image = e.target.files[0]
    }
  }
  addArticle() {
    if (!this.title || !this.text || !this.image) {
      this.toast.presentErrorToast('', 5000)
    } else {
      let article = {
        title: this.title,
        text: this.text
      }
      const formData = new FormData();
      this.articleService.addArticle(article).subscribe({
        next: (res: any) => {
          if (res) {
            if (this.image) {
              formData.append('image', this.image, 'cat' + res.insertId + '.' + this.image.name.split('.')[1]);
              this.paramService.setProductImage(formData).subscribe({ next: () => { }, error: () => { } })
            }
          this.toast.presentSuccessToast('', 5000);
            this.image = null
            this.imageURL= null
            this.title = ""
            this.text = ""
          } else {
            this.toast.presentErrorToast('', 5000)

          }

          

        }, error: (err) => {
          this.toast.presentErrorToast('', 5000)
        }
      })
    }

  }



  form: FormGroup;
  createQuartier(): FormGroup {
    return this.fb.group({
      quartier: ['', Validators.required],
    });
  }

  addQuartier(): void {
    (this.form.get('quartiers') as FormArray).push(this.createQuartier());
  }
  goBack() {
    this.navCtrl.back();
  }

  getAllResponsables() {
    this.userService.getUsersByRole("R").subscribe((responsables) => {
      this.responsables = responsables
    })
  }
  getAllVendeurs() {
    this.userService.getUsersByRole("V").subscribe((vendeurs) => {
      this.vendeurs = vendeurs
    })
  }

  getCategories() {
    this.paramService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  setVilleQuartier() {
    let quartiers = this.form.value.quartiers
    console.log(quartiers);

    if (this.selectedVille1) {
      this.spinner6 = true;
      let data = {
        ville: this.selectedVille1,
        quartiers
      }
      this.vendeurService.setVilleQuartier(data).subscribe({ next: (v) => { this.toast.presentSuccessToast("", 5000); this.spinner6 = false; this.selectedQuartier1 = ""; this.selectedVille1 = ""; this.form.setControl('quartiers', this.fb.array([this.createQuartier()])); this.selectedVille1 = null }, error: (e) => { this.toast.presentErrorToast("", 5000); this.spinner6 = false } })

    } else {
      this.toast.presentErrorToast("المرجو إدخال المدينة", 5000)
    }

  }
  setGoal(data) {
    return new Promise((resolve, reject) => {
      this.paramService.setGoal(data).subscribe((res) => {
        resolve(true)
      }, (err) => {
        resolve(false)
      })
    })
  }
  categoryChanged() {
    this.getProductsByCategorie(this.selectedCategory)
  }

  categoryChanged2() {
    this.getProductsByCategorie2(this.selectedCategory2)
  }
  getProductsByCategorie(id) {
    this.products = null
    this.customAlertOptions1.message = 'المرجو الإنتظار...'

    this.paramService.getProductByCategoryNameOnly(id, 'ALL').subscribe((res: any) => {
      this.products = res;
      if (this.products.length === 0) {

        this.customAlertOptions1.message = 'لا يوجد منتج'
      } else {

        this.customAlertOptions1.message = ''
      }
    }, (err) => {
      this.customAlertOptions1.message = 'حدث خطأ, المرجو إعادة المحاولة'

    })
  }
  getProductsByCategorie2(id) {
    this.products2 = null

    this.customAlertOptions2.message = 'المرجو الإنتظار...'

    this.paramService.getProductByCategoryNameOnly(id, 'ALL').subscribe((res: any) => {
      this.products2 = res
      if (this.products2.length === 0) {
        this.customAlertOptions2.message = 'لا يوجد منتج'
      } else {
        this.customAlertOptions2.message = ''
      }
    }, err => this.customAlertOptions2.message = 'حدث خطأ, المرجو إعادة المحاولة')
  }
  updateOtherSettings() {
    console.log("clicked");

    if (this.selectedPercent != null) {

      this.userService.setPercent({ value: this.selectedPercent }).subscribe((res) => { })
    }
    if (this.selectedAppCost != null) {
      if (this.selectedAppCost > 1) {
        this.presentErrorToast('تكلفة التطبيق لا يجب ان تتجاوز درهم واحد')
        return;
      }
      this.userService.setAppCost({ value: this.selectedAppCost }).subscribe((res) => { })
    }
    if (this.selectedTimer) {

      this.userService.setTimer({ value: this.selectedTimer }).subscribe((res) => { })
    }
    console.log("delivery price :", this.delivery_price);

    if (this.delivery_price != null) {

      this.userService.setDelivery({ value: this.delivery_price, type: this.forWhat }).subscribe((res) => { })
    }
    if (this.delivery_max || this.delivery_percent) {
      let data = { delivery_percent: this.delivery_percent, delivery_max: this.delivery_max }
      console.log(data);

      this.userService.setDeliveryParams({ delivery_percent: this.delivery_percent, delivery_max: this.delivery_max }).subscribe((res) => { })
    }

    this.presentSuccessToast('تمت العملية بنجاح');
    this.delivery_price = null
    this.delivery_max = null
    this.delivery_percent = null
    this.forWhat = null
    this.selectedPercent = null
    this.selectedAppCost = null
    this.selectedTimer = null

  }
  async setVendeurDayZone() {
    this.spinner1 = true
    console.log(this.selectedVendeur1, this.selectedDay, this.selectedQuartier);

    if (this.selectedDay.length == 0 || this.selectedVendeur1.length == 0 || !this.selectedQuartier) {
      this.toast.presentErrorToast('', 3000)
      this.spinner1 = false
    } else {
      console.log("selectedVendeur 1: ", this.selectedVendeur1);

      for (let index = 0; index < this.selectedDay.length; index++) {
        const element = this.selectedDay[index];
        console.log("selectedVendeur 1: ", this.selectedVendeur1);

        let data = {
          mode: '',
          idvendeur: this.selectedVendeur1[0].id,
          idquartier: this.selectedQuartier,
          day: element
        }
        let number = await this.getVendeurDayZone(data)
        if (number == 0) {
          let done = await this.callSetVendeurDayZone(data)
          if (!done) {
            this.spinner1 = false
            this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
            break
            return
          }
        } else {
          data.mode = 'U'
          let done = await this.callSetVendeurDayZone(data)
          if (!done) {
            this.spinner1 = false
            this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
            break
            return
          }
        }
      }
      this.spinner1 = false
      this.presentSuccessToast('تمت العملية بنجاح');
      this.selectedQuartier = null
      this.selectedDay = null
    }


  }
  async setMonthGoal() {
    this.spinner2 = true

    if (this.selectedVendeur2.length == 0 || (this.selectedOrdersGoal == 0 && this.selectedPointsGoal == 0)) {
      this.toast.presentErrorToast('', 3000)
      this.spinner2 = false

    } else {
      for (let index = 0; index < this.selectedVendeur2.length; index++) {
        const element = this.selectedVendeur2[index];
        let data = {
          goal: {
            points: this.selectedPointsGoal,
            orders: this.selectedOrdersGoal
          },
          user: element
        }
        let done = await this.setGoal(data)

        if (!done) {
          this.spinner2 = false

          this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
          break
          return
        }
      }
      this.spinner2 = false

      this.toast.presentSuccessToast('', 3000)

    }
  }
  async changeResponsableVendeur() {
    this.spinner3 = true

    if (!this.selectedResponsable || this.selectedVendeur3.length == 0 || !this.action) {
      this.toast.presentErrorToast('', 3000)
      this.spinner3 = false

    } else {
      for (let index = 0; index < this.selectedVendeur3.length; index++) {
        const element = this.selectedVendeur3[index];
        let data = {
          responsable: this.selectedResponsable,
          vendeur: element,
          action: this.action
        }

        let done = await this.setResponsableVendeur(data)
        if (!done) {
          this.spinner3 = false
          this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
          break
          return
        }
      }
      this.toast.presentSuccessToast('', 3000)
      this.spinner3 = false
    }
  }
  async updateSpecial() {
    this.spinner4 = true

    if (this.selectedProduct.length == 0 || this.special == null) {
      this.toast.presentErrorToast('', 3000)
      this.spinner4 = false

    } else {
      for (let index = 0; index < this.selectedProduct.length; index++) {
        const element = this.selectedProduct[index];
        let data = {
          code: element,
          special: this.special,
          prixspecial: this.prixspecial
        }
        let done = await this.updateSpecialAsync(data)
        if (!done) {
          this.spinner4 = false

          this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
          break
          return
        }
      }
      this.spinner4 = false

      this.selectedProduct = undefined
      this.special = undefined
      this.toast.presentSuccessToast('', 2000)
    }
  }
  async updatePoint() {
    this.spinner5 = true
    if (this.selectedProduct2.length == 0 || this.forWho.length == 0 || this.selectedPoint == 0) {
      this.toast.presentErrorToast('', 3000)
      this.spinner5 = false
    } else {
      for (let index = 0; index < this.selectedProduct2.length; index++) {
        const element = this.selectedProduct2[index];
        let data = {
          code: element,
          forWho: this.forWho,
          point: this.selectedPoint
        }
        let done = await this.updatePointAsync(data)
        if (!done) {
          this.spinner5 = false
          this.presentErrorToast('حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا');
          break
          return
        }
      }
      this.spinner5 = false
      this.selectedProduct2 = undefined
      this.forWho = undefined
      this.toast.presentSuccessToast('', 2000)
    }
  }

  setResponsableVendeur(data) {
    return new Promise((resolve, reject) => {
      this.responsableService.changeResponsableVendeur(data)
        .subscribe((res) => {
          resolve(true)
        }, (err) => {
          resolve(false)
        })
    })
  }
  updateSpecialAsync(data) {
    return new Promise((resolve, reject) => {
      this.paramService.updateSpecial(data).subscribe((res) => {
        resolve(true)
      }, (err) => {
        resolve(false)
      })
    })
  }
  updatePointAsync(data) {
    return new Promise((resolve, reject) => {
      this.paramService.updatePoint(data).subscribe((res) => {
        resolve(true)
      }, (err) => {
        resolve(false)
      })
    })
  }
  getVendeurById(id) {
    this.responsableService.getVendeurById(id).subscribe((vendeur) => {
      console.log(vendeur);

      this.selectedVendeur1 = vendeur
    })
  }
  getVendeurByResponsable() {
    this.responsableService.getVendeurByResponsable({}).subscribe((vendeurs) => {
      this.vendeurs = vendeurs
    })
  }
  vendeurChanged(ville) {
    this.getQuartierByVille(ville)
  }
  getQuartierByVille(ville) {
    if (ville) {
      let data = {
        ville
      }
      this.villesService.getQuartierByVille(data).subscribe((quartiers) => {
        this.quartiers = quartiers
      })
    }
  }
  getVendeurDayZone(data) {
    return new Promise((resolve, reject) => {
      let number = 0
      this.vendeurService.getVendeurDayZone(data).subscribe(async (n: any) => {
        number = n
        resolve(number)
      }, (err) => {
        resolve(number)
      })
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  callSetVendeurDayZone(data) {
    return new Promise((resolve, reject) => {
      this.vendeurService.setVendeurDayZone(data).subscribe((res) => {
        resolve(true)
      }, (err) => {
        resolve(false)
      })
    })
  }
  preventCaracters(event) {

    let regex = /[0-9]/g;
    var k;
    k = event.key;  //         k = event.keyCode;  (Both can be used)
    let isNumeric = regex.test(k);

    let isPoint = event.key == '.'
    return isNumeric || isPoint
  }
  async presentSuccessToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle',
      cssClass: "successtoastclass"
    });
    toast.present();
  }
  async presentErrorToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle',
      cssClass: "failedtoastclass"
    });
    toast.present();
  }
}
