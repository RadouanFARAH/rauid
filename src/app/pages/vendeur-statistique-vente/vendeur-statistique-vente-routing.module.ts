import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurStatistiqueVentePage } from './vendeur-statistique-vente.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurStatistiqueVentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurStatistiqueVentePageRoutingModule {}
