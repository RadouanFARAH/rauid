import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendeur-my-product',
  templateUrl: './vendeur-my-product.page.html',
  styleUrls: ['./vendeur-my-product.page.scss'],
})
export class VendeurMyProductPage implements OnInit {

  selectedToggle: boolean = false;
  data: any;
  phrase: string = '';
  url = environment.url
  role: any;
  hasBoss: any;
  constructor(private navCtrl:NavController,private route:Router,private storage: Storage, private productService: ProductsService, private router: ActivatedRoute) {
    this.getProductsBySeller()
    this.storage.get('role').then((role) => {
      if (role) {
        this.role = role
      }
    })
    this.storage.get('hasBoss').then((value) => {
        this.hasBoss = value
    })
  }

  ngOnInit() {
  }
  toggelappear(d) {
    this.phrase = d.appear == 1 ? 'ظاهر للعملاء' : 'غير ظاهر للعملاء'
    setTimeout(() => {
      this.phrase = ''
    }, 3000)
    d.appear = d.appear == 1 ? 0 : 1
    this.productService.toggelappear({ data: d }).subscribe((res) => {
    }, (err) => {
      console.log(err);
    })
  }
  ionViewDidEnter() {
    this.getProductsBySeller()
  }
  getProductsBySeller() {
    this.productService.getProductsBySeller().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        res[i].toggel = res[i].appear === 1 ? true : false
      }
      this.data = res
    })
  }

  goBack() {
    this.navCtrl.back();
  }

  updateProduct(d:any){
    this.route.navigate(['vendeur-addproduct'], {queryParams:{data:JSON.stringify(d)}})
  }

}
