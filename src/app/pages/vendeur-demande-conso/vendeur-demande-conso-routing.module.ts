import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurDemandeConsoPage } from './vendeur-demande-conso.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurDemandeConsoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurDemandeConsoPageRoutingModule {}
