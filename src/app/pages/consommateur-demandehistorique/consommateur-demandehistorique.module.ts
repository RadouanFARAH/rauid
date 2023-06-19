import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsommateurDemandehistoriquePageRoutingModule } from './consommateur-demandehistorique-routing.module';

import { ConsommateurDemandehistoriquePage } from './consommateur-demandehistorique.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsommateurDemandehistoriquePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ConsommateurDemandehistoriquePage]
})
export class ConsommateurDemandehistoriquePageModule { }
