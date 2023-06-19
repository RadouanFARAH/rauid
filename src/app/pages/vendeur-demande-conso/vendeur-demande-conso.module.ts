import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurDemandeConsoPageRoutingModule } from './vendeur-demande-conso-routing.module';

import { VendeurDemandeConsoPage } from './vendeur-demande-conso.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurDemandeConsoPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [VendeurDemandeConsoPage]
})
export class VendeurDemandeConsoPageModule { }
