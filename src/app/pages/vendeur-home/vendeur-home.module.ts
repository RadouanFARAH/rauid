import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurHomePageRoutingModule } from './vendeur-home-routing.module';

import { VendeurHomePage } from './vendeur-home.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurHomePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [VendeurHomePage]
})
export class VendeurHomePageModule { }
