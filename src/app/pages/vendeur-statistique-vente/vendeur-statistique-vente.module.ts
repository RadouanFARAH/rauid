import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurStatistiqueVentePageRoutingModule } from './vendeur-statistique-vente-routing.module';

import { VendeurStatistiqueVentePage } from './vendeur-statistique-vente.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurStatistiqueVentePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [VendeurStatistiqueVentePage]
})
export class VendeurStatistiqueVentePageModule { }
