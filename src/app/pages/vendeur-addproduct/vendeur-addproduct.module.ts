import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurAddproductPageRoutingModule } from './vendeur-addproduct-routing.module';

import { VendeurAddproductPage } from './vendeur-addproduct.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    VendeurAddproductPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [VendeurAddproductPage]
})
export class VendeurAddproductPageModule { }
