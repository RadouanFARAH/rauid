import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumberService } from 'src/app/services/call-number.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';

@Component({
  selector: 'app-responsable-my-vend',
  templateUrl: './responsable-my-vend.page.html',
  styleUrls: ['./responsable-my-vend.page.scss'],
})
export class ResponsableMyVendPage implements OnInit {


  quartiers = [];
  data2 = []
  jour: string;
  d: any;
  showContactItem = false;
  sellerData: any;
  nbrClits: any;

  constructor(private villesService: VilleQuartierService, private router: Router, private callNumber: CallNumberService, private responsableService: ResponsableService) {
    this.getVendeurByResponsable();
    this.jour = new Date().toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long' });
  }



  ngOnInit() {
  }

  vendeurChanged() {
    this.data2 = this.sellerData.filter(e => e.vquartier == this.d);
    console.log("jjjjjjj", this.data2);

  }


  addproduct() {
    this.router.navigate(['/vendeur-addproduct'])
  }


  showContact(id) {
    for (let i = 0; i < this.data2.length; i++) {
      if (this.data2[i].id == id) {
        this.data2[i].showContactItem = true;
        console.log(id, "rrrrrrrrrrrrr : ", this.showContactItem);
      } else {
        this.data2[i].showContactItem = false;
      }
    }
  }

  call(number) {
    this.callNumber.call(number);
  }

  getVendeurByResponsable() {
    this.responsableService.getVendeurByReponsableByDay().subscribe({
      next: (res: any) => {

        for (let j = 0; j < res.length; j++) {
          const element = res[j].vquartier;

          if (!this.quartiers.includes(element) && element != null) {
            this.quartiers.push(element);
            console.log("uuuuuuu", this.quartiers);
          }

          this.responsableService.getNbrClients({ vendeur: res[j].id }).subscribe({
            next: (nbr: any) => {
              res[j].nbrClits = nbr;
            }, error: err => {
              console.log(err);
              res[j].nbrClits = "!!!"
            }
          })

        }
        this.data2 = res;
        this.sellerData = res;
        console.log("hhhhhhhhhhhh : ", this.data2);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
