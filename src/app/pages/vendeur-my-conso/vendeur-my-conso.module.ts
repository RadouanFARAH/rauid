import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurMyConsoPageRoutingModule } from './vendeur-my-conso-routing.module';

import { VendeurMyConsoPage } from './vendeur-my-conso.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurMyConsoPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [VendeurMyConsoPage]
})
export class VendeurMyConsoPageModule { }
