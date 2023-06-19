import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurMyProductPageRoutingModule } from './vendeur-my-product-routing.module';

import { VendeurMyProductPage } from './vendeur-my-product.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurMyProductPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [VendeurMyProductPage]
})
export class VendeurMyProductPageModule { }
