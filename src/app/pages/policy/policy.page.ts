import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
}
