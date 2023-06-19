import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ParametresService } from 'src/app/services/parametres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendeurStatisticsService } from 'src/app/services/vendeur-statistics.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DirecteurService } from 'src/app/services/directeur.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-vendeur-addproduct',
  templateUrl: './vendeur-addproduct.page.html',
  styleUrls: ['./vendeur-addproduct.page.scss'],
})
export class VendeurAddproductPage implements OnInit {
  public gen() {
    return uuid();
  }
  dataForm: FormGroup;
  showErrorAlerte: boolean = false;
  showSuccessAlerte: boolean = false;
  special: boolean = false;
  categories: any;
  image: any = null;
  responsable: any;
  vendeurs: any;
  role: any;
  images: any = [];
  priceError: string;
  imageURL: any = '';
  imageURLs: any[] = [];
  categoryMessage: string;
  nomMessage: string;
  disabled: boolean = true;
  spinner: boolean;
  whoisadding: any;
  responsables: any;
  isBeingModified: boolean;
  product: any;
  url = environment.url
  tobedeleted: any[] = [];
  imageURLs2: any[] = [];
  spinner2: boolean;
  showSuccessAlerte2: boolean;
  chosen_quantity_type: boolean=false;

  constructor(private toast: ToastService, private directeurService: DirecteurService, private navCtrl: NavController, private sanitizer: DomSanitizer, private storage: Storage, private service: ResponsableService, private router: ActivatedRoute, public alertIonic: AlertController, private fb: FormBuilder, private paramService: ParametresService) {
    this.storage.get('role').then((role) => {
      if (role) {
        this.role = role
      }
    })
    this.paramService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
    this.router.queryParams.subscribe((params) => {
      if (params.data) {
        let product = JSON.parse(params.data)
        if (product) {
          this.isBeingModified = true
          this.product = product
        }
      }

    })
    this.router.params.subscribe((params) => {
      this.whoisadding = params.role
      if (this.whoisadding == 'R') {
        this.getVendeurByResponsable()
      }
      if (this.whoisadding == 'D') {
        this.getResponsableByDirecteur()
      }
    })
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  toggelspecial() {
    this.special = !this.special
  }
  ngOnInit() {
    this.dataForm = this.fb.group({
      nom: [this.product && this.product.nom ? this.product.nom : "", Validators.required],
      prixInitial: [this.product && this.product.prixinitial ? this.product.prixinitial : 0, Validators.required],
      prixFinal: [this.product && this.product.prixfinal ? this.product.prixfinal : 0],
      category: [this.product && this.product.categorie ? JSON.parse(this.product.categorie) : null, Validators.required],
      lvendeurs: [null],
      lresponsables: [null],
      description: [this.product && this.product.description ? this.product.description : ""],
      deliveryPrice: [this.product && this.product.deliveryPrice ? this.product.deliveryPrice : 0],
      point_c: [this.product && this.product.point_c ? this.product.point_c : 0],
      point_v: [this.product && this.product.point_v ? this.product.point_v : 0],
      prixspecial: [this.product && this.product.prixspecial ? this.product.prixspecial : 0],
      quantity: [this.product && this.product.quantity ? this.product.quantity : 0],
      qte_inbox: [this.product && this.product.qte_inbox ? this.product.qte_inbox : 1],
      quantity_type: [this.product && this.product.quantity_type ? this.product.quantity_type : false],
      quantity_type_value: [this.product && this.product.quantity_type_value ? this.product.quantity_type_value : 0]
    })
    this.dataForm.valueChanges.subscribe((values)=>{
        let quantity_type = this.dataForm.controls['quantity_type'].value
        console.log("quantity_type ",quantity_type, typeof(quantity_type));
        
        if (quantity_type) {
          this.chosen_quantity_type =true

        }else{
          this.chosen_quantity_type =false

        }
        console.log("chosen_quantity_type ",this.chosen_quantity_type);
        
    })
    if (this.whoisadding == 'R') {
      this.dataForm.patchValue({
        lvendeurs: [null, Validators.required]
      })
    }
    if (this.whoisadding == 'D') {
      this.dataForm.patchValue({
        lresponsables: [null, Validators.required]
      })
    }

    this.dataForm.valueChanges.subscribe(() => {
      if ((this.dataForm.get('prixFinal').value > this.dataForm.get('prixInitial').value) || (this.dataForm.get('category').value?.length === 0) || (this.dataForm.get('nom').value === '' || (this.whoisadding == 'R' && !this.dataForm.get('lvendeurs').value) || (this.whoisadding == 'D' && !this.dataForm.get('lresponsables').value))) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      if (this.dataForm.get('prixFinal').value > this.dataForm.get('prixInitial').value) {
        this.priceError = "لا يمكن ان يكون ثمن التخفيض أكبر من الثمن الاصلي";
      } else {
        this.priceError = ''
      }
      if (this.dataForm.get('category').dirty && this.dataForm.get('category').value === '') {
        this.categoryMessage = 'المرجو إختيار الفئة';
      } else {
        this.categoryMessage = ''
      }
      if (this.dataForm.get('nom').dirty && this.dataForm.get('nom').value === '') {
        this.nomMessage = 'المرجو إختيار الاسم';
      } else {
        this.nomMessage = ''
      }

    })

  }

  preventCaracters(event) {
    let regex = /[0-9]/g;
    var k;
    k = event.key;  //         k = event.keyCode;  (Both can be used)
    return regex.test(k);
  }
  goBack() {
    this.navCtrl.back();
  }

  getVendeurByResponsable() {
    this.service.getVendeurByResponsable({}).subscribe((res: any) => {
      this.vendeurs = res

    }, err => console.log(err))
  }
  getResponsableByDirecteur() {
    this.directeurService.getResponsableByDirecteur().subscribe((res: any) => {
      this.responsables = res

    }, err => console.log(err))
  }
  setProduct() {

    let code = "P" + Date.now();
    let data = {
      ...this.dataForm.value,
      code,
      role: this.role,
      special: this.special,
      urls: this.images.length,

    }
    if (this.product) {
      data.id = this.product.id
      this.paramService.updateProduct(data).subscribe((res: any) => {
        this.paramService.deleteFiles({ tobedeleted: this.tobedeleted }).subscribe((res) => {
        }, (err) => {
          console.log(err);
        })
        const formData = new FormData();
        if (this.image) {
          formData.append('image', this.image, this.product.code + '.' + this.image.name.split('.')[1]);
        }
        if (this.images.length > 0) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append('image', this.images[i], this.product.code + "A" + Date.now()+this.gen()+ '.' + this.images[i].name.split('.')[1]);
          }
        }
        this.paramService.setProductImage(formData).subscribe((res: any) => {
        }, async (err) => {
          console.log(err)
        })

        this.spinner = false
        this.showSuccessAlerte = true;
        this.imageURL = '';
        this.imageURLs = [];
        setTimeout(() => {
          this.goBack();
          this.showSuccessAlerte = false;
        }, 3000);
      }, async (err) => {
        this.spinner = false

        if (err.status == 404){
          this.toast.presentErrorToast('تم إنشاء هذا المنتج بالفعل', 2000)

        }else{
          this.toast.presentErrorToast('حدث خطأ المرجو إعادة المحاولة', 2000)

        }
      })
    } else {
      this.paramService.setProduct(data).subscribe(
        (res: any) => {
        const formData = new FormData();
        if (this.image) {
          formData.append('image', this.image, code + '.' + this.image.name.split('.')[1]);
        }
        if (this.images.length > 0) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append('image', this.images[i], code + "A" + Date.now()+this.gen() + '.' + this.image.name.split('.')[1]);
          }
        }
        this.paramService.setProductImage(formData).subscribe((res: any) => {
          this.spinner = false
          this.showSuccessAlerte = true;
          this.imageURL = '';
          this.imageURLs = [];
          setTimeout(() => {
            this.goBack();
            this.showSuccessAlerte = false;
          }, 3000);
        }, async (err) => {
          this.spinner = false
          this.toast.presentErrorToast('حدث خطأ المرجو إعادة المحاولة', 2000)
        })
      }, async (err) => {
        this.spinner = false
        if (err.status == 404){
        this.toast.presentErrorToast('المنتج موجود فعلا', 2000)
        }
        else{
        this.toast.presentErrorToast('حدث خطأ المرجو إعادة المحاولة', 2000)
        }

      })
    }


  }
  ionViewWillEnter() {
    this.showErrorAlerte = false
    this.showSuccessAlerte = false
    this.imageURL = '';
    this.imageURLs = [];
    if (this.product) {
      this.imageURL = this.sanitizeImageUrl(this.url + '/images/image_' + this.product.code + '.png')
      this.paramService.getUrls({ code: this.product.code }).subscribe((urls: any) => {
        this.imageURLs2 = urls
      })
    }

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
  onChangeM(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 10000000) {
        this.toast.presentErrorToast('حجم الصورة كبير جدا', 5000)
        return
      } else {
        this.images.push(e.target.files[i])
        this.imageURLs.push(this.sanitizeImageUrl(URL.createObjectURL(e.target.files[i])))
      }
    }
  }
  deleteImg2(i) {

    let image = i.split('images/')[1]
    if (this.tobedeleted.includes(image)) {
      this.tobedeleted.splice(this.tobedeleted.indexOf(image), 1)
    } else {
      this.tobedeleted.push(image)
    }
  }
  deleteImg(i) {
    this.imageURLs.splice(i, 1)
  }
  deleteProduct(id){
    this.directeurService.deleteProduct({id:id}).subscribe((res:any)=>{
      this.spinner2 = false
      this.showSuccessAlerte2 = true;
      setTimeout(() => {
        this.goBack();
        this.showSuccessAlerte2 = false;
      }, 3000);
    }, (err)=>{
      this.spinner2 = false
      this.toast.presentErrorToast('حدث خطأ المرجو إعادة المحاولة', 2000)
    })
  }
  msg = "هل أنت متأكد من صحة المعلومات التي قمت بإدخالها لنشر المنتج ؟"
  async showAlert(product) {

    const alert = await this.alertIonic.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: this.msg,
      buttons: ['إلغاء', {
        text: 'تأكيد',
        handler: () => {
          if (!product){
            this.spinner = true
            this.setProduct();
          }else{
            this.spinner2 = true
            this.deleteProduct(this.product.id)
          }
        }
      }
      ]
    });

    await alert.present();
  }

}
