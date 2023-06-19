import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurDemandehistoriquePage } from './vendeur-demandehistorique.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurDemandehistoriquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurDemandehistoriquePageRoutingModule {}
