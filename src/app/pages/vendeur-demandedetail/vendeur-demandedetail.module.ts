import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurDemandedetailPageRoutingModule } from './vendeur-demandedetail-routing.module';

import { VendeurDemandedetailPage } from './vendeur-demandedetail.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurDemandedetailPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [VendeurDemandedetailPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class VendeurDemandedetailPageModule { }
