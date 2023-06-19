import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendeurMyConsoService } from 'src/app/services/vendeur-my-conso.service';


@Component({
  selector: 'app-vendeur-my-conso',
  templateUrl: './vendeur-my-conso.page.html',
  styleUrls: ['./vendeur-my-conso.page.scss'],
})
export class VendeurMyConsoPage implements OnInit {
  quartier: string = "";
  day:number=new Date().getDay();
  nbrConsomateurTotal = 0;
  data: any[] = [];
  data2 = []
  userID: any;
  d: any;
  constructor(private vendeur: VendeurMyConsoService, private router: ActivatedRoute) {
    this.router.params.subscribe((params) => {
      if (params) this.d = params
    })
    this.vendeur.getConsoByZone({ day: this.day, byzone: false, userID: this.userID }).subscribe((res: any) => {
      this.nbrConsomateurTotal = res.length
    })

    this.vendeur.getZones().subscribe((res: any) => {
      let days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
      this.data = res
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].jour = days[i]
      }
      this.dayChanged()

    })
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
  }
  dayChanged() {
    this.quartier = this.data[this.day].quartier
    this.vendeur.getConsoByZone({ day: this.day, byzone: true, userID: this.userID }).subscribe((res: any) => {
      this.data2 = res;
    })
  }


}
